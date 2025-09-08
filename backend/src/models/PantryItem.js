const mongoose = require('mongoose');

const PantryItemSchema = new mongoose.Schema({
  userId: { type: String, required: false },
  name: { type: String, required: true },
  unit: { type: String },
  quantity: { type: Number, default: 0 },
  lastUpdated: { type: Date, default: Date.now },
  priceAvgPerUnit: { type: Number }
});

module.exports = mongoose.model('PantryItem', PantryItemSchema);