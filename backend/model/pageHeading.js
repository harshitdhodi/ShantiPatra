const mongoose = require('mongoose');

const PageHeadingSchema = new mongoose.Schema({
  pageType: {
    type: String,
    required: true,
  },
  heading: {
    type: String,
    required: true
  },
  subheading: {
    type: String
  }
});

module.exports = mongoose.model('PageHeadings', PageHeadingSchema);