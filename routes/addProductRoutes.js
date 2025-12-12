import express from 'express';
import addProduct  from '../controllers/addProductsController.js';
import multer from 'multer';
import singleProductImageUploader from '../cloudinaryUploader/singleUploader.js'
import bulkProductsImagesUploader from '../cloudinaryUploader/bulkUploader.js'
import parser from '../middlewares/parserMiddleware.js';
import product_Validator from '../middlewares/productValidationMiddleware.js';


const router = express.Router();
const upload = multer({ dest: 'temp/' });

// For Single Product 
router.post('/men-topwear', upload.array("images", 10), singleProductImageUploader.singleUploads, addProduct.menTopwear);
router.post('/men-bottomwear', upload.array("images", 10), singleProductImageUploader.singleUploads, addProduct.menBottomwear);
router.post('/men-footwear', upload.array("images", 10), singleProductImageUploader.singleUploads, addProduct.menFootmwear);
router.post('/women-ethnic', upload.array("images", 10), singleProductImageUploader.singleUploads, addProduct.womenEthnic);
router.post('/women-western', upload.array("images", 10), singleProductImageUploader.singleUploads, addProduct.womenWestern);
router.post('/women-footwear', upload.array("images", 10), singleProductImageUploader.singleUploads, addProduct.womenFootwear);
router.post('/boys-brands', upload.array("images", 10), singleProductImageUploader.singleUploads, addProduct.boysBrands);
router.post('/girls-grands', upload.array("images", 10), singleProductImageUploader.singleUploads, addProduct.girlsGrands);
router.post('/mens-wa', upload.array("images", 10), singleProductImageUploader.singleUploads, addProduct.menWA);
router.post('/womens-wa', upload.array("images", 10), singleProductImageUploader.singleUploads, addProduct.womenWA);
router.post('/boys-wa', upload.array("images", 10), singleProductImageUploader.singleUploads, addProduct.boysWA);
router.post('/girls-wa', upload.array("images", 10), singleProductImageUploader.singleUploads, addProduct.girlsWA);
router.post('/bags', upload.array("images", 10), singleProductImageUploader.singleUploads, addProduct.bags);
router.post('/suitcases', upload.array("images", 10), singleProductImageUploader.singleUploads, addProduct.suitcases);
router.post('/luggage', upload.array("images", 10), singleProductImageUploader.singleUploads, addProduct.luggage);


//For Bulk Product
router.post('/men-topwear/bulk/csv', parser.busboyParserForCSV, parser.csvParser, product_Validator.sheetDataValidation, bulkProductsImagesUploader.allBulkUploader, addProduct.menTopwear);
router.post('/men-topwear/bulk/xlsx', parser.busboyParserForXL,bulkProductsImagesUploader.allBulkUploader, addProduct.menTopwear);


router.post('/men-bottomwear/bulk/csv', parser.busboyParserForCSV, parser.csvParser, product_Validator.sheetDataValidation, bulkProductsImagesUploader.allBulkUploader, addProduct.menBottomwear);
router.post('/men-bottomwear/bulk/xlsx', parser.busboyParserForXL,bulkProductsImagesUploader.allBulkUploader, addProduct.menBottomwear);

router.post('/men-footwear/bulk/csv', parser.busboyParserForCSV, parser.csvParser, product_Validator.sheetDataValidation, bulkProductsImagesUploader.allBulkUploader, addProduct.menFootmwear);
router.post('/men-footwear/bulk/xlsx', parser.busboyParserForXL,bulkProductsImagesUploader.allBulkUploader, addProduct.menFootmwear);

router.post('/women-ethnic/bulk/csv', parser.busboyParserForCSV, parser.csvParser, product_Validator.sheetDataValidation, bulkProductsImagesUploader.allBulkUploader, addProduct.womenEthnic);
router.post('/women-ethnic/bulk/xlsx', parser.busboyParserForXL,bulkProductsImagesUploader.allBulkUploader, addProduct.womenEthnic);

router.post('/women-western/bulk/csv', parser.busboyParserForCSV, parser.csvParser, product_Validator.sheetDataValidation, bulkProductsImagesUploader.allBulkUploader, addProduct.womenWestern);
router.post('/women-western/bulk/xlsx', parser.busboyParserForXL,bulkProductsImagesUploader.allBulkUploader, addProduct.womenWestern);

router.post('/women-footwear/bulk/csv', parser.busboyParserForCSV, parser.csvParser, product_Validator.sheetDataValidation, bulkProductsImagesUploader.allBulkUploader, addProduct.womenFootwear);
router.post('/women-footwear/bulk/xlsx', parser.busboyParserForXL,bulkProductsImagesUploader.allBulkUploader, addProduct.womenFootwear);

router.post('/boys-brands/bulk/csv', parser.busboyParserForCSV, parser.csvParser, product_Validator.sheetDataValidation, bulkProductsImagesUploader.allBulkUploader, addProduct.boysBrands);
router.post('/boys-brands/bulk/xlsx', parser.busboyParserForXL,bulkProductsImagesUploader.allBulkUploader, addProduct.boysBrands);

router.post('/girls-grands/bulk/csv', parser.busboyParserForCSV, parser.csvParser, product_Validator.sheetDataValidation, bulkProductsImagesUploader.allBulkUploader, addProduct.girlsGrands);
router.post('/girls-grands/bulk/xlsx', parser.busboyParserForXL,bulkProductsImagesUploader.allBulkUploader, addProduct.girlsGrands);

router.post('/mens-watches-and-accessories/bulk/csv', parser.busboyParserForCSV, parser.csvParser, product_Validator.sheetDataValidation, bulkProductsImagesUploader.allBulkUploader, addProduct.menWA);
router.post('/mens-watches-and-accessories/bulk/xlsx', parser.busboyParserForXL,bulkProductsImagesUploader.allBulkUploader, addProduct.menWA);

router.post('/womens-watches-and-accessories/bulk/csv', parser.busboyParserForCSV, parser.csvParser, product_Validator.sheetDataValidation, bulkProductsImagesUploader.allBulkUploader, addProduct.womenWA);
router.post('/womens-watches-and-accessories/bulk/xlsx', parser.busboyParserForXL,bulkProductsImagesUploader.allBulkUploader, addProduct.womenWA);

router.post('/boys-watches-and-accessories/bulk/csv', parser.busboyParserForCSV, parser.csvParser, product_Validator.sheetDataValidation, bulkProductsImagesUploader.allBulkUploader, addProduct.boysWA);
router.post('/boys-watches-and-accessories/bulk/xlsx', parser.busboyParserForXL,bulkProductsImagesUploader.allBulkUploader, addProduct.boysWA);

router.post('/girls-watches-and-accessories/bulk/csv', parser.busboyParserForCSV, parser.csvParser, product_Validator.sheetDataValidation, bulkProductsImagesUploader.allBulkUploader, addProduct.girlsWA);
router.post('/girls-watches-and-accessories/bulk/xlsx', parser.busboyParserForXL,bulkProductsImagesUploader.allBulkUploader, addProduct.girlsWA);

router.post('/bags/bulk/csv', parser.busboyParserForCSV, parser.csvParser, product_Validator.sheetDataValidation, bulkProductsImagesUploader.allBulkUploader, addProduct.bags);
router.post('/bags/bulk/xlsx', parser.busboyParserForXL,bulkProductsImagesUploader.allBulkUploader, addProduct.bags);

router.post('/suitcases/bulk/csv', parser.busboyParserForCSV, parser.csvParser, product_Validator.sheetDataValidation, bulkProductsImagesUploader.allBulkUploader, addProduct.suitcases);
router.post('/suitcases/bulk/xlsx', parser.busboyParserForXL,bulkProductsImagesUploader.allBulkUploader, addProduct.suitcases);

router.post('/luggages/bulk/csv', parser.busboyParserForCSV, parser.csvParser, product_Validator.sheetDataValidation, bulkProductsImagesUploader.allBulkUploader, addProduct.luggage);
router.post('/luggages/bulk/xlsx', parser.busboyParserForXL,bulkProductsImagesUploader.allBulkUploader, addProduct.luggage);

export default router;
