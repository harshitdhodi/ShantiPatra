const express = require('express');
const router = express.Router();
const aboutusController = require('../controller/aboutus');
const { uploadPhoto } = require('../middleware/fileUpload');
const { requireAuth } = require('../middleware/authmiddleware');



router.get('/getAboutus',requireAuth,aboutusController.getAboutus);
router.get('/getActiveAboutus',aboutusController.getActiveAboutus);
router.put('/updateAboutus',requireAuth,uploadPhoto, aboutusController.updateAboutus);
router.delete('/image/:imageFilename/:index', requireAuth,aboutusController.deletePhotoAndAltText);

module.exports = router;