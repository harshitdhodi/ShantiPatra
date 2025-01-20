const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BOPPTableSchema = new Schema({
    width: { type: String },
    cartonNo: { type: String },
    productId: { type: String, ref: 'Product' }
}, {
    timestamps: true
});

const BOPPTable = mongoose.model('BOPPTable', BOPPTableSchema);

module.exports = BOPPTable;
