const express = require('express');
const router = express.Router();
const { getDataBySlug,getAllProductTitles,getLatestProducts ,getSlugs, countProducts,getProductsByCategory, insertProduct, updateProduct, deleteProduct, getAllProducts, getSingleProduct, getCategoryProducts, deletePhotoAndAltText, exportProductsToExcel, importProducts, fetchUrlPriorityFreq, editUrlPriorityFreq, fetchUrlPriorityFreqById, fetchUrlmeta, editUrlmeta, fetchUrlmetaById, downloadCatalogue, viewCatalogue } = require('../controller/product')
const { uploadPhoto } = require('../middleware/fileUpload')
const { insertCategory, updateCategory,getCategoryAndPhoto, deletecategory, getAll, getSpecificCategory, fetchCategoryUrlPriorityFreq, editCategoryUrlPriorityFreq, fetchCategoryUrlPriorityFreqById, fetchCategoryUrlmeta, editCategoryUrlmeta, fetchCategoryUrlmetaById } = require('../controller/productcategory')
const { requireAuth } = require('../middleware/authmiddleware');
const { uploadfiles } = require('../middleware/files');
const { uploadLogo } = require("../middleware/logoUpload")

router.post('/insertProduct', requireAuth, uploadPhoto, insertProduct)
router.get('/getAllProducts', requireAuth, getAllProducts)
router.get('/getAllProductTitles', requireAuth, getAllProductTitles)
router.get('/getDataBySlug', getDataBySlug)
router.get('/getLatestProducts', getLatestProducts)
router.put('/updateProduct', requireAuth, uploadPhoto, updateProduct)
router.delete('/deleteProduct', requireAuth, deleteProduct)
router.get('/getSingleProduct', requireAuth, getSingleProduct)
router.get('/getCategoryProducts', requireAuth, getCategoryProducts)
// router.get('/getSubcategoryProducts', requireAuth, getSubcategoryProducts)
// router.get('/getSubSubcategoryProducts', requireAuth, getSubSubcategoryProducts)
router.get('/countProduct', requireAuth, countProducts)
router.delete('/:slugs/image/:imageFilename/:index', requireAuth, deletePhotoAndAltText)
router.get('/exportProduct', requireAuth, exportProductsToExcel)
router.post('/importProduct', requireAuth, uploadfiles, importProducts)
router.get('/fetchUrlPriorityFreq', fetchUrlPriorityFreq)
router.get('/slugs', getSlugs);
router.put('/editUrlPriorityFreq', requireAuth, editUrlPriorityFreq)
router.get('/fetchUrlPriorityFreqById', fetchUrlPriorityFreqById)
router.get('/fetchUrlmeta', fetchUrlmeta)
router.put('/editUrlmeta', requireAuth, editUrlmeta)
router.get('/fetchUrlmetaById', requireAuth, fetchUrlmetaById)
router.get('/download/:filename', downloadCatalogue);
router.get('/view/:filename',requireAuth, viewCatalogue);
router.get('/getProductByCategory',getProductsByCategory);

router.post('/insertCategory', requireAuth, uploadLogo, insertCategory)
router.put('/updateCategory', requireAuth, uploadLogo, updateCategory)
router.delete('/deletecategory', requireAuth, deletecategory)
router.get('/getAll',  getAll)
router.get('/getSpecificCategory', getSpecificCategory)
router.get('/fetchCategoryUrlPriorityFreq', fetchCategoryUrlPriorityFreq)
router.put('/editCategoryUrlPriorityFreq', requireAuth, editCategoryUrlPriorityFreq)
router.get('/fetchCategoryUrlPriorityFreqById', fetchCategoryUrlPriorityFreqById)
router.get('/fetchCategoryUrlmeta', fetchCategoryUrlmeta)
router.put('/editCategoryUrlmeta', requireAuth, editCategoryUrlmeta)
router.get('/fetchCategoryUrlmetaById', fetchCategoryUrlmetaById)
router.get('/getCategoryAndPhoto', getCategoryAndPhoto)



module.exports = router;