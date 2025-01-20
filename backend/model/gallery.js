const mongoose = require('mongoose');

const GallarySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  photo: [{
    type: String,

  }],
  alt: [{
    type: String,
    default: ''
  }],
  imgTitle: [{
    type: String,
    default: ''
  }],

});

const Gallery = mongoose.model('Gallery', GallarySchema);

module.exports = Gallery;
