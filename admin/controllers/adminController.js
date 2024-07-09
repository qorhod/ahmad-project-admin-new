const path = require('path');
const passport = require('passport');
const bcrypt = require('bcryptjs'); // استيراد مكتبة bcrypt
const Admin = require('../models/Admin');
const AuthUser = require('../models/auth-user'); // استيراد نموذج AuthUser
const Permissions = require('../models/permissions'); // استيراد نموذج الصلاحيات

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
            // const hashedPassword = await bcrypt.hash('1', 10);

            const defaultAdmin = new Admin({
                email: 'admin@example.com',
                // email: '1',
                password: hashedPassword // سيتم تشفير كلمة المرور قبل الحفظ
            });
            await defaultAdmin.save();
            console.log('Default admin user created with email: admin@example.com and password: password');
        }
    } catch (error) {
        console.error('Error initializing default admin user:', error);
    }
};

// دالة تهيئة الصلاحيات الافتراضية
exports.initializeDefaultPermissions = async () => {
    const defaultPermissions = {
        salesManager: ['view_sales', 'manage_team', 'access_reports'],
        salesMan: ['view_sales', 'manage_clients'],
        IndustrialManager: ['view_production', 'manage_workers'],
        factoryWorker: ['view_tasks']
    };

    try {
        for (let role in defaultPermissions) {
            const existingPermissions = await Permissions.findOne({ role });
            if (!existingPermissions) {
                const newPermissions = new Permissions({ role, permissions: defaultPermissions[role] });
                await newPermissions.save();
                console.log(`Default permissions for role ${role} created.`);
            }
        }
    } catch (error) {
        console.error('Error initializing default permissions:', error);
    }
};

// عرض صفحة إدارة الصلاحيات
exports.getPermissions = async (req, res) => {
    if (req.isAuthenticated()) {
        const permissions = await Permissions.find({});
        const userPermissions = {};
        permissions.forEach(permission => {
            userPermissions[permission.role] = permission.permissions;
        });
        res.render(path.join(__dirname, '../views/managePermissions'), { user: req.user, currentPage: 'permissions', userPermissions });
    } else {
        res.redirect('/admin');
    }
};

// معالجة طلب تعديل الصلاحيات
exports.postPermissions = async (req, res) => {
    try {
        for (let role in req.body) {
            if (role.endsWith("Permissions")) {
                const roleName = role.replace("Permissions", "");
                const permissions = req.body[role] || [];
                await Permissions.findOneAndUpdate({ role: roleName }, { permissions }, { upsert: true });
            }
        }
        res.redirect('/admin/managePermissions');
    } catch (error) {
        console.error('Error updating permissions:', error);
        res.redirect('/admin/managePermissions');
    }
};

// معالجة طلب إضافة صلاحية جديدة
exports.addPermission = async (req, res) => {
    try {
        const { role, newPermission } = req.body;
        const rolePermissions = await Permissions.findOne({ role });
        if (rolePermissions) {
            rolePermissions.permissions.push(newPermission);
            await rolePermissions.save();
        } else {
            const newPermissions = new Permissions({ role, permissions: [newPermission] });
            await newPermissions.save();
        }
        res.redirect('/admin/managePermissions');
    } catch (error) {
        console.error('Error adding permission:', error);
        res.redirect('/admin/managePermissions');
    }
};

// معالجة طلب حذف صلاحية
exports.deletePermission = async (req, res) => {
    try {
        const { role, permissionToDelete } = req.body;
        const rolePermissions = await Permissions.findOne({ role });
        if (rolePermissions) {
            rolePermissions.permissions = rolePermissions.permissions.filter(p => p !== permissionToDelete);
            await rolePermissions.save();
        }
        res.redirect('/admin/managePermissions');
    } catch (error) {
        console.error('Error deleting permission:', error);
        res.redirect('/admin/managePermissions');
    }
};
