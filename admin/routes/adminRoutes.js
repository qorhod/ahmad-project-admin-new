const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const passport = require('passport');

// صفحة تسجيل الدخول للأدمن
router.get('/', adminController.getLogin);

// معالجة تسجيل الدخول للأدمن
router.post('/', adminController.postLogin);

// لوحة تحكم الأدمن
router.get('/dashboard', adminController.getDashboard);

// صفحة إضافة مستخدم
router.get('/addUser', adminController.addUser);

module.exports = router;
