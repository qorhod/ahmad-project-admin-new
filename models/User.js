// models/User.js
// admin user
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  // يمكنك إضافة حقول إضافية إذا لزم الأمر
});

module.exports = mongoose.model('User', userSchema);
