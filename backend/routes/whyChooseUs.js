const express = require('express');
const router = express.Router();
const { requireAuth } = require('../middleware/authmiddleware');
const whyChooseUsController = require('../controller/whychooseus');
const { uploadPhoto } = require('../middleware/fileUpload');

router.get('/getAllWhyChooseUs', whyChooseUsController.getAllWhyChooseUs);
router.get('/getWhyChooseUsById', requireAuth, whyChooseUsController.getWhyChooseUsById);
router.post('/createWhyChooseUs', requireAuth, uploadPhoto, whyChooseUsController.addWhyChooseUs);
router.delete('/deleteWhyChooseUs', requireAuth, whyChooseUsController.deleteWhyChooseUs);
router.put('/updateWhyChooseUs', requireAuth, uploadPhoto, whyChooseUsController.updateWhyChooseUs);
router.get('/download/:filename',  whyChooseUsController.downloadImage);
router.delete('/:id/image/:imageFilename/:index', requireAuth, whyChooseUsController.deleteImageAndAltText);

module.exports = router;
