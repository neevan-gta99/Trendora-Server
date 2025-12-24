const productCode = {
  MenTopwear: "mtr",
  MenBottomwear: "mbr",
  MenFootwear: "mfr",
  WomenEthnic: "weth",
  WomenWestern: "wwtn",
  WomenFootwear: "wftr",
  BoysBrands: "bbds",
  GirlsGrands: "ggds",
  MensWA : "mwa",
  WomensWA : "wwa",
  BoysWA : "bwa",
  GirlsWA : "gwa",
  Bags : "bgs",
  Suitcases : "sts",
  Luggages : "lgs",
};

const categoryCode = {
  mtr: "MenTopwear",
  mbr: "MenBottomwear",
  mfr: "MenFootwear",
  weth: "WomenEthnic",
  wwtn: "WomenWestern",
  wftr: "WomenFootwear",
  bbds: "BoysBrands",
  ggds: "GirlsGrands",
  mwa: "MensWA",
  wwa: "WomensWA",
  bwa: "BoysWA",
  gwa: "GirlsWA",
  bgs: "Bags",
  sts: "Suitcases",
  lgs: "Luggages",
};

const subCategoryCodes = {
  mtr: [" T-Shirt", "Shirt", "Hoodie", "Jacket", "Sweatshirt", "Kurta"],
  mbr: ["Jeans", "Joggers"],
  mfr: ["Shoes", "Slippers"],
  weth: ["Saree", "Kurta"],
  wwtn: ["Tops", "Jeans"],
  wftr: ["Heels", "Wedges"],
  bbds: ["Topwear", "Bottomwear", "Footwear"],
  ggds: ["Topwear", "Bottomwear", "Footwear"],
  mwa: ["Watches", "Accessories"],
  wwa: ["Watches", "Accessories"],
  bwa: ["Watches", "Accessories"],
  gwa: ["Watches", "Accessories"],
  bgs: ["Male", "Female"],
  sts: ["Male", "Female"],
  lgs: ["Male", "Female"],
};

const miniCategoryMap = {
  MensWatchesandAccessories: "Mens WA",
  WomensWatchesandAccessories: "Womens WA",
  BoysWatchesandAccessories: "Boys WA",
  GirlsWatchesandAccessories: "Girls WA",
}

const schemaKeyMap = {
    mtr: "men-topwear-products",
    mbr: "men-bottomwear-products",
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

function addSpaceBeforeCaps(str) { 
  return str.replace(/([a-z])([A-Z])/g, '$1 $2'); 
}

const all_Codes = {productCode, miniCategoryMap, categoryCode, subCategoryCodes, schemaKeyMap,addSpaceBeforeCaps};
export default all_Codes;