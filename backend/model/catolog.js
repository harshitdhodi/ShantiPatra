const mongoose = require('mongoose');

const catalogSchema = new mongoose.Schema({
  catalog: {
    type: String,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Catalog', catalogSchema);
