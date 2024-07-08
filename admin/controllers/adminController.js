const path = require('path');
const passport = require('passport');
const Admin = require('../models/Admin'); // تأكد من استيراد Admin

// عرض صفحة تسجيل الدخول
exports.getLogin = (req, res) => {
    res.render(path.join(__dirname, '../views/index'));
};

// معالجة تسجيل الدخول باستخدام passport
exports.postLogin = (req, res, next) => {
    passport.authenticate('admin-local', {
        successRedirect: '/admin/dashboard',
        failureRedirect: '/admin',
        failureFlash: true
    })(req, res, next);
};

// حماية الوصول إلى لوحة التحكم
exports.getDashboard = (req, res) => {
    if (req.isAuthenticated()) {
        const user = { profileImage: '/admin/public/images/user.png', userName: 'Admin' }; // مثال على تعريف المستخدم
        res.render(path.join(__dirname, '../views/dashboard'), { user });
    } else {
        res.redirect('/admin');
    }
};

// حماية الوصول إلى صفحة إضافة مستخدم
exports.addUser = (req, res) => {
    if (req.isAuthenticated()) {
        const user = { profileImage: '/admin/public/images/user.png', userName: 'Admin' }; // مثال على تعريف المستخدم
        res.render(path.join(__dirname, '../views/addUser'), { user });
    } else {
        res.redirect('/admin');
    }
};

// دالة تهيئة الأدمن الافتراضي
exports.initializeAdmin = async () => {
    try {
        const adminCount = await Admin.countDocuments();
        if (adminCount === 0) {
            const defaultAdmin = new Admin({
                email: 'admin@example.com',
                password: 'password' // سيتم تشفير كلمة المرور قبل الحفظ
            });
            await defaultAdmin.save();
            console.log('Default admin user created with email: admin@example.com and password: password');
        }
    } catch (error) {
        console.error('Error initializing default admin user:', error);
    }
};
