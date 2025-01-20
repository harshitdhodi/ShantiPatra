const express = require('express');
const router = express.Router();
const { 
  insertCustomizationStep, 
  getCustomizationSteps, 
  updateCustomizationStep, 
  deleteCustomizationStep, 
  getCustomizationStepById, 
  getActiveCustomizationSteps
} = require('../controller/customizationsteps');
const { requireAuth } = require('../middleware/authmiddleware');

router.post('/insertCustomizationStep', requireAuth, insertCustomizationStep);
router.get('/getCustomizationSteps',requireAuth, getCustomizationSteps);
router.get('/getActiveCustomizationSteps', getActiveCustomizationSteps);
router.put('/updateCustomizationStep', requireAuth, updateCustomizationStep);
router.delete('/deleteCustomizationStep', requireAuth, deleteCustomizationStep);
router.get('/getCustomizationStepById', requireAuth, getCustomizationStepById);


module.exports = router;
