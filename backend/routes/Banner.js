const express = require('express');
const router = express.Router();
const { uploadPhoto } = require('../middleware/fileUpload');
const {getBannersBySectionCustomPackaging ,getBannersBySectionCalculator , getBannersBySectionGlobal,getBannersBySectionClients,getBannersBySectionBlog,getBannersBySectionContactus,getBannersBySectionProducts, getBannersBySectionAboutus,insertBanner, getBanner, updateBanner, deleteBanner,getBannersBySectionHome, getBannerById,deletePhotoAndAltText,getCountBySection,countBanner} = require('../controller/Banner');
const { requireAuth } = require('../middleware/authmiddleware');


router.post("/insertBanner",requireAuth,uploadPhoto,insertBanner);
router.get('/getBanner',requireAuth, getBanner);
router.get('/getBannersBySectionHome', getBannersBySectionHome);
router.get('/getBannersBySectionCalculator', getBannersBySectionCalculator);
router.get('/getBannersBySectionCustomPackaging', getBannersBySectionCustomPackaging);
router.get('/getBannersBySectionContactus', getBannersBySectionContactus);
router.get('/getBannersBySectionProducts', getBannersBySectionProducts);
router.get('/getBannersBySectionAboutus', getBannersBySectionAboutus);
router.get('/getBannersBySectionBlog', getBannersBySectionBlog);
router.get('/getBannersBySectionGlobal', getBannersBySectionGlobal);
router.get('/getBannersBySectionClients', getBannersBySectionClients);
router.get('/countBanner',requireAuth, countBanner);
router.get('/getCountBySection',requireAuth, getCountBySection);
router.put('/updateBanner',requireAuth,uploadPhoto, updateBanner);
router.delete('/deleteBanner',requireAuth, deleteBanner);
router.get('/getBannerById',requireAuth,getBannerById);
router.delete('/:id/image/:imageFilename/:index',requireAuth,deletePhotoAndAltText);

module.exports = router;