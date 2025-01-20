const express = require('express');
const router = express.Router();
const footerController = require('../controller/header');
const { requireAuth } = require('../middleware/authmiddleware');
// const {uploadLogo} =  require('../middleware/logoUpload')

router.get('/getHeader',footerController.getHeader);
router.put('/updateHeader',footerController.updateHeader);
// router.get('/download/:filename', requireAuth,footerController.downloadFile);

module.exports = router;
