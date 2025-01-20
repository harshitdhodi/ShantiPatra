const express = require('express');
const router = express.Router();
const whyChooseUsCounterController = require('../controller/whychooseuscounter');
const { requireAuth } = require('../middleware/authmiddleware');
const { uploadLogo } = require("../middleware/logoUpload");



router.get('/getWhyChooseUsCounters', whyChooseUsCounterController.getWhyChooseUsCounters);
router.put('/updateWhyChooseUsCounter', requireAuth, uploadLogo, whyChooseUsCounterController.updateWhyChooseUsCounter);
router.delete('/image/:imageFilename/:index', requireAuth,whyChooseUsCounterController.deletePhotoAndAltText)

module.exports = router;
