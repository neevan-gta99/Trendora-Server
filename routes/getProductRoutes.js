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


router.post('/get-all-men-topwears', getProducts.allMenTopWear);
router.post('/get-all-men-bottomwears', getProducts.allMenBottomWear);
router.post('/get-all-men-footwears', getProducts.allMenFootwear);
router.post('/get-all-women-ethnic', getProducts.allWomenEthnic);
router.post('/get-all-women-western', getProducts.allWomenWestern);
router.post('/get-all-women-footwears', getProducts.allWomenFootwear);
router.post('/get-all-boys-brands', getProducts.allBoysBrands);
router.post('/get-all-girls-grands', getProducts.allGirlsGrands);
router.post('/get-all-mens-wa', getProducts.allMensWA);
router.post('/get-all-womens-wa', getProducts.allWomensWA);
router.post('/get-all-boys-wa', getProducts.allBoysWA);
router.post('/get-all-girls-wa', getProducts.allGirlsWA);
router.post('/get-all-bags', getProducts.allBags);
router.post('/get-all-suitcases', getProducts.allSuitcases);
router.post('/get-all-luggages', getProducts.allLuggages);


router.get('/perProduct', getProducts.perProduct);



router.get('/showcase-lazy-load', getProducts.showcaseLazyLoad);

export default router;