const mongoose = require('mongoose');

const counterSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  lastNumber: { type: Number, default: 0 }
});

// التحقق من وجود النموذج مسبقًا قبل تعريفه
const Counter = mongoose.models.Counter || mongoose.model('Counter', counterSchema);

module.exports = Counter;
