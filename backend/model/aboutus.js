const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AboutusSchema = new Schema({
  heading: {
    type: String,
    required: true
  },
  alt: [{
    type: String,
    default: ''
  }],
  imgTitle:[{
    type: String,
    default: ''
  }],
  shortDescription: {
    type: String,
    required: true
  },
  longDescription: {
    type: String,
    required: true
  },
  photo: {
    type: [{ type: String }],
  },
  countername: {
    type: String,
    required: true
  },
  counterno: {
    type: Number,
    required: true
  },
  sign: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

const PageContent = mongoose.model('Aboutus', AboutusSchema);

module.exports = PageContent;
