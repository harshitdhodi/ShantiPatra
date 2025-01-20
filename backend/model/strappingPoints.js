const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StappingPointSchema = new Schema({
    paperCore: { type: String },
    color: { type: String },
    packing: { type: String },
    length: { type: String },
    qty: { type: String },
    productId: { type: String, ref: 'Product' }
}, {
    timestamps: true
});

const StappingPoint = mongoose.model('StappingPoints', StappingPointSchema);

module.exports = StappingPoint;
