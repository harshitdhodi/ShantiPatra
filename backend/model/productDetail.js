const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productDetailSchema = new Schema({
    productCode: { type: String },
    variants: { type: String },
    size: { type: Number },
    moq: { type: Number },
    pcs: { type: String },
    productId: { type: String, ref: 'Product' }
}, {
    timestamps: true
});

const ProductDetail = mongoose.model('ProductDetail', productDetailSchema);

module.exports = ProductDetail;
