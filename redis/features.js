import { GLOBAL_REDIS_TTL } from "./config.js";
import { redisClient } from "../server.js";
import Schema_DTOs from "../DTOs/schemaDetails.js";
import products_Model_For_Show from "../models/getProductsModel.js";

const schemaKeyMap = {
    mtr: "men-topwear-products",
    mbtr: "men-bottomwear-products",
    mfr: "men-footwear-products",
    weth: "women-ethnic-products",
    wwtn: "women-western-products",
    wftr: "women-footwear-products",
    bbds: "boys-brands-products",
    ggds: "girls-grands-products",
    mwa: "men-wa-products",
    wwa: "women-wa-products",
    bwa: "boys-wa-products",
    gwa: "girls-wa-products",
    bgs: "bags-products",
    sts: "suitcases-products",
    lgs: "lgs-products"
};

const saveInCache = async (key, data) => {
    await redisClient.set(key, JSON.stringify(data));
};

const returnFromCache = async (code, key, data, req) => {

    const offset = Number(req.body.offset);
    const limit = Number(req.body.limit);
    const tabValues = req.body.tabValues;

    if (offset < 1) {
        await redisClient.del(key);
        for (const product of data) {
            await redisClient.lPush(key, JSON.stringify(product));
        }

    }

    const items = await redisClient.lRange(key, 0, -1);
    const parsedItems = items.map(p => JSON.parse(p));

    // console.log("Tab==>", parsedItems);

    let result = [];

    for (const tab of tabValues) {

        let tabProducts;
        if (code == "bbds" || code == "ggds") {

            tabProducts = parsedItems.filter(p => p.productType === tab);
        }
        else if (code == "bgs" || code == "sts" || code == "lgs") {

            tabProducts = parsedItems.filter(p => p.gender === tab);

        }
        else {

            tabProducts = parsedItems.filter(p => p.subCategory === tab);
        }

        // Apply offset/limit for this tab
        const paginated = tabProducts.slice(offset, offset + limit);

        // Add to final result
        result = [...result, ...paginated];
    }


    return result;
}

async function loadAndCacheProducts() {
    for (const [shortCode, redisKey] of Object.entries(schemaKeyMap)) {

        const products = await Schema_DTOs[shortCode].find({ status: "Active" }).lean();

        for (const product of products) {
            await redisClient.set(redisKey, JSON.stringify(products));
        }

        console.log(`Cached ${products.length} products into Redis list: ${redisKey}`);
    }

    products_Model_For_Show.getShowCaseMensWear();
    products_Model_For_Show.getShowCaseWomensWear();
    products_Model_For_Show.getShowCaseBoysBrands();
    products_Model_For_Show.getShowCaseGirlsGrands();
    products_Model_For_Show.getShowCaseBags();
    products_Model_For_Show.getShowCaseSuitcases();
    products_Model_For_Show.getShowCaseMensWear();

}

(async function () {

    await loadAndCacheProducts();

    setInterval(async () => {
        await loadAndCacheProducts();
    }, 1000 * 60 * 30);

})();


const Cache_Features = { saveInCache, returnFromCache };
export default Cache_Features;
