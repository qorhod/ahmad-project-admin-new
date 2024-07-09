const path = require('path');
const passport = require('passport');
const bcrypt = require('bcryptjs'); // استيراد مكتبة bcrypt
const Admin = require('../models/Admin');
const AuthUser = require('../models/auth-user'); // استيراد نموذج AuthUser

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
        const user = req.user; // استخدام المستخدم الحالي
        res.render(path.join(__dirname, '../views/dashboard'), { user, currentPage: 'dashboard' });
    } else {
        res.redirect('/admin');
    }
};

// حماية الوصول إلى صفحة إضافة مستخدم
exports.addUser = (req, res) => {
    if (req.isAuthenticated()) {
        const user = req.user; // استخدام المستخدم الحالي
        res.render(path.join(__dirname, '../views/addUser'), { user, currentPage: 'add', error: null });
    } else {
        res.redirect('/admin');
    }
};

// معالجة طلب إضافة مستخدم
exports.postAddUser = async (req, res) => {
    try {
        const { username, name, password, role } = req.body;

        // تحقق مما إذا كان اسم المستخدم موجودًا بالفعل
        const existingUser = await AuthUser.findOne({ userName: username });
        if (existingUser) {
            // إذا كان المستخدم موجودًا، أعد التوجيه إلى صفحة إضافة المستخدم مع رسالة خطأ
            return res.render(path.join(__dirname, '../views/addUser'), {
                user: req.user,
                currentPage: 'add',
                error: 'اسم المستخدم موجود مسبقًا'
            });
        }

        // تشفير كلمة المرور
        const hashedPassword = await bcrypt.hash(password, 10);

        // إنشاء المستخدم الجديد مع كلمة المرور المشفرة
        const newUser = new AuthUser({ userName: username, password: hashedPassword, name: name, role: role });

        // حفظ المستخدم في قاعدة البيانات
        await newUser.save();

        res.redirect('/admin/dashboard');
    } catch (error) {
        console.error('Error adding user:', error);
        res.redirect('/admin/addUser');
    }
};

// دالة تهيئة الأدمن الافتراضي
exports.initializeAdmin = async () => {
    try {
        const adminCount = await Admin.countDocuments();
        if (adminCount === 0) {
            // تشفير كلمة المرور الافتراضية للأدمن
            const hashedPassword = await bcrypt.hash('password', 10);
            const defaultAdmin = new Admin({
                email: 'admin@example.com',
                password: hashedPassword // سيتم تشفير كلمة المرور قبل الحفظ
            });
            await defaultAdmin.save();
            console.log('Default admin user created with email: admin@example.com and password: password');
        }
    } catch (error) {
        console.error('Error initializing default admin user:', error);
    }
};
