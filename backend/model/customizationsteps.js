// customizationSteps.model.js
const mongoose = require('mongoose');

const CustomizationStepsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const CustomizationSteps = mongoose.model('CustomizationSteps', CustomizationStepsSchema);

module.exports = CustomizationSteps;
