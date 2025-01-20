const express = require('express');
const router = express.Router();
const strappingPointController = require('../controller/strappingPoint');

// Create a new product detail
router.post('/createstrappingPoint', strappingPointController.createStrappingPoint);

// Get all product details
router.get('/getstrappingPoint', strappingPointController.getStrappingPoint);

// Get a single product detail by ID
router.get('/getstrappingPointById', strappingPointController.getStrappingPointById);

// Get a single product detail by Slug
router.get('/getStrappingPointBySlug', strappingPointController.getStrappingPointBySlug);

// Update a product detail by ID
router.put('/updatestrappingPoint', strappingPointController.updateStrappingPoint);

// Delete a product detail by ID
router.delete('/deletestrappingPoint', strappingPointController.deleteStrappingPoint);

module.exports = router;
