const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const whyChooseUsSchema = new Schema({
  photo: [{
    type: String, 
  }],
  title: {
    type: String,
    required: true
  },
  alt: [{
    type: String,
    required: true
  }],
  imgTitle: [{
    type: String,
    required: true     
  }],
  description: {
    type: String,
    required: true
  }
});

const WhyChooseUS = mongoose.model('WhyChooseUs', whyChooseUsSchema);

module.exports = WhyChooseUS;
