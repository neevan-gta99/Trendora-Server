import { GLOBAL_REDIS_TTL } from "./config.js";
import { redisClient } from "../server.js";
import Schema_DTOs from "../DTOs/schemaDetails.js";
import products_Model_For_Show from "../models/getProductsModel.js";
import all_Codes from "../utils/codes.js";

// Existing functions remain SAME
const saveInCache = async (key, data) => {
    await redisClient.set(key, JSON.stringify(data));
};

const saveInCache2 = async (code, allProducts) => {
    const categoryCode = all_Codes.categoryCode[code];
    const withSpaceCategory = all_Codes.addSpaceBeforeCaps(categoryCode);

    const filterProducts = allProducts.filter(p => p.category === withSpaceCategory);

    for (const tab of all_Codes.subCategoryCodes[code]) {
        let tabProducts = filterProducts.filter(p => p.productType === tab);
        const redisKey = `${all_Codes.schemaKeyMap[code]}-${tab}`;

        const exists = await redisClient.exists(redisKey);
        if (exists) {
            await redisClient.del(redisKey);
        }

        for (const product of tabProducts) { 
            await redisClient.rPush(redisKey, JSON.stringify(product)); 
        }
    }
};

const saveInCache3 = async (code, allProducts) => {
    const categoryCode = all_Codes.categoryCode[code];
    const withSpaceCategory = all_Codes.addSpaceBeforeCaps(categoryCode);

    const filterProducts = allProducts.filter(p => p.category === withSpaceCategory);

    for (const tab of all_Codes.subCategoryCodes[code]) {

        let tabProducts;

        tabProducts = filterProducts.filter(p => p.gender === tab);

        const redisKey = `${all_Codes.schemaKeyMap[code]}-${tab}`;

        const exists = await redisClient.exists(redisKey);

        if (exists) {
            await redisClient.del(redisKey);
        }

        for (const product of tabProducts) { 
            await redisClient.rPush(redisKey, JSON.stringify(product)); 
        }

    }

}

const saveInCache4 = async (code, allProducts) => {

    const categoryCode = all_Codes.categoryCode[code];
    const withSpaceCategory = all_Codes.addSpaceBeforeCaps(categoryCode);


    const filterProducts = allProducts.filter(p => p.category === withSpaceCategory);

    for (const tab of all_Codes.subCategoryCodes[code]) {

        let tabProducts;

        tabProducts = filterProducts.filter(p => p.subCategory === tab);

        
        // Save to Redis
        const redisKey = `${all_Codes.schemaKeyMap[code]}-${tab}`;
        
        const exists = await redisClient.exists(redisKey);
        
        if (exists) {
            await redisClient.del(redisKey);
        }

        for (const product of tabProducts) { 
            await redisClient.rPush(redisKey, JSON.stringify(product)); 
        }

    }

}


// NEW: Load AND cache complete homepage

const loadInCache = async () => {
    let allProducts = [];

    const productPromises = Object.keys(all_Codes.schemaKeyMap).map(async (code) => {
        return Schema_DTOs[code].find({ status: "Active" }).lean();
    });

    const results = await Promise.all(productPromises);
    allProducts = results.flat();

    for (const code of Object.keys(all_Codes.schemaKeyMap)) {
        if (code === "bbds" || code === "ggds") {
            await saveInCache2(code, allProducts);
        } else if (code === "bgs" || code === "sts" || code === "lgs") {
            await saveInCache3(code, allProducts);
        } else {
            await saveInCache4(code, allProducts);
        }
    }
};

const returnFromCache = async (code, req) => {
    const offset = Number(req.body.offset);
    const limit = Number(req.body.limit);
    const tabValues = req.body.tabValues;

    let result = [];

    for (const tab of tabValues) {
        const redisKey = `${all_Codes.schemaKeyMap[code]}-${tab}`;

        const tabProducts = await redisClient.lRange(redisKey, offset, offset + limit - 1);
        const parsed = tabProducts.map(item => JSON.parse(item));

        result = [...result, ...parsed];
    }

    return result;
};

// Helper function to get specific section from homepage cache
const getHomepageSection = async (sectionKey) => {
  try {
    const homepageData = await products_Model_For_Show.getCompleteHomepageData();
    
    // Flexible section access
    if (homepageData.showcases[sectionKey]) {
      return homepageData.showcases[sectionKey].data;
    }
    
    // Try alternate keys
    const sectionMap = {
      "mensWear": "mensWear",
      "womensWear": "womensWear", 
      "boysBrands": "boysBrands",
      "girlsGrands": "girlsGrands",
      "bags": "bags",
      "suitcases": "suitcases",
      "luggages": "luggages"
    };
    
    const actualKey = sectionMap[sectionKey];
    if (actualKey && homepageData.showcases[actualKey]) {
      return homepageData.showcases[actualKey].data;
    }
    
    return [];
    
  } catch (error) {
    console.error(`Error getting section ${sectionKey}:`, error);
    return [];
  }
};

// NEW: Filter functions for the complete homepage data
const HomepageFilters = {
  // Get products by category
  getByCategory: async (category) => {
    const homepageData = await products_Model_For_Show.getCompleteHomepageData();
    const results = [];
    
    // Map category to showcase keys
    const categoryMap = {
      "mens": ["mensWear"],
      "womens": ["womensWear"],
      "boys": ["boysBrands"],
      "girls": ["girlsGrands"],
      "bags": ["bags"],
      "suitcases": ["suitcases"],
      "luggages": ["luggages"],
      "accessories": ["bags", "suitcases", "luggages"]
    };
    
    const showcaseKeys = categoryMap[category] || [];
    
    for (const key of showcaseKeys) {
      if (homepageData.showcases[key]) {
        results.push(...homepageData.showcases[key].data);
      }
    }
    
    return results;
  },
  
  // Get products by schema/code
  getBySchema: async (schemaCode) => {
    const homepageData = await products_Model_For_Show.getCompleteHomepageData();
    const results = [];
    
    // Find which showcase contains this schema
    for (const [key, showcase] of Object.entries(homepageData.showcases)) {
      if (showcase.sourceSchemas.includes(schemaCode)) {
        // Filter only products from this specific schema
        const schemaProducts = showcase.data.filter(product => 
          product.productCode?.startsWith(schemaCode) || 
          product.schema === schemaCode
        );
        results.push(...schemaProducts);
      }
    }
    
    return results;
  },
  
  // Search across all homepage data
  searchHomepage: async (searchTerm) => {
    const homepageData = await products_Model_For_Show.getCompleteHomepageData();
    const results = [];
    const term = searchTerm.toLowerCase();
    
    for (const [key, showcase] of Object.entries(homepageData.showcases)) {
      const matchingProducts = showcase.data.filter(product => 
        JSON.stringify(product).toLowerCase().includes(term)
      );
      
      if (matchingProducts.length > 0) {
        results.push({
          section: key,
          count: matchingProducts.length,
          products: matchingProducts
        });
      }
    }
    
    return results;
  },
  
  // Get homepage stats
  getHomepageStats: async () => {
    const homepageData = await products_Model_For_Show.getCompleteHomepageData();
    
    const stats = {
      totalSections: Object.keys(homepageData.showcases).length,
      sectionStats: {},
      lastUpdated: homepageData.metadata.cachedAt
    };
    
    for (const [key, showcase] of Object.entries(homepageData.showcases)) {
      stats.sectionStats[key] = {
        count: showcase.count,
        sourceSchemas: showcase.sourceSchemas,
        timestamp: showcase.timestamp
      };
    }
    
    return stats;
  }
};


const loadAndCacheCompleteHomepage = async () => {
  console.log("🚀 Loading and caching complete homepage...");
  
  // 1. First load all products (your existing logic)
  await loadInCache();
  
  // 2. Load individual showcases (for backward compatibility)
  await Promise.all([
    products_Model_For_Show.getShowCaseMensWear(),
    products_Model_For_Show.getShowCaseWomensWear(),
    products_Model_For_Show.getShowCaseBoysBrands(),
    products_Model_For_Show.getShowCaseGirlsGrands(),
    products_Model_For_Show.getShowCaseBags(),
    products_Model_For_Show.getShowCaseSuitcases(),
    products_Model_For_Show.getShowCaseLuggages()
  ]);
  
  // 3. Build and cache complete homepage
  await products_Model_For_Show.refreshHomepageCache();
  
  console.log("✅ Complete homepage cached successfully");
};

// UPDATED interval function
(async function () {
    // Initial load
    await loadAndCacheCompleteHomepage();

    // Set interval for refresh (30 minutes)
    setInterval(async () => {
        console.log("🔄 Auto-refreshing homepage cache...");
        await loadAndCacheCompleteHomepage();
    }, 1000 * 60 * 30);
})();

// Export everything
const Cache_Features = { 
  saveInCache, 
  returnFromCache,
  // NEW functions
  getHomepageSection,
  HomepageFilters,
  loadAndCacheCompleteHomepage
};

export default Cache_Features;


























// import { GLOBAL_REDIS_TTL } from "./config.js";
// import { redisClient } from "../server.js";
// import Schema_DTOs from "../DTOs/schemaDetails.js";
// import products_Model_For_Show from "../models/getProductsModel.js";
// import all_Codes from "../utils/codes.js";

// const saveInCache = async (key, data) => {
//     await redisClient.set(key, JSON.stringify(data));
// };

// const saveInCache2 = async (code, allProducts) => {
//     const categoryCode = all_Codes.categoryCode[code];
//     const withSpaceCategory = all_Codes.addSpaceBeforeCaps(categoryCode);

//     const filterProducts = allProducts.filter(p => p.category === withSpaceCategory);

//     for (const tab of all_Codes.subCategoryCodes[code]) {

//         let tabProducts;

//         tabProducts = filterProducts.filter(p => p.productType === tab);

//         const redisKey = `${all_Codes.schemaKeyMap[code]}-${tab}`;

//         const exists = await redisClient.exists(redisKey);

//         if (exists) {
//             await redisClient.del(redisKey);
//         }

//         for (const product of tabProducts) { 
//             await redisClient.rPush(redisKey, JSON.stringify(product)); 
//         }

//     }

// }

// const saveInCache3 = async (code, allProducts) => {
//     const categoryCode = all_Codes.categoryCode[code];
//     const withSpaceCategory = all_Codes.addSpaceBeforeCaps(categoryCode);

//     const filterProducts = allProducts.filter(p => p.category === withSpaceCategory);

//     for (const tab of all_Codes.subCategoryCodes[code]) {

//         let tabProducts;

//         tabProducts = filterProducts.filter(p => p.gender === tab);

//         const redisKey = `${all_Codes.schemaKeyMap[code]}-${tab}`;

//         const exists = await redisClient.exists(redisKey);

//         if (exists) {
//             await redisClient.del(redisKey);
//         }

//         for (const product of tabProducts) { 
//             await redisClient.rPush(redisKey, JSON.stringify(product)); 
//         }

//     }

// }

// const saveInCache4 = async (code, allProducts) => {

//     const categoryCode = all_Codes.categoryCode[code];
//     const withSpaceCategory = all_Codes.addSpaceBeforeCaps(categoryCode);


//     const filterProducts = allProducts.filter(p => p.category === withSpaceCategory);

//     for (const tab of all_Codes.subCategoryCodes[code]) {

//         let tabProducts;

//         tabProducts = filterProducts.filter(p => p.subCategory === tab);

        
//         // Save to Redis
//         const redisKey = `${all_Codes.schemaKeyMap[code]}-${tab}`;
        
//         const exists = await redisClient.exists(redisKey);
        
//         if (exists) {
//             await redisClient.del(redisKey);
//         }

//         for (const product of tabProducts) { 
//             await redisClient.rPush(redisKey, JSON.stringify(product)); 
//         }

//     }

// }

// const loadInCache = async () => {
//     let allProducts = [];

//     const productPromises = Object.keys(all_Codes.schemaKeyMap).map(async (code) => {
//         return Schema_DTOs[code].find({ status: "Active" }).lean();
//     });

//     const results = await Promise.all(productPromises);
//     allProducts = results.flat();

//     for (const code of Object.keys(all_Codes.schemaKeyMap)) {
//         if (code === "bbds" || code === "ggds") {
//             await saveInCache2(code, allProducts);
//         } else if (code === "bgs" || code === "sts" || code === "lgs") {
//             await saveInCache3(code, allProducts);
//         } else {
//             await saveInCache4(code, allProducts);
//         }
//     }
// };

// const returnFromCache = async (code, req) => {
//     const offset = Number(req.body.offset);
//     const limit = Number(req.body.limit);
//     const tabValues = req.body.tabValues;

//     let result = [];

//     for (const tab of tabValues) {
//         const redisKey = `${all_Codes.schemaKeyMap[code]}-${tab}`;

//         const tabProducts = await redisClient.lRange(redisKey, offset, offset + limit - 1);
//         const parsed = tabProducts.map(item => JSON.parse(item));

//         result = [...result, ...parsed];
//     }

//     return result;
// };





// async function loadAndCacheProducts() {

//     await loadInCache();

//     products_Model_For_Show.getShowCaseMensWear();
//     products_Model_For_Show.getShowCaseWomensWear();
//     products_Model_For_Show.getShowCaseBoysBrands();
//     products_Model_For_Show.getShowCaseGirlsGrands();
//     products_Model_For_Show.getShowCaseBags();
//     products_Model_For_Show.getShowCaseSuitcases();

// }

// (async function () {

//     await loadAndCacheProducts();

//     setInterval(async () => {
//         await loadAndCacheProducts();
//     }, 1000 * 60 * 30);

// })();


// const Cache_Features = { saveInCache, returnFromCache };
// export default Cache_Features;
