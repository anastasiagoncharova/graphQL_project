const mongoose = require('mongoose');
const { Schema } = mongoose;

const petSchema = new Schema({
  name: { type: String, required: true },
  description: String,
  gender: { type: String, required: true },
  type: { type: String, required: true },
  age: { type: Number, required: true },
  vaccinated: Boolean,
  sterilized: Boolean,
  image: String,
});

module.exports = mongoose.model('Pet', petSchema);
