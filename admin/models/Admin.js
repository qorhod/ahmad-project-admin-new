// اسكيما تسجيل الدخول Admin



const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// تعريف مخطط الأدمن
const AdminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

// دالة للتحقق من كلمة المرور
AdminSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

// قبل حفظ الأدمن، قم بتشفير كلمة المرور
AdminSchema.pre('save', function(next) {
  if (this.isModified('password') || this.isNew) {
    this.password = bcrypt.hashSync(this.password, 10);
  }
  next();
});

const Admin = mongoose.model('Admin', AdminSchema);

module.exports = Admin;
