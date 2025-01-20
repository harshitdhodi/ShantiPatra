const mongoose = require('mongoose');

const footerSchema = new mongoose.Schema({
   
    address: {
        type: String,
        required: true
    },
    phoneNo: {
        type: String,
        required: true
    },
    location:{
        type:String,
        required:true
    },
    email: {
        type: String,
        required: true
    },
 
});

module.exports = mongoose.model('Footer', footerSchema);
