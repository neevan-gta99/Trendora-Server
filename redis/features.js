import { GLOBAL_REDIS_TTL } from "./config.js";
import { redisClient } from "../server.js";
import Schema_DTOs from "../DTOs/schemaDetails.js";
import products_Model_For_Show from "../models/getProductsModel.js";
import all_Codes from "../utils/codes.js";

const saveInCache = async (key, data) => {
    await redisClient.set(key, JSON.stringify(data));
};

const saveInCache2 = async (code, allProducts) => {
    const categoryCode = all_Codes.categoryCode[code];
    const withSpaceCategory = all_Codes.addSpaceBeforeCaps(categoryCode);

    const filterProducts = allProducts.filter(p => p.category === withSpaceCategory);

    for (const tab of all_Codes.subCategoryCodes[code]) {

        let tabProducts;

        tabProducts = filterProducts.filter(p => p.productType === tab);

        const redisKey = `${all_Codes.schemaKeyMap[code]}-${tab}`;
        await redisClient.set(redisKey, JSON.stringify(tabProducts));
    }

}

const saveInCache3 = async (code, allProducts) => {
    const categoryCode = all_Codes.categoryCode[code];
    const withSpaceCategory = all_Codes.addSpaceBeforeCaps(categoryCode);

    const filterProducts = allProducts.filter(p => p.category === withSpaceCategory);

    for (const tab of all_Codes.subCategoryCodes[code]) {

        let tabProducts;

        tabProducts = filterProducts.filter(p => p.gender === tab);

        // Save to Redis
        const redisKey = `${all_Codes.schemaKeyMap[code]}-${tab}`;
        await redisClient.set(redisKey, JSON.stringify(tabProducts));
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
        await redisClient.set(redisKey, JSON.stringify(tabProducts));
    }

}

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

        const data = await redisClient.get(redisKey);
        if (!data) continue;

        const parsed = JSON.parse(data);
        const tabProducts = parsed.slice(offset, offset + limit);

        result = [...result, ...tabProducts];
    }

    return result;
};



async function loadAndCacheProducts() {

    await loadInCache();

    products_Model_For_Show.getShowCaseMensWear();
    products_Model_For_Show.getShowCaseWomensWear();
    products_Model_For_Show.getShowCaseBoysBrands();
    products_Model_For_Show.getShowCaseGirlsGrands();
    products_Model_For_Show.getShowCaseBags();
    products_Model_For_Show.getShowCaseSuitcases();

}

(async function () {

    await loadAndCacheProducts();

    setInterval(async () => {
        await loadAndCacheProducts();
    }, 1000 * 60 * 30);

})();


const Cache_Features = { saveInCache, returnFromCache };
export default Cache_Features;
