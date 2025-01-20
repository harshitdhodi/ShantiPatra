const mongoose = require('mongoose');

const achievementSchema = new mongoose.Schema({
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

const Achievement = mongoose.model('Achievement', achievementSchema);

module.exports = Achievement;
