// models/getProductsModel.js - UPDATED VERSION
import Schema_DTOs from "../DTOs/schemaDetails.js";
import all_Codes from "../utils/codes.js";
import { redisClient } from "../server.js";
import Cache_Features from "../redis/features.js";

// Main function to get ALL homepage data in one Redis key
const getCompleteHomepageData = async () => {
  const homepageCacheKey = "homepage:complete:v1";
  
  try {
    // Check if complete homepage exists in cache
    const cached = await redisClient.get(homepageCacheKey);
    
    if (cached) {
      console.log("✅ Homepage served from complete cache");
      return JSON.parse(cached);
    }
    
    console.log("🔄 Cache miss - building complete homepage...");
    
    // If not in cache, build complete homepage data
    const homepageData = await buildCompleteHomepage();
    
    // Save complete data to Redis WITHOUT expiration
    await Cache_Features.saveInCache(homepageCacheKey, homepageData);
    
    // ❌ NO EXPIRE HERE - Auto-refresh will handle it
    // await redisClient.expire(homepageCacheKey, 1800); // REMOVE THIS
    
    return homepageData;
    
  } catch (error) {
    console.error("❌ Error fetching complete homepage:", error);
    throw new Error("Failed to fetch homepage data");
  }
};

// Build complete homepage data structure
const buildCompleteHomepage = async () => {
  // Fetch ALL showcase data in parallel
  const [
    mensWearData,
    womensWearData,
    boysBrandsData,
    girlsGrandsData,
    bagsData,
    suitcasesData,
    luggagesData
  ] = await Promise.all([
    getShowCaseMensWearInternal(),
    getShowCaseWomensWearInternal(),
    getShowCaseBoysBrandsInternal(),
    getShowCaseGirlsGrandsInternal(),
    getShowCaseBagsInternal(),
    getShowCaseSuitcasesInternal(),
    getShowCaseLuggagesInternal()
  ]);
  
  // Build the structured homepage data
  return {
    metadata: {
      version: "v1",
      cachedAt: new Date().toISOString(),
      ttl: 1800,
      sectionsCount: 7
    },
    
    showcases: {
      mensWear: {
        key: "showcase-menswear",
        redisId: "mtr-mbr-mfr",
        data: mensWearData,
        timestamp: new Date().toISOString(),
        sourceSchemas: ["mtr", "mbr", "mfr"],
        count: mensWearData.length
      },
      
      womensWear: {
        key: "showcase-womenswear",
        redisId: "weth-wwtn-wftr",
        data: womensWearData,
        timestamp: new Date().toISOString(),
        sourceSchemas: ["weth", "wwtn", "wftr"],
        count: womensWearData.length
      },
      
      boysBrands: {
        key: "showcase-boysbrands",
        redisId: "bbds",
        data: boysBrandsData,
        timestamp: new Date().toISOString(),
        sourceSchemas: ["bbds"],
        count: boysBrandsData.length
      },
      
      girlsGrands: {
        key: "showcase-girlsgrands",
        redisId: "ggds",
        data: girlsGrandsData,
        timestamp: new Date().toISOString(),
        sourceSchemas: ["ggds"],
        count: girlsGrandsData.length
      },
      
      bags: {
        key: "showcase-bags",
        redisId: "bgs",
        data: bagsData,
        timestamp: new Date().toISOString(),
        sourceSchemas: ["bgs"],
        count: bagsData.length
      },
      
      suitcases: {
        key: "showcase-suitcases",
        redisId: "sts",
        data: suitcasesData,
        timestamp: new Date().toISOString(),
        sourceSchemas: ["sts"],
        count: suitcasesData.length
      },
      
      luggages: {
        key: "showcase-luggages",
        redisId: "lgs",
        data: luggagesData,
        timestamp: new Date().toISOString(),
        sourceSchemas: ["lgs"],
        count: luggagesData.length
      }
    },
    
    categories: {
      mens: ["mtr", "mbr", "mfr", "mwa"],
      womens: ["weth", "wwtn", "wftr", "wwa"],
      boys: ["bbds", "bwa"],
      girls: ["ggds", "gwa"],
      accessories: ["bgs", "sts", "lgs"]
    },
    
    stats: {
      totalProducts: 
        mensWearData.length + 
        womensWearData.length + 
        boysBrandsData.length + 
        girlsGrandsData.length + 
        bagsData.length + 
        suitcasesData.length + 
        luggagesData.length,
      lastUpdated: new Date().toISOString()
    }
  };
};

// INTERNAL FUNCTIONS (for building complete data)
// These are similar to your existing functions but don't cache individually

const getShowCaseMensWearInternal = async () => {
  try {
    const [mtr, mbr, mfr] = await Promise.all([
      Schema_DTOs["mtr"].find({ hot: true }),
      Schema_DTOs["mbr"].find({ hot: true }),
      Schema_DTOs["mfr"].find({ hot: true })
    ]);
    
    return [...mtr, ...mbr, ...mfr];
  } catch (error) {
    console.error("Error in mensWear internal:", error);
    return [];
  }
};

const getShowCaseWomensWearInternal = async () => {
  try {
    const [weth, wwtn, wftr] = await Promise.all([
      Schema_DTOs["weth"].find({ hot: true }),
      Schema_DTOs["wwtn"].find({ hot: true }),
      Schema_DTOs["wftr"].find({ hot: true })
    ]);
    
    return [...weth, ...wwtn, ...wftr];
  } catch (error) {
    console.error("Error in womensWear internal:", error);
    return [];
  }
};

const getShowCaseBoysBrandsInternal = async () => {
  try {
    return await Schema_DTOs["bbds"].find({ hot: true });
  } catch (error) {
    console.error("Error in boysBrands internal:", error);
    return [];
  }
};

const getShowCaseGirlsGrandsInternal = async () => {
  try {
    return await Schema_DTOs["ggds"].find({ hot: true });
  } catch (error) {
    console.error("Error in girlsGrands internal:", error);
    return [];
  }
};

const getShowCaseBagsInternal = async () => {
  try {
    return await Schema_DTOs["bgs"].find({ hot: true });
  } catch (error) {
    console.error("Error in bags internal:", error);
    return [];
  }
};

const getShowCaseSuitcasesInternal = async () => {
  try {
    return await Schema_DTOs["sts"].find({ hot: true });
  } catch (error) {
    console.error("Error in suitcases internal:", error);
    return [];
  }
};

const getShowCaseLuggagesInternal = async () => {
  try {
    return await Schema_DTOs["lgs"].find({ hot: true });
  } catch (error) {
    console.error("Error in luggages internal:", error);
    return [];
  }
};

// INDIVIDUAL FUNCTIONS (for backward compatibility)
// These now fetch from the complete cache instead of separate Redis calls

const getShowCaseMensWear = async () => {
  const homepageData = await getCompleteHomepageData();
  return homepageData.showcases.mensWear.data;
};

const getShowCaseWomensWear = async () => {
  const homepageData = await getCompleteHomepageData();
  return homepageData.showcases.womensWear.data;
};

const getShowCaseBoysBrands = async () => {
  const homepageData = await getCompleteHomepageData();
  return homepageData.showcases.boysBrands.data;
};

const getShowCaseGirlsGrands = async () => {
  const homepageData = await getCompleteHomepageData();
  return homepageData.showcases.girlsGrands.data;
};

const getShowCaseBags = async () => {
  const homepageData = await getCompleteHomepageData();
  return homepageData.showcases.bags.data;
};

const getShowCaseSuitcases = async () => {
  const homepageData = await getCompleteHomepageData();
  return homepageData.showcases.suitcases.data;
};

const getShowCaseLuggages = async () => {
  const homepageData = await getCompleteHomepageData();
  return homepageData.showcases.luggages.data;
};

// Refresh complete homepage cache
const refreshHomepageCache = async () => {
  try {
    // Delete old cache
    await redisClient.del("homepage:complete:v1");
    console.log("✅ Homepage cache cleared");
    
    // Rebuild and cache (NO expiration)
    const freshData = await buildCompleteHomepage();
    await Cache_Features.saveInCache("homepage:complete:v1", freshData);
    
    // ❌ NO EXPIRE HERE
    // await redisClient.expire("homepage:complete:v1", 1800); // REMOVE
    
    return { success: true, message: "Homepage cache refreshed" };
  } catch (error) {
    console.error("❌ Failed to refresh homepage cache:", error);
    return { success: false, message: error.message };
  }
};

const getAllMenTopwear = async (req) => {

  try {

    return Cache_Features.returnFromCache("mtr", req);

  } catch (error) {
    console.error("Error fetching men's topwear:", error);
    throw new Error("Failed to fetch men's topwear");
  }
};

const getAllMenBottomwear = async (req) => {
  try {

    return Cache_Features.returnFromCache("mbr", req);
  } catch (error) {
    console.error("Error fetching men's bottomwear:", error);
    throw new Error("Failed to fetch men's bottomwear");
  }
};

const getAllMenFootwear = async (req) => {
  try {

    return Cache_Features.returnFromCache("mfr", req);
  } catch (error) {
    console.error("Error fetching men's bottomwear:", error);
    throw new Error("Failed to fetch men's bottomwear");
  }
};

const getAllWomenEthnic = async (req) => {
  try {

    return Cache_Features.returnFromCache("weth", req);
  } catch (error) {
    console.error("Error fetching men's bottomwear:", error);
    throw new Error("Failed to fetch men's bottomwear");
  }
};

const getAllWomenWestern = async (req) => {
  try {

    return Cache_Features.returnFromCache("wwtn", req);
  } catch (error) {
    console.error("Error fetching men's bottomwear:", error);
    throw new Error("Failed to fetch men's bottomwear");
  }
};

const getAllWomenFootwear = async (req) => {
  try {
    return Cache_Features.returnFromCache("wftr", req);
  } catch (error) {
    console.error("Error fetching men's bottomwear:", error);
    throw new Error("Failed to fetch men's bottomwear");
  }
};

const getAllBoysBrands = async (req) => {
  try {
    return Cache_Features.returnFromCache("bbds", req);

  } catch (error) {
    console.error("Error fetching men's bottomwear:", error);
    throw new Error("Failed to fetch men's bottomwear");
  }
};

const getAllGirlsGrands = async (req) => {
  try {
    return Cache_Features.returnFromCache("ggds", req);

  } catch (error) {
    console.error("Error fetching men's bottomwear:", error);
    throw new Error("Failed to fetch men's bottomwear");
  }
};

const getAllMensWA = async (req) => {
  try {
    return Cache_Features.returnFromCache("mwa", req);

  } catch (error) {
    console.error("Error fetching men's bottomwear:", error);
    throw new Error("Failed to fetch men's bottomwear");
  }
};

const getAllWomensWA = async (req) => {
  try {
    return Cache_Features.returnFromCache("wwa", req);

  } catch (error) {
    console.error("Error fetching men's bottomwear:", error);
    throw new Error("Failed to fetch men's bottomwear");
  }
};

const getAllBoysWA = async (req) => {
  try {
    return Cache_Features.returnFromCache("bwa", req);

  } catch (error) {
    console.error("Error fetching men's bottomwear:", error);
    throw new Error("Failed to fetch men's bottomwear");
  }
};

const getAllGirlsWA = async (req) => {
  try {

    return Cache_Features.returnFromCache("gwa", req);

  } catch (error) {
    console.error("Error fetching men's bottomwear:", error);
    throw new Error("Failed to fetch men's bottomwear");
  }
};

const getAllBags = async (req) => {

  try {

    return Cache_Features.returnFromCache("bgs", req);

  } catch (error) {
    console.error("Error fetching men's bottomwear:", error);
    throw new Error("Failed to fetch men's bottomwear");
  }
};

const getAllSuitcases = async (req) => {
  try {
    return Cache_Features.returnFromCache("sts", req);

  } catch (error) {
    console.error("Error fetching men's bottomwear:", error);
    throw new Error("Failed to fetch men's bottomwear");
  }
};

const getAllLuggages = async (req) => {
  try {

    return Cache_Features.returnFromCache("lgs", req);

  } catch (error) {
    console.error("Error fetching men's bottomwear:", error);
    throw new Error("Failed to fetch men's bottomwear");
  }
};



// Export everything
const products_Model_For_Show = { 
  getShowCaseMensWear, 
  getShowCaseWomensWear, 
  getShowCaseGirlsGrands, 
  getShowCaseBoysBrands, 
  getShowCaseSuitcases, 
  getShowCaseBags, 
  getShowCaseLuggages,
  getAllMenTopwear,
  getAllMenBottomwear,
  getAllMenFootwear,
  getAllWomenEthnic,
  getAllWomenWestern,
  getAllWomenFootwear,
  getAllBoysBrands,
  getAllGirlsGrands,
  getAllMensWA,
  getAllWomensWA,
  getAllBoysWA,
  getAllGirlsWA,
  getAllBags,
  getAllSuitcases,
  getAllLuggages,
  // getPerProduct,
  // NEW FUNCTIONS
  getCompleteHomepageData,
  refreshHomepageCache
};

export default products_Model_For_Show;










































// import Schema_DTOs from "../DTOs/schemaDetails.js";
// import all_Codes from "../utils/codes.js";
// import { redisClient } from "../server.js";
// import Cache_Features from "../redis/features.js";


// const getShowCaseMensWear = async () => {

//   const redisId = "mtr-mbr-mfr";
//   const cacheKey = `showcase-menswear:${redisId}`;
//   const cached = await redisClient.get(cacheKey);

//   if (cached) {
//     return JSON.parse(cached);
//   }

//   try {
//     const showcaseProducts = await Schema_DTOs["mtr"].find({ hot: true });
//     const showcaseProducts2 = await Schema_DTOs["mbr"].find({ hot: true });
//     const showcaseProducts3 = await Schema_DTOs["mfr"].find({ hot: true });

//     const totalShowcase = [
//       ...showcaseProducts,
//       ...showcaseProducts2,
//       ...showcaseProducts3
//     ];

//     await Cache_Features.saveInCache(cacheKey, totalShowcase);
//     return totalShowcase;

//   } catch (error) {
//     console.error("Error fetching men's shocase topwear:", error);
//     throw new Error("Failed to fetch men's showcase topwear");
//   }
// };

// const getShowCaseWomensWear = async () => {

//   const redisId = "weth-wwtn-wftr";
//   const cacheKey = `showcase-womenswear:${redisId}`;
//   const cached = await redisClient.get(cacheKey);

//   if (cached) {
//     return JSON.parse(cached);
//   }

//   try {
//     const showcaseProducts = await Schema_DTOs["weth"].find({ hot: true });
//     const showcaseProducts2 = await Schema_DTOs["wwtn"].find({ hot: true });
//     const showcaseProducts3 = await Schema_DTOs["wftr"].find({ hot: true });

//     const totalShowcase = [
//       ...showcaseProducts,
//       ...showcaseProducts2,
//       ...showcaseProducts3
//     ];

//     await Cache_Features.saveInCache(cacheKey, totalShowcase);
//     return totalShowcase;

//   } catch (error) {
//     console.error("Error fetching men's shocase topwear:", error);
//     throw new Error("Failed to fetch men's showcase topwear");
//   }
// };

// const getShowCaseBoysBrands = async () => {

//   const redisId = "bbds";
//   const cacheKey = `showcase-boysbrands:${redisId}`;
//   const cached = await redisClient.get(cacheKey);

//   if (cached) {
//     return JSON.parse(cached);
//   }

//   try {
//     const showcaseProducts = await Schema_DTOs["bbds"].find({ hot: true });

//     await Cache_Features.saveInCache(cacheKey, showcaseProducts);

//     return showcaseProducts;

//   } catch (error) {
//     console.error("Error fetching men's shocase topwear:", error);
//     throw new Error("Failed to fetch men's showcase topwear");
//   }
// };

// const getShowCaseGirlsGrands = async () => {

//   const redisId = "ggds";
//   const cacheKey = `showcase-girlsgrands:${redisId}`;
//   const cached = await redisClient.get(cacheKey);

//   if (cached) {
//     return JSON.parse(cached);
//   }

//   try {
//     const showcaseProducts = await Schema_DTOs["ggds"].find({ hot: true });

//     await Cache_Features.saveInCache(cacheKey, showcaseProducts);
//     return showcaseProducts;

//   } catch (error) {
//     console.error("Error fetching men's shocase topwear:", error);
//     throw new Error("Failed to fetch men's showcase topwear");
//   }
// };

// const getShowCaseBags = async () => {

//   const redisId = "bgs";
//   const cacheKey = `showcase-bags:${redisId}`;
//   const cached = await redisClient.get(cacheKey);

//   if (cached) {
//     return JSON.parse(cached);
//   }

//   try {
//     const showcaseProducts = await Schema_DTOs["bgs"].find({ hot: true });
//     await Cache_Features.saveInCache(cacheKey, showcaseProducts);
//     return showcaseProducts;

//   } catch (error) {
//     console.error("Error fetching men's shocase topwear:", error);
//     throw new Error("Failed to fetch men's showcase topwear");
//   }
// };

// const getShowCaseSuitcases = async () => {

//   const redisId = "sts";
//   const cacheKey = `showcase-suitcases:${redisId}`;
//   const cached = await redisClient.get(cacheKey);

//   if (cached) {
//     return JSON.parse(cached);
//   }

//   try {
//     const showcaseProducts = await Schema_DTOs["sts"].find({ hot: true });
//     await Cache_Features.saveInCache(cacheKey, showcaseProducts);
//     return showcaseProducts;

//   } catch (error) {
//     console.error("Error fetching men's shocase topwear:", error);
//     throw new Error("Failed to fetch men's showcase topwear");
//   }
// };

// const getShowCaseLuggages = async () => {

//   const redisId = "lgs";
//   const cacheKey = `showcase-luggages:${redisId}`;
//   const cached = await redisClient.get(cacheKey);

//   if (cached) {
//     return JSON.parse(cached);
//   }

//   try {
//     const showcaseProducts = await Schema_DTOs["lgs"].find({ hot: true });
//     await Cache_Features.saveInCache(cacheKey, showcaseProducts);
//     return showcaseProducts;

//   } catch (error) {
//     console.error("Error fetching men's shocase topwear:", error);
//     throw new Error("Failed to fetch men's showcase topwear");
//   }
// };

// const getAllMenTopwear = async (req) => {

//   try {

//     return Cache_Features.returnFromCache("mtr", req);

//   } catch (error) {
//     console.error("Error fetching men's topwear:", error);
//     throw new Error("Failed to fetch men's topwear");
//   }
// };

// const getAllMenBottomwear = async (req) => {
//   try {

//     return Cache_Features.returnFromCache("mbr", req);
//   } catch (error) {
//     console.error("Error fetching men's bottomwear:", error);
//     throw new Error("Failed to fetch men's bottomwear");
//   }
// };

// const getAllMenFootwear = async (req) => {
//   try {

//     return Cache_Features.returnFromCache("mfr", req);
//   } catch (error) {
//     console.error("Error fetching men's bottomwear:", error);
//     throw new Error("Failed to fetch men's bottomwear");
//   }
// };

// const getAllWomenEthnic = async (req) => {
//   try {

//     return Cache_Features.returnFromCache("weth", req);
//   } catch (error) {
//     console.error("Error fetching men's bottomwear:", error);
//     throw new Error("Failed to fetch men's bottomwear");
//   }
// };

// const getAllWomenWestern = async (req) => {
//   try {

//     return Cache_Features.returnFromCache("wwtn", req);
//   } catch (error) {
//     console.error("Error fetching men's bottomwear:", error);
//     throw new Error("Failed to fetch men's bottomwear");
//   }
// };

// const getAllWomenFootwear = async (req) => {
//   try {
//     return Cache_Features.returnFromCache("wftr", req);
//   } catch (error) {
//     console.error("Error fetching men's bottomwear:", error);
//     throw new Error("Failed to fetch men's bottomwear");
//   }
// };

// const getAllBoysBrands = async (req) => {
//   try {
//     return Cache_Features.returnFromCache("bbds", req);

//   } catch (error) {
//     console.error("Error fetching men's bottomwear:", error);
//     throw new Error("Failed to fetch men's bottomwear");
//   }
// };

// const getAllGirlsGrands = async (req) => {
//   try {
//     return Cache_Features.returnFromCache("ggds", req);

//   } catch (error) {
//     console.error("Error fetching men's bottomwear:", error);
//     throw new Error("Failed to fetch men's bottomwear");
//   }
// };

// const getAllMensWA = async (req) => {
//   try {
//     return Cache_Features.returnFromCache("mwa", req);

//   } catch (error) {
//     console.error("Error fetching men's bottomwear:", error);
//     throw new Error("Failed to fetch men's bottomwear");
//   }
// };

// const getAllWomensWA = async (req) => {
//   try {
//     return Cache_Features.returnFromCache("wwa", req);

//   } catch (error) {
//     console.error("Error fetching men's bottomwear:", error);
//     throw new Error("Failed to fetch men's bottomwear");
//   }
// };

// const getAllBoysWA = async (req) => {
//   try {
//     return Cache_Features.returnFromCache("bwa", req);

//   } catch (error) {
//     console.error("Error fetching men's bottomwear:", error);
//     throw new Error("Failed to fetch men's bottomwear");
//   }
// };

// const getAllGirlsWA = async (req) => {
//   try {

//     return Cache_Features.returnFromCache("gwa", req);

//   } catch (error) {
//     console.error("Error fetching men's bottomwear:", error);
//     throw new Error("Failed to fetch men's bottomwear");
//   }
// };

// const getAllBags = async (req) => {

//   try {

//     return Cache_Features.returnFromCache("bgs", req);

//   } catch (error) {
//     console.error("Error fetching men's bottomwear:", error);
//     throw new Error("Failed to fetch men's bottomwear");
//   }
// };

// const getAllSuitcases = async (req) => {
//   try {
//     return Cache_Features.returnFromCache("sts", req);

//   } catch (error) {
//     console.error("Error fetching men's bottomwear:", error);
//     throw new Error("Failed to fetch men's bottomwear");
//   }
// };

// const getAllLuggages = async (req) => {
//   try {

//     return Cache_Features.returnFromCache("lgs", req);

//   } catch (error) {
//     console.error("Error fetching men's bottomwear:", error);
//     throw new Error("Failed to fetch men's bottomwear");
//   }
// };

// const getPerProduct = async (req) => {
//   try {
//     const rawCategory = req.query.category?.trim();
//     const normalizedCategory = rawCategory
//       .split(/[-_\s]/)
//       .filter(Boolean)
//       .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
//       .join('');
//     const proCategory = all_Codes.productCode[normalizedCategory]; // mapping se DTO key
//     const proId = req.query.productID;

//     const products = await Schema_DTOs[proCategory].find({ productID: proId }).lean();
//     return products;
//   } catch (error) {
//     console.error("Error fetching product:", error);
//     throw new Error("Failed to fetch product");
//   }
// };

// export const showcaseLazyLoad = async (req) => {
//   try {
//     const { subCategory, offset } = req.query;

//     // Validate or sanitize inputs
//     const parsedOffset = parseInt(offset, 10) || 0;
//     const limit = 9; // You can adjust this as needed

//     // Query your DB based on subCategory and offset
//     const products = await Schema_DTOs["mtr"].find({ subCategory })
//       .skip(parsedOffset)
//       .limit(limit);

//     res.status(200).json({ productInfo: products });
//   } catch (error) {
//     console.error("Error in showcaseLazyLoad:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// const products_Model_For_Show = { getShowCaseMensWear, getShowCaseWomensWear, getShowCaseGirlsGrands, getShowCaseBoysBrands, getShowCaseSuitcases, getShowCaseBags, getShowCaseLuggages, getAllMenTopwear, getAllMenBottomwear, getAllMenFootwear, getAllWomenEthnic, getAllWomenWestern, getAllWomenFootwear, getAllBoysBrands, getAllGirlsGrands, getAllMensWA, getAllWomensWA, getAllBoysWA, getAllGirlsWA, getAllBags, getAllSuitcases, getAllLuggages, getPerProduct };
// export default products_Model_For_Show;
