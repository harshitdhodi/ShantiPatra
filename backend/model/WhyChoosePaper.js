const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const whyChoosePaperSchema = new Schema({
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

const WhyChoosePaper = mongoose.model('WhyChoosePaper', whyChoosePaperSchema);

module.exports = WhyChoosePaper;
