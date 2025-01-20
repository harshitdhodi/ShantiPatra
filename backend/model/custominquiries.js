const mongoose = require('mongoose');

const customInquirySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    company: {
        type: String,
        required: false, // This can be optional based on your use case
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    product1: {
        type: String,
        required: false, // Assuming this might be optional
    },
    quantity1: {
        type: Number,
        required: false, // Assuming this might be optional
    },
    product2: {
        type: String,
        required: false, // Assuming this might be optional
    },
    quantity2: {
        type: Number,
        required: false, // Assuming this might be optional
    },
    message: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    utm_source: {
        type: String,
        required: false,
    },
    utm_medium: {
        type: String,
        required: false,
    },
    utm_campaign: {
        type: String,
        required: false,
    },
    utm_id: {
        type: String,
        required: false,
    },
    gclid: {
        type: String,
        required: false,
    },
    gcid_source: {
        type: String,
        required: false,
    },
    utm_content: {
        type: String,
        required: false,
    },
    utm_term: {
        type: String,
        required: false,
    },
    ipaddress: {
        type: String,
        required: false, // This can be optional depending on your needs
    }
});

const CustomInquiry = mongoose.model('CustomInquiry', customInquirySchema);

module.exports = CustomInquiry;
