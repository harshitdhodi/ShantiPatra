const express = require('express');
const router = express.Router();

const {
  getAllLogos,
  addLogo,
  deleteLogo,
  downloadLogo,
  getHeaderColorLogos,
  getFooterWhiteLogos,
  getHeaderWhiteLogos
} = require('../controller/logo');
const {uploadLogo} =  require('../middleware/logoUpload')


router.get('/', getAllLogos);
router.post('/', uploadLogo, addLogo);
router.delete('/:imageName', deleteLogo);
router.get('/download/:filename', downloadLogo);
router.get('/headercolor', getHeaderColorLogos);
router.get('/footerwhite', getFooterWhiteLogos);
router.get('/headerwhite', getHeaderWhiteLogos);
module.exports = router;