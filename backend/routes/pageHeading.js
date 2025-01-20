const express = require('express');
const router = express.Router();
const { requireAuth } = require('../middleware/authmiddleware');


const {getpageHeading,updatePageHeading} = require('../controller/pageHeading') 

router.get('/heading',getpageHeading,);
router.put('/updateHeading',updatePageHeading);

module.exports = router;