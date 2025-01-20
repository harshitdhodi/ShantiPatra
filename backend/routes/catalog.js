const express = require('express');
const router = express.Router();
const catalogController = require('../controller/catalogue');
const upload = require('../middleware/catalogue');

// Create a new catalog entry
router.post('/add', upload.single('catalog'), catalogController.createCatalog);

// Get all catalog entries
router.get('/get', catalogController.getCatalogs);

// Get a single catalog entry by ID
router.get('/get/:id', catalogController.getCatalogById);

// Update catalog entry
router.put('/edit/:id', upload.single('catalog'), catalogController.updateCatalog);

// Delete catalog entry
router.delete('/delete/:id', catalogController.deleteCatalog);

module.exports = router;
