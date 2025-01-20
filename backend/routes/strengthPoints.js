const express = require('express');
const router = express.Router();
const strengthPointController = require('../controller/StrengthPoints');

// Create a new product detail
router.post('/createstrengthPoint', strengthPointController.createstrengthPoint);

// Get all product details
router.get('/getstrengthPoint', strengthPointController.getstrengthPoint);

// Get a single product detail by ID
router.get('/getstrengthPointById', strengthPointController.getstrengthPointById);

// Get a single product detail by Slug
router.get('/getstrengthPointBySlug', strengthPointController.getstrengthPointBySlug);

// Update a product detail by ID
router.put('/updatestrengthPoint', strengthPointController.updatestrengthPoint);

// Delete a product detail by ID
router.delete('/deletestrengthPoint', strengthPointController.deletestrengthPoint);

module.exports = router;
