import Schema_DTOs from "../DTOs/schemaDetails.js";
import all_Codes from "../utils/codes.js";
import { redisClient } from "../server.js";
import Cache_Features from "../redis/features.js";
import { GLOBAL_REDIS_TTL } from "../redis/config.js";


const getShowCaseMensWear = async () => {

  const redisId = "mtr-mbtr-mfr";
  const cacheKey = `showcase-menswear:${redisId}`;
  const cached = await redisClient.get(cacheKey);

  if (cached) {
    return JSON.parse(cached);
  }

  try {
    const showcaseProducts = await Schema_DTOs["mtr"].find({ hot: true });
    const showcaseProducts2 = await Schema_DTOs["mbtr"].find({ hot: true });
    const showcaseProducts3 = await Schema_DTOs["mfr"].find({ hot: true });

    const totalShowcase = [
      ...showcaseProducts,
      ...showcaseProducts2,
      ...showcaseProducts3
    ];

    await Cache_Features.saveInCache(cacheKey, totalShowcase);
    return totalShowcase;

  } catch (error) {
    console.error("Error fetching men's shocase topwear:", error);
    throw new Error("Failed to fetch men's showcase topwear");
  }
};

const getShowCaseWomensWear = async () => {

  const redisId = "weth-wwtn-wftr";
  const cacheKey = `showcase-womenswear:${redisId}`;
  const cached = await redisClient.get(cacheKey);

  if (cached) {
    return JSON.parse(cached);
  }

  try {
    const showcaseProducts = await Schema_DTOs["weth"].find({ hot: true });
    const showcaseProducts2 = await Schema_DTOs["wwtn"].find({ hot: true });
    const showcaseProducts3 = await Schema_DTOs["wftr"].find({ hot: true });

    const totalShowcase = [
      ...showcaseProducts,
      ...showcaseProducts2,
      ...showcaseProducts3
    ];

    await Cache_Features.saveInCache(cacheKey, totalShowcase);
    return totalShowcase;

  } catch (error) {
    console.error("Error fetching men's shocase topwear:", error);
    throw new Error("Failed to fetch men's showcase topwear");
  }
};

const getShowCaseBoysBrands = async () => {

  const redisId = "bbds";
  const cacheKey = `showcase-boysbrands:${redisId}`;
  const cached = await redisClient.get(cacheKey);

  if (cached) {
    return JSON.parse(cached);
  }

  try {
    const showcaseProducts = await Schema_DTOs["bbds"].find({ hot: true });

    await Cache_Features.saveInCache(cacheKey, showcaseProducts);

    return showcaseProducts;

  } catch (error) {
    console.error("Error fetching men's shocase topwear:", error);
    throw new Error("Failed to fetch men's showcase topwear");
  }
};

const getShowCaseGirlsGrands = async () => {

  const redisId = "ggds";
  const cacheKey = `showcase-girlsgrands:${redisId}`;
  const cached = await redisClient.get(cacheKey);

  if (cached) {
    return JSON.parse(cached);
  }

  try {
    const showcaseProducts = await Schema_DTOs["ggds"].find({ hot: true });

    await Cache_Features.saveInCache(cacheKey, showcaseProducts);
    return showcaseProducts;

  } catch (error) {
    console.error("Error fetching men's shocase topwear:", error);
    throw new Error("Failed to fetch men's showcase topwear");
  }
};

const getShowCaseBags = async () => {

  const redisId = "bgs";
  const cacheKey = `showcase-bags:${redisId}`;
  const cached = await redisClient.get(cacheKey);

  if (cached) {
    return JSON.parse(cached);
  }

  try {
    const showcaseProducts = await Schema_DTOs["bgs"].find({ hot: true });
    await Cache_Features.saveInCache(cacheKey, showcaseProducts);
    return showcaseProducts;

  } catch (error) {
    console.error("Error fetching men's shocase topwear:", error);
    throw new Error("Failed to fetch men's showcase topwear");
  }
};

const getShowCaseSuitcases = async () => {

  const redisId = "sts";
  const cacheKey = `showcase-suitcases:${redisId}`;
  const cached = await redisClient.get(cacheKey);

  if (cached) {
    return JSON.parse(cached);
  }

  try {
    const showcaseProducts = await Schema_DTOs["sts"].find({ hot: true });
    await Cache_Features.saveInCache(cacheKey, showcaseProducts);
    return showcaseProducts;

  } catch (error) {
    console.error("Error fetching men's shocase topwear:", error);
    throw new Error("Failed to fetch men's showcase topwear");
  }
};

const getShowCaseLuggages = async () => {

  const redisId = "lgs";
  const cacheKey = `showcase-luggages:${redisId}`;
  const cached = await redisClient.get(cacheKey);

  if (cached) {
    return JSON.parse(cached);
  }

  try {
    const showcaseProducts = await Schema_DTOs["lgs"].find({ hot: true });
    await Cache_Features.saveInCache(cacheKey, showcaseProducts);
    return showcaseProducts;

  } catch (error) {
    console.error("Error fetching men's shocase topwear:", error);
    throw new Error("Failed to fetch men's showcase topwear");
  }
};

const getAllMenTopwear = async (req) => {

  try {

    const products = await Schema_DTOs["mtr"].find({ status: "Active" }).lean();
    const key = "men-topwear-products";
    
    return Cache_Features.returnFromCache("mtr",key,products,req);

  } catch (error) {
    console.error("Error fetching men's topwear:", error);
    throw new Error("Failed to fetch men's topwear");
  }
};

const getAllMenBottomwear = async (req) => {
  try {
    const products = await Schema_DTOs["mbtr"].find({ status: "Active" }).lean();
    const key = "men-bottomwear-products";
    
    return Cache_Features.returnFromCache("mbtr",key,products,req);
  } catch (error) {
    console.error("Error fetching men's bottomwear:", error);
    throw new Error("Failed to fetch men's bottomwear");
  }
};

const getAllMenFootwear = async (req) => {
  try {
    const products = await Schema_DTOs["mfr"].find({ status: "Active" }).lean();
    const key = "men-footwear-products";
    
    return Cache_Features.returnFromCache("mfr",key,products,req);
  } catch (error) {
    console.error("Error fetching men's bottomwear:", error);
    throw new Error("Failed to fetch men's bottomwear");
  }
};

const getAllWomenEthnic = async (req) => {
  try {
    const products = await Schema_DTOs["weth"].find({ status: "Active" }).lean();
    const key = "women-ethnic-products";
    
    return Cache_Features.returnFromCache("weth",key,products,req);
  } catch (error) {
    console.error("Error fetching men's bottomwear:", error);
    throw new Error("Failed to fetch men's bottomwear");
  }
};

const getAllWomenWestern = async (req) => {
  try {
    const products = await Schema_DTOs["wwtn"].find({ status: "Active" }).lean();
    const key = "women-western-products";
    
    return Cache_Features.returnFromCache("wwtn",key,products,req);
  } catch (error) {
    console.error("Error fetching men's bottomwear:", error);
    throw new Error("Failed to fetch men's bottomwear");
  }
};

const getAllWomenFootwear = async (req) => {
  try {
    const products = await Schema_DTOs["wftr"].find({ status: "Active" }).lean();
    const key = "women-footwear-products";
    
    return Cache_Features.returnFromCache("wftr",key,products,req);
  } catch (error) {
    console.error("Error fetching men's bottomwear:", error);
    throw new Error("Failed to fetch men's bottomwear");
  }
};

const getAllBoysBrands = async (req) => {
  try {
    const products = await Schema_DTOs["bbds"].find({ status: "Active" }).lean();
    const key = "boys-brands-products";
    console.log("Products==>>>>>",products);
    
    return Cache_Features.returnFromCache("bbds",key,products,req);

  } catch (error) {
    console.error("Error fetching men's bottomwear:", error);
    throw new Error("Failed to fetch men's bottomwear");
  }
};

const getAllGirlsGrands = async (req) => {
  try {
    const products = await Schema_DTOs["ggds"].find({ status: "Active" }).lean();
    const key = "girls-grands-products";
    return Cache_Features.returnFromCache("ggds",key,products,req);

  } catch (error) {
    console.error("Error fetching men's bottomwear:", error);
    throw new Error("Failed to fetch men's bottomwear");
  }
};

const getAllMensWA = async (req) => {
  try {

    const products = await Schema_DTOs["mwa"].find({ status: "Active" }).lean();
    const key = "men-wa-products";
    return Cache_Features.returnFromCache("mwa",key,products,req);

  } catch (error) {
    console.error("Error fetching men's bottomwear:", error);
    throw new Error("Failed to fetch men's bottomwear");
  }
};

const getAllWomensWA = async (req) => {
  try {
    const products = await Schema_DTOs["wwa"].find({ status: "Active" }).lean();
    const key = "women-wa-products";
    return Cache_Features.returnFromCache("wwa",key,products,req);

  } catch (error) {
    console.error("Error fetching men's bottomwear:", error);
    throw new Error("Failed to fetch men's bottomwear");
  }
};

const getAllBoysWA = async (req) => {
  try {
    const products = await Schema_DTOs["bwa"].find({ status: "Active" }).lean();
    const key = "boys-wa-products";
    return Cache_Features.returnFromCache("bwa",key,products,req);

  } catch (error) {
    console.error("Error fetching men's bottomwear:", error);
    throw new Error("Failed to fetch men's bottomwear");
  }
};

const getAllGirlsWA = async (req) => {
  try {
    const products = await Schema_DTOs["gwa"].find({ status: "Active" }).lean();
    const key = "girls-wa-products";
    return Cache_Features.returnFromCache("gwa",key,products,req);

  } catch (error) {
    console.error("Error fetching men's bottomwear:", error);
    throw new Error("Failed to fetch men's bottomwear");
  }
};

const getAllBags = async (req) => {
  
  try {
    const products = await Schema_DTOs["bgs"].find({ status: "Active" }).lean();
    const key = "bags-products";
    return Cache_Features.returnFromCache("bgs",key,products,req);

  } catch (error) {
    console.error("Error fetching men's bottomwear:", error);
    throw new Error("Failed to fetch men's bottomwear");
  }
};

const getAllSuitcases = async (req) => {
  try {
    const products = await Schema_DTOs["sts"].find({ status: "Active" }).lean();
    const key = "suitcases-products";
    return Cache_Features.returnFromCache("sts",key,products,req);

  } catch (error) {
    console.error("Error fetching men's bottomwear:", error);
    throw new Error("Failed to fetch men's bottomwear");
  }
};

const getAllLuggages = async (req) => {
  try {
    const products = await Schema_DTOs["lgs"].find({ status: "Active" }).lean();
    const key = "lgs-products";
    return Cache_Features.returnFromCache("lgs",key,products,req);

  } catch (error) {
    console.error("Error fetching men's bottomwear:", error);
    throw new Error("Failed to fetch men's bottomwear");
  }
};

const getPerProduct = async (req) => {
  try {
    const rawCategory = req.query.category?.trim();
    const normalizedCategory = rawCategory
      .split(/[-_\s]/)
      .filter(Boolean)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join('');
    const proCategory = all_Codes.productCode[normalizedCategory]; // mapping se DTO key
    const proId = req.query.productID;

    const products = await Schema_DTOs[proCategory].find({ productID: proId }).lean();
    return products;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw new Error("Failed to fetch product");
  }
};

export const showcaseLazyLoad = async (req) => {
  try {
    const { subCategory, offset } = req.query;

    // Validate or sanitize inputs
    const parsedOffset = parseInt(offset, 10) || 0;
    const limit = 9; // You can adjust this as needed

    // Query your DB based on subCategory and offset
    const products = await Schema_DTOs["mtr"].find({ subCategory })
      .skip(parsedOffset)
      .limit(limit);

    res.status(200).json({ productInfo: products });
  } catch (error) {
    console.error("Error in showcaseLazyLoad:", error);
    res.status(500).json({ message: "Server error" });
  }
};


const products_Model_For_Show = { getShowCaseMensWear, getShowCaseWomensWear, getShowCaseGirlsGrands, getShowCaseBoysBrands, getShowCaseSuitcases, getShowCaseBags, getShowCaseLuggages, getAllMenTopwear, getAllMenBottomwear, getAllMenFootwear, getAllWomenEthnic, getAllWomenWestern, getAllWomenFootwear, getAllBoysBrands, getAllGirlsGrands, getAllMensWA, getAllWomensWA, getAllBoysWA, getAllGirlsWA, getAllBags, getAllSuitcases, getAllLuggages, getPerProduct };
export default products_Model_For_Show;
