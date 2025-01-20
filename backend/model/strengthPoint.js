const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StrengthPointSchema = new Schema({
    points: { type: String },
    productId: { type: String, ref: 'Product' }
}, {
    timestamps: true
});

const StrengthPoint = mongoose.model('StrengthPoint', StrengthPointSchema);

module.exports = StrengthPoint;
