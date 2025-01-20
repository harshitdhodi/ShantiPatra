const express = require('express');
const router = express.Router();
const productDetailController = require('../controller/productdetail');

// Create a new product detail
router.post('/createProductDetail', productDetailController.createProductDetail);

// Get all product details
router.get('/getProductDetail', productDetailController.getProductDetail);

// Get a single product detail by ID
router.get('/getProductDetailById', productDetailController.getProductDetailById);

// Update a product detail by ID
router.put('/updateProductDetail', productDetailController.updateProductDetail);

// Delete a product detail by ID
router.delete('/deleteProductDetail', productDetailController.deleteProductDetail);

module.exports = router;
