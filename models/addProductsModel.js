import buildDTO from '../DTOs/productDTOs.js';


const dtoMap = {
    menTop: buildDTO.buildMensTopwearDTO,
    menBottom: buildDTO.buildMensBottomwearDTO,
    menFoot: buildDTO.buildMensFootwearDTO,
    womenEthnic: buildDTO.buildWomensEthnicDTO,
    womenWest: buildDTO.buildWomensWesternDTO,
    womenFoot: buildDTO.buildWomensFootwearDTO,
    boysBrands: buildDTO.buildBoysBrandsDTO,
    girlsGrands: buildDTO.buildGirlsGrandsDTO,
    mensWA: buildDTO.buildMensWADTO,
    womensWA: buildDTO.buildWomensWADTO,
    boysWA: buildDTO.buildBoysWADTO,
    girlsWA: buildDTO.buildGirlsWADTO,
    bags: buildDTO.buildBagsDTO,
    suitcases: buildDTO.buildSuitcasesDTO,
    luggages: buildDTO.buildLuggagesDTO
};

async function giveDTO(condition_category, product) {

    const builderFn = dtoMap[condition_category];
    if (!builderFn) {
        throw new Error("Invalid condition category");
    }
    return await builderFn(product, product.uploadedImages);

}

const commonModelUploader = async (req, condition_category) => {

    if (req.uploadType === "bulk") {
        const rejectedProducts = [];

        const results = await Promise.allSettled(
            req.products.map(async (product) => {
                try {

                    const commonDB = await giveDTO(condition_category, product);
                    await commonDB.save();
                    return commonDB.productID;
                } catch (err) {
                    const identifier = product.ProductName || product.productID || "Unknown Product";
                    rejectedProducts.push(product);
                    throw new Error(`Product "${identifier}" failed: ${err.message}`);
                }
            })
        );

        const success = results
            .filter(r => r.status === "fulfilled")
            .map(r => r.value);

        const failedFromSave = results
            .filter(r => r.status === "rejected")
            .map(r => r.reason.message);

        const failedFromValidation = Array.isArray(req.failedUploads)
            ? req.failedUploads.map(r => `${r.ProductName} failed: ${r.reason}`)
            : [];


        let failed = [];

        if (req.failedUploadsFromClient) {
            failed = [...failedFromValidation, ...failedFromSave, ...req.failedUploadsFromClient];
        }
        else {

            failed = [...failedFromValidation, ...failedFromSave];
        }

        console.log("Success:", success);
        console.log("Failed:", failed);

        return { success, failed };
    }

    // Single product flow
    else {
        const body = req.body;
        let failed = [];

        if (typeof body.variants === "string") {
            try {
                body.variants = JSON.parse(body.variants);
            } catch (err) {
                failed.push(`${body.name}! Invalid variants format`)
                // throw new Error("Invalid variants format");
            }
        }

        body.price = Number(body.price);
        body.discount = Number(body.discount);

        const commonDB = await giveDTO(condition_category, body);
        await commonDB.save();

        return { success: [commonDB.productID], failed };

    }


}

const addMenTopwear = async (req) => {
    return await commonModelUploader(req, "menTop");
};

const addMenBottomwear = async (req) => {
    return await commonModelUploader(req, "menBottom");
};

const addMenFootwear = async (req) => {
    return await commonModelUploader(req, "menFoot");
};
const addWomenEthnic = async (req) => {
    return await commonModelUploader(req, "womenEthnic");
};
const addWomenWestern = async (req) => {
    return await commonModelUploader(req, "womenWest");
};
const addWomenFootwear = async (req) => {
    return await commonModelUploader(req, "womenFoot");
};
const addBoysBrands = async (req) => {
    return await commonModelUploader(req, "boysBrands");
};
const addGirlsGrands = async (req) => {
    return await commonModelUploader(req, "girlsGrands");
};
const addMenWA = async (req) => {
    return await commonModelUploader(req, "mensWA");
};
const addWomenWA = async (req) => {
    return await commonModelUploader(req, "womensWA");
};
const addBoyWA = async (req) => {
    return await commonModelUploader(req, "boysWA"); 
};
const addGirlWA = async (req) => {
    return await commonModelUploader(req, "girlsWA");
};
const addBag = async (req) => {
    return await commonModelUploader(req, "bags");
};
const addSuitcase = async (req) => {
    return await commonModelUploader(req, "suitcases"); 
};
const addLuggage = async (req) => {
    return await commonModelUploader(req, "luggages");
};

const products_Model = { addMenTopwear, addMenBottomwear, addMenFootwear, addWomenEthnic, addWomenWestern, addWomenFootwear, addBoysBrands, addGirlsGrands, addMenWA, addWomenWA, addBoyWA, addGirlWA, addBag, addSuitcase, addLuggage }
export default products_Model;
