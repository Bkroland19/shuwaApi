const mongoose = require('mongoose');

const ladySchema = new mongoose.Schema({
  location: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  color: { type: String, required: true },
  age: { type: Number, required: true },
});

const Lady = mongoose.model('Lady', ladySchema);

module.exports = Lady