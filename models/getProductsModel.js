import Schema_DTOs from "../DTOs/schemaDetails.js";
import all_Codes from "../utils/codes.js";

const getShowCaseMensWear = async () => {
  try {
    const showcaseProducts = await Schema_DTOs["mtr"].find({ hot: true });
    const showcaseProducts2 = await Schema_DTOs["mbtr"].find({ hot: true });
    const showcaseProducts3 = await Schema_DTOs["mfr"].find({ hot: true });

    return [
      ...showcaseProducts,
      ...showcaseProducts2,
      ...showcaseProducts3
    ];

  } catch (error) {
    console.error("Error fetching men's shocase topwear:", error);
    throw new Error("Failed to fetch men's showcase topwear");
  }
};
const getShowCaseWomensWear = async () => {
  try {
    const showcaseProducts = await Schema_DTOs["weth"].find({ hot: true });
    const showcaseProducts2 = await Schema_DTOs["wwtn"].find({ hot: true });
    const showcaseProducts3 = await Schema_DTOs["wftr"].find({ hot: true });

    return [
      ...showcaseProducts,
      ...showcaseProducts2,
      ...showcaseProducts3
    ];

  } catch (error) {
    console.error("Error fetching men's shocase topwear:", error);
    throw new Error("Failed to fetch men's showcase topwear");
  }
};

const getShowCaseBoysBrands = async () => {
  try {
    const showcaseProducts = await Schema_DTOs["bbds"].find({ hot: true });
    return showcaseProducts;

  } catch (error) {
    console.error("Error fetching men's shocase topwear:", error);
    throw new Error("Failed to fetch men's showcase topwear");
  }
};

const getShowCaseGirlsGrands = async () => {
  try {
    const showcaseProducts = await Schema_DTOs["ggds"].find({ hot: true });

    return showcaseProducts;

  } catch (error) {
    console.error("Error fetching men's shocase topwear:", error);
    throw new Error("Failed to fetch men's showcase topwear");
  }
};

const getShowCaseBags = async () => {
  try {
    const showcaseProducts = await Schema_DTOs["bgs"].find({ hot: true });

    return showcaseProducts;

  } catch (error) {
    console.error("Error fetching men's shocase topwear:", error);
    throw new Error("Failed to fetch men's showcase topwear");
  }
};

const getShowCaseSuitcases = async () => {
  try {
    const showcaseProducts = await Schema_DTOs["sts"].find({ hot: true });

    return showcaseProducts;

  } catch (error) {
    console.error("Error fetching men's shocase topwear:", error);
    throw new Error("Failed to fetch men's showcase topwear");
  }
};

const getShowCaseLuggages = async () => {
  try {
    const showcaseProducts = await Schema_DTOs["lgs"].find({ hot: true });

    return showcaseProducts;

  } catch (error) {
    console.error("Error fetching men's shocase topwear:", error);
    throw new Error("Failed to fetch men's showcase topwear");
  }
};

const getAllMenTopwear = async () => {
  try {
    const products = await Schema_DTOs["mtr"].find({ status: "Active" }).lean();
    return products;
  } catch (error) {
    console.error("Error fetching men's topwear:", error);
    throw new Error("Failed to fetch men's topwear");
  }
};

const getAllMenBottomwear = async () => {
  try {
    const products = await Schema_DTOs["mbtr"].find({ status: "Active" }).lean();
    return products;
  } catch (error) {
    console.error("Error fetching men's bottomwear:", error);
    throw new Error("Failed to fetch men's bottomwear");
  }
};

const getAllMenFootwear = async () => {
  try {
    const products = await Schema_DTOs["mfr"].find({ status: "Active" }).lean();
    return products;
  } catch (error) {
    console.error("Error fetching men's bottomwear:", error);
    throw new Error("Failed to fetch men's bottomwear");
  }
};
const getAllWomenEthnic = async () => {
  try {
    const products = await Schema_DTOs["weth"].find({ status: "Active" }).lean();
    return products;
  } catch (error) {
    console.error("Error fetching men's bottomwear:", error);
    throw new Error("Failed to fetch men's bottomwear");
  }
};
const getAllWomenWestern = async () => {
  try {
    const products = await Schema_DTOs["wwtn"].find({ status: "Active" }).lean();
    return products;
  } catch (error) {
    console.error("Error fetching men's bottomwear:", error);
    throw new Error("Failed to fetch men's bottomwear");
  }
};
const getAllWomenFootwear = async () => {
  try {
    const products = await Schema_DTOs["wftr"].find({ status: "Active" }).lean();
    return products;
  } catch (error) {
    console.error("Error fetching men's bottomwear:", error);
    throw new Error("Failed to fetch men's bottomwear");
  }
};
const getAllBoysBrands = async () => {
  try {
    const products = await Schema_DTOs["bbds"].find({ status: "Active" }).lean();
    return products;
  } catch (error) {
    console.error("Error fetching men's bottomwear:", error);
    throw new Error("Failed to fetch men's bottomwear");
  }
};
const getAllGirlsGrands = async () => {
  try {
    const products = await Schema_DTOs["ggds"].find({ status: "Active" }).lean();
    return products;
  } catch (error) {
    console.error("Error fetching men's bottomwear:", error);
    throw new Error("Failed to fetch men's bottomwear");
  }
};
const getAllMensWA = async () => {
  try {
    const products = await Schema_DTOs["mwa"].find({ status: "Active" }).lean();
    return products;
  } catch (error) {
    console.error("Error fetching men's bottomwear:", error);
    throw new Error("Failed to fetch men's bottomwear");
  }
};
const getAllWomensWA = async () => {
  try {
    const products = await Schema_DTOs["wwa"].find({ status: "Active" }).lean();
    return products;
  } catch (error) {
    console.error("Error fetching men's bottomwear:", error);
    throw new Error("Failed to fetch men's bottomwear");
  }
};
const getAllBoysWA = async () => {
  try {
    const products = await Schema_DTOs["bwa"].find({ status: "Active" }).lean();
    return products;
  } catch (error) {
    console.error("Error fetching men's bottomwear:", error);
    throw new Error("Failed to fetch men's bottomwear");
  }
};
const getAllGirlsWA = async () => {
  try {
    const products = await Schema_DTOs["gwa"].find({ status: "Active" }).lean();
    return products;
  } catch (error) {
    console.error("Error fetching men's bottomwear:", error);
    throw new Error("Failed to fetch men's bottomwear");
  }
};
const getAllBags = async () => {
  try {
    const products = await Schema_DTOs["bgs"].find({ status: "Active" }).lean();
    return products;
  } catch (error) {
    console.error("Error fetching men's bottomwear:", error);
    throw new Error("Failed to fetch men's bottomwear");
  }
};
const getAllSuitcases = async () => {
  try {
    const products = await Schema_DTOs["sts"].find({ status: "Active" }).lean();
    return products;
  } catch (error) {
    console.error("Error fetching men's bottomwear:", error);
    throw new Error("Failed to fetch men's bottomwear");
  }
};
const getAllLuggages = async () => {
  try {
    const products = await Schema_DTOs["lgs"].find({ status: "Active" }).lean();
    return products;
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
