import { GLOBAL_REDIS_TTL } from "./config.js";
import { redisClient } from "../server.js";
const saveInCache = async (key, data) => {
    await redisClient.setEx(key, GLOBAL_REDIS_TTL, JSON.stringify(data));
}

const returnFromCache = async (code, key, data, req) => {

    const offset = Number(req.body.offset);
    const limit = Number(req.body.limit);
    const tabValues = req.body.tabValues;
    // const stop = offset + limit - 1;

    if (offset < 1) {
        await redisClient.del(key);
        for (const product of data) {
            await redisClient.lPush(key, JSON.stringify(product));
        }

    }

    const items = await redisClient.lRange(key, 0, -1);
    const parsedItems = items.map(p => JSON.parse(p));

    console.log("Tab==>", parsedItems);

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

const Cache_Features = { saveInCache, returnFromCache };
export default Cache_Features;
