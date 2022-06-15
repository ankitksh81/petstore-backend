const mongoose = require("mongoose");
const { Schema } = mongoose;

const _pet = new Schema({
  name: { type: String, trim: true, required: true },
  type: { type: String, trim: true },
  breed: { type: String, trim: true },
  age: { type: Number, min: 0 },
  createdAt: { type: Number, required: true, default: Date.now },
});

module.exports = mongoose.model("Pet", _pet);
