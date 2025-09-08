const mongoose = require('mongoose');

const HistoryRecordSchema = new mongoose.Schema({
  userId: { type: String, required: false },
  billId: { type: String },
  itemName: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number },
  unit: { type: String },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('HistoryRecord', HistoryRecordSchema);