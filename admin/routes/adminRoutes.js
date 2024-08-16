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

// معالجة إضافة مستخدم جديد
router.post('/addUser', adminController.postAddUser);



// عرض صفحة إدارة الصلاحيات
router.get('/managePermissions', adminController.getPermissions);

// معالجة طلب تعديل الصلاحيات
router.post('/managePermissions', adminController.postPermissions);

// إضافة صلاحية جديدة
router.post('/addPermission', adminController.addPermission);

// حذف صلاحية
router.post('/deletePermission', adminController.deletePermission);

router.post('/deletePermission', adminController.deletePermission);
router.post('/updatePermissionDefault', adminController.updatePermissionDefault);



router.get('/manageUsers', adminController.getManageUsers);
router.get('/editUser/:id', adminController.getEditUserWithPermissions);
router.post('/deleteUser', adminController.deleteUser);


router.get('/editUser/:id', adminController.getEditUser);
router.post('/editUser/:id', adminController.postEditUser);


// اعدادات الادمن 
router.get('/manageAdmin', adminController.getManageAdmin);
router.post('/manageAdmin', adminController.postManageAdmin);


// عرض وتعديل اسعار الالمنيوم
router.get('/editPrices', adminController.getPrices); // مسار لعرض الأسعار
router.post('/editPrices', adminController.updatePrices); // مسار لتحديث الأسعار

// اظهار وتعديل بيانات بدابة العد في الأوردرات المؤكدة
router.get('/counter', adminController.getCounterPage);

// مسار لتحديث lastNumber
router.post('/update-counter', adminController.updateCounterPage);




// مسار تسجيل الخروج
router.post('/logout', adminController.logout);
module.exports = router;
