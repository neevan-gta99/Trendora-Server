import express from 'express';
import getProducts from '../controllers/getProductsController.js';
const router = express.Router();


router.get('/get-showcase-men-wears', getProducts.showCaseMensWear);
router.get('/get-showcase-women-wears', getProducts.showCaseWomensWear);
router.get('/get-showcase-boys-brands', getProducts.showCaseBoysBrands);
router.get('/get-showcase-girls-grands', getProducts.showCaseGirlsGrands);
router.get('/get-showcase-bags', getProducts.showCaseBags);
router.get('/get-showcase-suitcases', getProducts.showCaseSuitcases);
router.get('/get-showcase-luggages', getProducts.showCaseLuggages);


router.get('/get-all-men-topwears', getProducts.allMenTopWear);
router.get('/get-all-men-bottomwears', getProducts.allMenBottomWear);
router.get('/get-all-men-footwears', getProducts.allMenFootwear);
router.get('/get-all-women-ethnic', getProducts.allWomenEthnic);
router.get('/get-all-women-western', getProducts.allWomenWestern);
router.get('/get-all-women-footwears', getProducts.allWomenFootwear);
router.get('/get-all-boys-brands', getProducts.allBoysBrands);
router.get('/get-all-girls-grands', getProducts.allGirlsGrands);
router.get('/get-all-mens-wa', getProducts.allMensWA);
router.get('/get-all-womens-wa', getProducts.allWomensWA);
router.get('/get-all-boys-wa', getProducts.allBoysWA);
router.get('/get-all-girls-wa', getProducts.allGirlsWA);
router.get('/get-all-bags', getProducts.allBags);
router.get('/get-all-suitcases', getProducts.allSuitcases);
router.get('/get-all-luggages', getProducts.allLuggages);


router.get('/perProduct', getProducts.perProduct);



router.get('/showcase-lazy-load', getProducts.showcaseLazyLoad);

export default router;