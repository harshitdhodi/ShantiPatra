
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WhyChooseUsCounterSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  no: {
    type: Number,
    required: true
  },
  sign:{type:String},
  photo: {
    type: String,
  },
  alt:{type:String,default:''},
  imgTitle:{type:String,default:''},
  status: {
    type: String,
    enum: ['active', 'inactive'], // or any other status values you need
    default: 'active',
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('WhyChooseUsCounter', WhyChooseUsCounterSchema);
