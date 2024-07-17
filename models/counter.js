


// هذا لتتبع الارقام إلى اي رقم وصل الترقيم في ترقيم القياسات للطلب
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const counterSchema = new Schema({
    _id: String, // اسم المجموعة التي نرغب في تتبع الأرقام التسلسلية لها
    sequenceValue: {
        type: Number,
        default: 0
    }
});

const Counter = mongoose.model('Counter', counterSchema);

module.exports = Counter;
