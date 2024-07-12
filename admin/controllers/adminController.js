const path = require('path');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');
const AuthUser = require('../models/auth-user');
const Permissions = require('../models/permissions');

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
        const user = req.user;
        res.render(path.join(__dirname, '../views/dashboard'), { user, currentPage: 'dashboard' });
    } else {
        res.redirect('/admin');
    }
};

// حماية الوصول إلى صفحة إضافة مستخدم
exports.addUser = (req, res) => {
    if (req.isAuthenticated()) {
        const user = req.user;
        res.render(path.join(__dirname, '../views/addUser'), { user, currentPage: 'add', error: null });
    } else {
        res.redirect('/admin');
    }
};

// معالجة طلب إضافة مستخدم
exports.postAddUser = async (req, res) => {
    try {
        const { username, name, password, role } = req.body;

        const existingUser = await AuthUser.findOne({ userName: username });
        if (existingUser) {
            return res.render(path.join(__dirname, '../views/addUser'), {
                user: req.user,
                currentPage: 'add',
                error: 'اسم المستخدم موجود مسبقًا'
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // جلب الصلاحيات الافتراضية من قاعدة البيانات
        const rolePermissions = await Permissions.findOne({ role });
        const defaultPermissions = rolePermissions.permissions.filter(permission => permission.default);

        // تحويل الصلاحيات إلى تنسيق مناسب للإضافة إلى المستخدم الجديد
        const userPermissions = defaultPermissions.map(permission => ({
            name: permission.name,
            description: permission.description
        }));

        // إنشاء المستخدم الجديد مع الصلاحيات الافتراضية
        const newUser = new AuthUser({ 
            userName: username, 
            password: hashedPassword, 
            name: name, 
            role: role, 
            permissions: userPermissions 
        });

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
            const hashedPassword = await bcrypt.hash('password', 10);
            const defaultAdmin = new Admin({
                email: 'admin@example.com',
                password: hashedPassword
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
        salesManager: [{ name: 'view_sales', description: 'عرض المبيعات', default: true }, { name: 'manage_team', description: 'إدارة الفريق', default: false }, { name: 'access_reports', description: 'الوصول إلى التقارير', default: true }],
        salesMan: [{ name: 'view_sales', description: 'عرض المبيعات', default: true }, { name: 'manage_clients', description: 'إدارة العملاء', default: false }],
        IndustrialManager: [{ name: 'view_production', description: 'عرض الإنتاج', default: true }, { name: 'manage_workers', description: 'إدارة العمال', default: false }],
        factoryWorker: [{ name: 'view_tasks', description: 'عرض المهام', default: true }]
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
        res.render(path.join(__dirname, '../views/managePermissions'), {
            user: req.user,
            currentPage: 'permissions',
            defaultPermissions: userPermissions,
            userPermissions,
            messages: req.flash() // تمرير رسائل الفلاش إلى القالب
        });
    } else {
        res.redirect('/admin');
    }
};

// معالجة طلب تعديل الصلاحيات
exports.postPermissions = async (req, res) => {
    try {
        for (let role in req.body) {
            if (role.includes('Permissions') && Array.isArray(req.body[role])) {
                const permissions = req.body[`${role}`].map(permission => ({
                    name: permission,
                    default: req.body[`${role}`].includes(permission)
                }));
                const roleName = role.replace('Permissions', '');
                await Permissions.findOneAndUpdate({ role: roleName }, { permissions }, { upsert: true });
            }
        }
        res.redirect('/admin/managePermissions');
    } catch (error) {
        console.error('Error updating permissions:', error);
        res.redirect('/admin/managePermissions');
    }
};



// معالجة طلب إضافة صلاحية
exports.addPermission = async (req, res) => {
    const { newRole, newPermission, newDescription } = req.body;
    if (!newRole || !newPermission || !newDescription) {
        req.flash('error', 'يجب ملء جميع الحقول');
        return res.redirect('/admin/managePermissions');
    }
    try {
        const rolePermissions = await Permissions.findOne({ role: newRole });
        if (!rolePermissions) {
            req.flash('error', 'نوع الحساب غير موجود');
            return res.redirect('/admin/managePermissions');
        }
        const permissionExists = rolePermissions.permissions.some(permission => permission.name === newPermission);
        if (permissionExists) {
            req.flash('error', 'الصلاحية موجودة مسبقًا');
            return res.redirect('/admin/managePermissions');
        }
        rolePermissions.permissions.push({ name: newPermission, description: newDescription, default: false });
        await rolePermissions.save();
        req.flash('success', 'تم إضافة الصلاحية بنجاح');
        res.redirect('/admin/managePermissions');
    } catch (error) {
        console.error('Error adding permission:', error);
        req.flash('error', 'حدث خطأ أثناء إضافة الصلاحية');
        res.redirect('/admin/managePermissions');
    }
};



// معالجة طلب حذف صلاحية
exports.deletePermission = async (req, res) => {
    const { role, deletePermission } = req.body;
    if (!role || !deletePermission) {
        req.flash('error', 'يجب ملء جميع الحقول');
        return res.redirect('/admin/managePermissions');
    }
    try {
        const rolePermissions = await Permissions.findOne({ role });
        if (!rolePermissions) {
            req.flash('error', 'نوع الحساب غير موجود');
            return res.redirect('/admin/managePermissions');
        }
        const permissionExists = rolePermissions.permissions.some(permission => permission.name === deletePermission);
        if (!permissionExists) {
            req.flash('error', 'الصلاحية غير موجودة');
            return res.redirect('/admin/managePermissions');
        }
        rolePermissions.permissions = rolePermissions.permissions.filter(permission => permission.name !== deletePermission);
        await rolePermissions.save();
        req.flash('success', 'تم حذف الصلاحية بنجاح');
        res.redirect('/admin/managePermissions');
    } catch (error) {
        console.error('Error deleting permission:', error);
        req.flash('error', 'حدث خطأ أثناء حذف الصلاحية');
        res.redirect('/admin/managePermissions');
    }
};


// معالجة طلب تحديث الحالة الافتراضية لصلاحية
exports.updatePermissionDefault = async (req, res) => {
    try {
        const { role, permission, isDefault } = req.body;
        if (!role || !permission) {
            return res.json({ success: false, error: 'يجب ملء جميع الحقول' });
        }
        const rolePermissions = await Permissions.findOne({ role });
        if (!rolePermissions) {
            return res.json({ success: false, error: 'نوع الحساب غير موجود' });
        }
        const permissionToUpdate = rolePermissions.permissions.find(p => p.name === permission);
        if (!permissionToUpdate) {
            return res.json({ success: false, error: 'الصلاحية غير موجودة' });
        }
        permissionToUpdate.default = isDefault;
        await rolePermissions.save();
        res.json({ success: true });
    } catch (error) {
        console.error('Error updating permission default status:', error);
        res.json({ success: false, error: 'حدث خطأ أثناء تحديث الحالة الافتراضية للصلاحية' });
    }
};



// دالة للحصول على الصلاحيات الخاصة بنوع حساب معين
exports.getPermissionsForRole = async (req, res) => {
    try {
        const { role } = req.query;
        const rolePermissions = await Permissions.findOne({ role });
        if (!rolePermissions) {
            return res.json({ success: false, error: 'نوع الحساب غير موجود' });
        }

        res.json({ success: true, permissions: rolePermissions.permissions });
    } catch (error) {
        console.error('Error fetching permissions for role:', error);
        res.json({ success: false, error: 'حدث خطأ أثناء جلب الصلاحيات' });
    }
};
