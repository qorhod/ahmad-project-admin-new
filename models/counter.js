


// // هذا لتتبع الارقام إلى اي رقم وصل الترقيم في ترقيم القياسات للطلب
// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const counterSchema = new Schema({
//     _id: String, // اسم المجموعة التي نرغب في تتبع الأرقام التسلسلية لها
//     sequenceValue: {
//         type: Number,
//         default: 0
//     }
// });

// const Counter = mongoose.model('Counter', counterSchema);

// module.exports = Counter;






// طريقة الترقيم الجديدة للأوردرات عند التأكيد يتم احفض اخر رقم تم إضافته في الداتا منفصل عن الطلابات 

const mongoose = require('mongoose');

const counterSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  lastNumber: { type: Number, default: 0 }
});


 // التحقق من وجود النموذج مسبقًا قبل تعريفه

const Counter = mongoose.models.Counter || mongoose.model('Counter', counterSchema);

module.exports = Counter;