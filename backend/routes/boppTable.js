const express = require('express');
const router = express.Router();
const boppTableController = require('../controller/boppTable');

// Create a new product detail
router.post('/createboppTable', boppTableController.createBOPPTable);

// Get all product details
router.get('/getboppTable', boppTableController.getBOPPTable);

// Get a single product detail by ID
router.get('/getboppTableById', boppTableController.getBOPPTableById);

// Get a single product detail by Slug
router.get('/getboppTableBySlug', boppTableController.getBOPPTableBySlug);

// Update a product detail by ID
router.put('/updateboppTable', boppTableController.updateBOPPTable);

// Delete a product detail by ID
router.delete('/deleteboppTable', boppTableController.deleteBOPPTable);

module.exports = router;
