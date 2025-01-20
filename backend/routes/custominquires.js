const express = require('express');
const router = express.Router();
const { createInquiry, getCountsAndData, deleteInquiry } = require('../controller/custominquiry');

router.post('/createcustominquiries', createInquiry);
router.get('/getcustomtinquiries', getCountsAndData);
router.delete('/deleteinquiries', deleteInquiry);

module.exports = router;
