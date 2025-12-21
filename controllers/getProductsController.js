import products_Model_For_Show from "../models/getProductsModel.js";

const showCaseMensWear = async (req, res) => {

  try {

    const productInfo = await products_Model_For_Show.getShowCaseMensWear(req);

    res.status(200).json({ message: "Products is Here!", productInfo });
  } catch (err) {
    res.status(500).json({ message: "Error to fetch product", details: err.message });
  }

}

const showCaseWomensWear = async (req, res) => {

  try {

    const productInfo = await products_Model_For_Show.getShowCaseWomensWear(req);

    res.status(200).json({ message: "Products is Here!", productInfo });
  } catch (err) {
    res.status(500).json({ message: "Error to fetch product", details: err.message });
  }

}

const showCaseBoysBrands = async (req, res) => {

  try {

    const productInfo = await products_Model_For_Show.getShowCaseBoysBrands(req);

    res.status(200).json({ message: "Products is Here!", productInfo });
  } catch (err) {
    res.status(500).json({ message: "Error to fetch product", details: err.message });
  }

}

const showCaseGirlsGrands = async (req, res) => {

  try {

    const productInfo = await products_Model_For_Show.getShowCaseGirlsGrands();

    res.status(200).json({ message: "Products is Here!", productInfo });
  } catch (err) {
    res.status(500).json({ message: "Error to fetch product", details: err.message });
  }

}

const showCaseBags = async (req, res) => {

  try {

    const productInfo = await products_Model_For_Show.getShowCaseBags();

    res.status(200).json({ message: "Products is Here!", productInfo });
  } catch (err) {
    res.status(500).json({ message: "Error to fetch product", details: err.message });
  }

}

const showCaseSuitcases = async (req, res) => {

  try {

    const productInfo = await products_Model_For_Show.getShowCaseSuitcases();

    res.status(200).json({ message: "Products is Here!", productInfo });
  } catch (err) {
    res.status(500).json({ message: "Error to fetch product", details: err.message });
  }

}

const showCaseLuggages = async (req, res) => {

  try {

    const productInfo = await products_Model_For_Show.getShowCaseLuggages();

    res.status(200).json({ message: "Products is Here!", productInfo });
  } catch (err) {
    res.status(500).json({ message: "Error to fetch product", details: err.message });
  }

}

const allMenTopWear = async (req, res) => {

  try {

    const productInfo = await products_Model_For_Show.getAllMenTopwear(req);

    res.status(200).json({ message: "Product is Here!", productInfo });
  } catch (err) {
    res.status(500).json({ message: "Error to fetch product", details: err.message });
  }
  
};


const allMenBottomWear = async (req, res) => {

  try {

    const productInfo = await products_Model_For_Show.getAllMenBottomwear(req);

    res.status(200).json({ message: "Product is Here!", productInfo });
  } catch (err) {
    res.status(500).json({ message: "Error to fetch product", details: err.message });
  }
};
const allMenFootwear = async (req, res) => {

  try {

    const productInfo = await products_Model_For_Show.getAllMenFootwear(req);

    res.status(200).json({ message: "Product is Here!", productInfo });
  } catch (err) {
    res.status(500).json({ message: "Error to fetch product", details: err.message });
  }
};

const allWomenEthnic = async (req, res) => {

  try {

    const productInfo = await products_Model_For_Show.getAllWomenEthnic(req);

    res.status(200).json({ message: "Product is Here!", productInfo });
  } catch (err) {
    res.status(500).json({ message: "Error to fetch product", details: err.message });
  }
};
const allWomenWestern = async (req, res) => {

  try {

    const productInfo = await products_Model_For_Show.getAllWomenWestern(req);

    res.status(200).json({ message: "Product is Here!", productInfo });
  } catch (err) {
    res.status(500).json({ message: "Error to fetch product", details: err.message });
  }
};
const allWomenFootwear = async (req, res) => {

  try {

    const productInfo = await products_Model_For_Show.getAllWomenFootwear(req);

    res.status(200).json({ message: "Product is Here!", productInfo });
  } catch (err) {
    res.status(500).json({ message: "Error to fetch product", details: err.message });
  }
};
const allBoysBrands = async (req, res) => {

  try {

    const productInfo = await products_Model_For_Show.getAllBoysBrands(req);

    res.status(200).json({ message: "Product is Here!", productInfo });
  } catch (err) {
    res.status(500).json({ message: "Error to fetch product", details: err.message });
  }
};
const allGirlsGrands = async (req, res) => {

  try {

    const productInfo = await products_Model_For_Show.getAllGirlsGrands(req);

    res.status(200).json({ message: "Product is Here!", productInfo });
  } catch (err) {
    res.status(500).json({ message: "Error to fetch product", details: err.message });
  }
};
const allMensWA = async (req, res) => {

  try {

    const productInfo = await products_Model_For_Show.getAllMensWA(req);

    res.status(200).json({ message: "Product is Here!", productInfo });
  } catch (err) {
    res.status(500).json({ message: "Error to fetch product", details: err.message });
  }
};
const allWomensWA = async (req, res) => {

  try {

    const productInfo = await products_Model_For_Show.getAllWomensWA(req);

    res.status(200).json({ message: "Product is Here!", productInfo });
  } catch (err) {
    res.status(500).json({ message: "Error to fetch product", details: err.message });
  }
};
const allBoysWA = async (req, res) => {

  try {

    const productInfo = await products_Model_For_Show.getAllBoysWA(req);

    res.status(200).json({ message: "Product is Here!", productInfo });
  } catch (err) {
    res.status(500).json({ message: "Error to fetch product", details: err.message });
  }
};
const allGirlsWA = async (req, res) => {

  try {

    const productInfo = await products_Model_For_Show.getAllGirlsWA(req);

    res.status(200).json({ message: "Product is Here!", productInfo });
  } catch (err) {
    res.status(500).json({ message: "Error to fetch product", details: err.message });
  }
};
const allBags = async (req, res) => {

  try {

    const productInfo = await products_Model_For_Show.getAllBags(req);

    res.status(200).json({ message: "Product is Here!", productInfo });
  } catch (err) {
    res.status(500).json({ message: "Error to fetch product", details: err.message });
  }
};
const allSuitcases = async (req, res) => {

  try {

    const productInfo = await products_Model_For_Show.getAllSuitcases(req);

    res.status(200).json({ message: "Product is Here!", productInfo });
  } catch (err) {
    res.status(500).json({ message: "Error to fetch product", details: err.message });
  }
};
const allLuggages = async (req, res) => {

  try {

    const productInfo = await products_Model_For_Show.getAllLuggages(req);

    res.status(200).json({ message: "Product is Here!", productInfo });
  } catch (err) {
    res.status(500).json({ message: "Error to fetch product", details: err.message });
  }
};
const perProduct = async (req, res) => {

  try {

    const productInfo = await products_Model_For_Show.getPerProduct(req);

    res.status(200).json({ message: "Product is Here!", productInfo });
  } catch (err) {
    res.status(500).json({ message: "Error to fetch product", details: err.message });
  }
};




export const showcaseLazyLoad = async (req, res) => {
  try {

    const productInfo = await products_Model_For_Show.getShowcaseLazyLoad(req);

    res.status(200).json({ message: "Products is Here!", productInfo });

   
  } catch (error) {
    console.error("Error in showcaseLazyLoad:", error);
        res.status(500).json({ message: "Error to fetch product", details: error.message });

  }
};


const getProducts = { showCaseMensWear, showCaseWomensWear, showCaseBoysBrands, showCaseGirlsGrands, showCaseBags, showCaseSuitcases, showCaseLuggages,showcaseLazyLoad, allMenTopWear, allMenBottomWear, allMenFootwear, allWomenEthnic, allWomenWestern, allWomenFootwear, allBoysBrands, allGirlsGrands, allMensWA, allWomensWA, allBoysWA, allGirlsWA, allBags, allSuitcases, allLuggages, perProduct};

export default getProducts;

