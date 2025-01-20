const express = require('express');
const router = express.Router();
const { requireAuth } = require('../middleware/authmiddleware');
const whyChoosePaperController = require('../controller/WhyChoosePaper'); // Adapted controller import
const { uploadPhoto } = require('../middleware/fileUpload');

// Define routes for WhyChoosePaper
router.get('/getAllWhyChoosePaper', whyChoosePaperController.getAllWhyChoosePaper);
router.get('/getWhyChoosePaperById', requireAuth, whyChoosePaperController.getWhyChoosePaperById);
router.post('/createWhyChoosePaper', requireAuth, uploadPhoto, whyChoosePaperController.addWhyChoosePaper);
router.delete('/deleteWhyChoosePaper', requireAuth, whyChoosePaperController.deleteWhyChoosePaper);
router.put('/updateWhyChoosePaper', requireAuth, uploadPhoto, whyChoosePaperController.updateWhyChoosePaper);
router.get('/download/:filename', whyChoosePaperController.downloadImage);
router.delete('/:id/image/:imageFilename/:index', requireAuth, whyChoosePaperController.deleteImageAndAltText);

module.exports = router;
