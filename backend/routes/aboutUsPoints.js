const express = require('express');
const router = express.Router();
const aboutUsPointsController = require('../controller/aboutUsPoints');
// const { requireAuth } = require('../middleware/authmiddleware');
// Create a new point
router.post('/add', aboutUsPointsController.createAboutUsPoint);

// Get all points
router.get('/get', aboutUsPointsController.getAllAboutUsPoints);

// Get a specific point by ID
router.get('get/:id', aboutUsPointsController.getAboutUsPointById);

// Update a point by ID
router.put('edit/:id', aboutUsPointsController.updateAboutUsPoint);

// Delete a point by ID
router.delete('delete/:id', aboutUsPointsController.deleteAboutUsPoint);

module.exports = router;
