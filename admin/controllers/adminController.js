const path = require('path');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');
const AuthUser = require('../models/auth-user');
const Permissions = require('../models/permissions');
const Prices = require('../models/prices'); 
const Counter = require('../models/counter');
const User = require('../models/customersSchema');

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
// معالجة طلب إضافة مستخدم
exports.postAddUser = async (req, res) => {
    try {
        const { username, name, password, role } = req.body;

        // تحقق من أن اسم المستخدم يتكون من أحرف إنجليزية أو أرقام أو بريد إلكتروني بدون فراغات
        if (!/^[a-zA-Z0-9@.]+$/.test(username)) {
            return res.render(path.join(__dirname, '../views/addUser'), {
                user: req.user,
                currentPage: 'add',
                error: 'اسم المستخدم يجب أن يحتوي على أحرف إنجليزية أو أرقام أو بريد إلكتروني فقط ولا يحتوي على فراغات'
            });
        }

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

        res.redirect('/admin/manageUsers');
    } catch (error) {
        console.error('Error adding user:', error);
        res.render(path.join(__dirname, '../views/addUser'), {
            user: req.user,
            currentPage: 'add',
            error: 'حدث خطأ أثناء إضافة المستخدم'
        });
    }
};



// دالة تهيئة الأدمن الافتراضي
exports.initializeAdmin = async () => {
    try {
        const adminCount = await Admin.countDocuments();
        if (adminCount === 0) {
            const defaultAdmin = new Admin({
                username: '1',
                password: '1' // سيتم تشفير كلمة المرور قبل الحفظ
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
    // من هنا اضافة صلاحيات لأنوع الحسابت الي تحت
    const defaultPermissions = {
        salesManager: [{ name: 'add_customer', description: 'إنشاء عميل جديد', default: true },{ name: 'my_draft', description: 'مسودة ', default: true },{ name: 'add_order', description: 'انشاء طلب جديد', default: true },{ name: 'edit_customers', description: 'تعديل بيانات جميع العملاء', default: true }, { name: 'all_draft', description: 'الوصول إلى جميع المسودات لجميع المناديب', default: false },{ name: 'manufacturing_reports', description: 'تقارير التصنيع: المواد و الزجاج و السكريت و الألمنيوم', default: true }, { name: 'access_reports', description: 'الوصول إلى التقارير', default: true },{ name: 'price', description: 'الوصول إلى تقرير السعر', default: false },{ name: 'add_edit_measurement', description: 'اضافة او تعديل قياس', default: false },],
        salesMan: [{ name: 'add_customer', description: 'إنشاء عميل جديد', default: true },{ name: 'my_draft', description: 'مسودة ', default: true },{ name: 'add_order', description: 'انشاء طلب جديد', default: true },{ name: 'edit_customers', description: 'تعديل بيانات جميع العملاء', default: true },{ name: 'manufacturing_reports', description: 'تقارير التصنيع: المواد و الزجاج و السكريت و الألمنيوم', default: true },{ name: 'price', description: 'الوصول إلى تقرير السعر', default: false },{ name: 'add_edit_measurement', description: 'اضافة او تعديل قياس', default: false },],
        IndustrialManager: [{ name: 'manufacturing_reports', description: 'تقارير التصنيع: المواد و الزجاج و السكريت و الألمنيوم', default: true }, { name: 'add_edit_measurement', description: 'اضافة او تعديل قياس', default: false },{ name: 'price', description: 'الوصول إلى تقرير السعر', default: false }],
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




// عشان انشاء اسم القطاعات بشكل افتراضي عند تشغيل البرنامج
exports.initializePrices = async () => {
    try {
        const count = await Prices.countDocuments();
        if (count === 0) {
            const defaultPrices = new Prices({
                TAX: 0.15, // الضريبة

                price: {
                    slidingD10: 530,
                    slidingD10p: 500,
                    slidingD12: 550,
                    slidingS: 300,
               
                    fixedD10: 450,
                    fixedD4: 300,
                    fixedS10: 350,
                    fixedS4: 300,
                 
                    GOLF10: 550,
                    GOLF12: 600,
                    ROYAL2: 700,
                    ROYAL3: 1000,

                    
                
                    // اسعار الستركتشر
                    SG50: 850,
                    SMART: 850,
                    FORTICKS: 950,
                
                    // سكاي لايت
                    SKYLIGHT: 1100,
                    SKYLIGHT_FOR_WALK: 3000,
                
                    // سعر التيوبات
                    T8CM: 600,
                    T10CM: 600,
                    FLAT: 600,
                
                    // الابواب 
                    SLICES_DOOR: 850,
                    DOUBLE_GLASS_DOOR: 850,

                    TempersPriceMeters: 100, // سعر متر السكريت 


                    // الوحدات الاضافات
                    Structure: 200, // الاسعر الافتارضي لوحدة الاستركتشر
                    Hinges: 200 , // السعر الافتاضي لوحدة المفصلات 
                    RollWindow: 200 // السعر الافتراضي لسعر الشباك الرول الواحد


                }
            });
            await defaultPrices.save();
            console.log("Default prices initialized");
            return "Default prices initialized";
        } else {
            console.log("Prices already initialized");
            return "Prices already initialized";
        }
    } catch (error) {
        console.error("Error initializing prices", error);
        return "Error initializing prices";
    }
}



// دالة للحصول على الأسعار
exports.getPrices = async (req, res) => {
    if (req.isAuthenticated()) {
        try {
            const pricesData = await Prices.findOne();
            const user = req.user || { username: 'guest', profileImage: '/admin/public/img/user.png' };
            res.render(path.join(__dirname, '../views/editPrices'), { prices: pricesData.price, tax: pricesData.TAX, user });
        } catch (error) {
            console.error("Error getting prices", error);
            res.status(500).send("Error getting prices");
        }
    } else {
        res.redirect('/admin');
    }
};


// دالة لتحديث الأسعار
exports.updatePrices = async (req, res) => {
    if (req.isAuthenticated()) {
        try {
            const updatedPrices = req.body.price;  // أسعار المنتجات
            const updatedTax = req.body.TAX;  // قيمة الضريبة

            await Prices.updateOne({}, { price: updatedPrices, TAX: updatedTax });
            res.redirect('/admin/editPrices');
        } catch (error) {
            console.error("Error updating prices and tax", error);
            res.status(500).send("Error updating prices and tax");
        }
    } else {
        res.redirect('/admin');
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




// عرض صفحة إدارة المستخدمين
// عرض صفحة إدارة المستخدمين
exports.getManageUsers = async (req, res) => {
    if (req.isAuthenticated()) {
        const users = await AuthUser.find({});
        const usersByRole = users.reduce((acc, user) => {
            if (!acc[user.role]) {
                acc[user.role] = [];
            }
            acc[user.role].push(user);
            return acc;
        }, {});

        res.render(path.join(__dirname, '../views/manageUsers'), {
            user: req.user,
            currentPage: 'manageUsers',
            usersByRole,
            messages: req.flash()
        });
    } else {
        res.redirect('/admin');
    }
};

// عرض صفحة تعديل المستخدم
exports.getEditUser = async (req, res) => {
    if (req.isAuthenticated()) {
        const { id } = req.params;
        const user = await AuthUser.findById(id);

        res.render(path.join(__dirname, '../views/editUser'), {
            user: req.user,
            currentPage: 'editUser',
            editUser: user,
            messages: req.flash()
        });
    } else {
        res.redirect('/admin');
    }
};


// معالجة طلب حذف مستخدم
exports.deleteUser = async (req, res) => {
    if (req.isAuthenticated()) {
        const { userId } = req.body;
        try {
            await AuthUser.findByIdAndDelete(userId);
            req.flash('success', 'تم حذف المستخدم بنجاح');
        } catch (error) {
            console.error('Error deleting user:', error);
            req.flash('error', 'حدث خطأ أثناء حذف المستخدم');
        }
        res.redirect('/admin/manageUsers');
    } else {
        res.redirect('/admin');
    }
};






// عرض صفحة تعديل المستخدم
exports.getEditUserWithPermissions = async (req, res) => {
    if (req.isAuthenticated()) {
        const userId = req.params.id;
        const user = await AuthUser.findById(userId);
        const allPermissions = await Permissions.findOne({ role: user.role });
        
        res.render(path.join(__dirname, '../views/editUser'), {
            user: req.user,
            currentPage: 'editUser',
            editUser: user,
            allPermissions: allPermissions.permissions,
            userPermissions: user.permissions,
            messages: req.flash() // تمرير رسائل الفلاش إلى القالب
        });
    } else {
        res.redirect('/admin');
    }
};


// معالجة طلب تعديل المستخدم
exports.postEditUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const { username, name, password, role, permissions } = req.body;

        // تحقق من أن اسم المستخدم يتكون من أحرف إنجليزية، أرقام، أو بريد إلكتروني بدون فراغات
        if (!/^[a-zA-Z0-9@.]+$/.test(username)) {
            req.flash('error', 'اسم المستخدم يجب أن يحتوي على أحرف إنجليزية، أرقام، أو بريد إلكتروني فقط ولا يحتوي على فراغات');
            return res.redirect('/admin/editUser/' + userId);
        }

        // تحقق من أن اسم المستخدم غير موجود مسبقًا
        const existingUser = await AuthUser.findOne({ userName: username, _id: { $ne: userId } });
        if (existingUser) {
            req.flash('error', 'اسم المستخدم موجود مسبقًا');
            return res.redirect('/admin/editUser/' + userId);
        }

        // تحديث بيانات المستخدم
        const updateUser = {
            userName: username,
            name: name,
            role: role,
            permissions: Array.isArray(permissions) ? permissions.map(permission => ({
                name: permission,
                description: '',
                default: false
            })) : []
        };

        // إذا كانت كلمة المرور مُدخلة، نقوم بتحديثها
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            updateUser.password = hashedPassword;
        }

        await AuthUser.findByIdAndUpdate(userId, updateUser);

        req.flash('success', 'تم تحديث المستخدم بنجاح');
        res.redirect('/admin/manageUsers');
    } catch (error) {
        console.error('Error updating user:', error);
        req.flash('error', 'حدث خطأ أثناء تحديث المستخدم');
        res.redirect('/admin/editUser/' + req.params.id);
    }
};





// تغير اليوزر و الباسورد للأدمن 

// عرض صفحة إدارة حساب الأدمن
exports.getManageAdmin = async (req, res) => {
    if (req.isAuthenticated()) {
        const admin = await Admin.findOne(); // افتراض أن هناك أدمن واحد فقط
        res.render(path.join(__dirname, '../views/manageAdmin'), {
            user: req.user,
            currentPage: 'manageAdmin',
            admin: admin,
            messages: req.flash()
        });
    } else {
        res.redirect('/admin');
    }
};




// معالجة طلب تعديل حساب الأدمن
exports.postManageAdmin = async (req, res) => {
    try {
        const { username, password } = req.body;
        const admin = await Admin.findOne();

        // تحقق من أن اسم المستخدم يتكون فقط من أحرف إنجليزية وأرقام بدون فراغات
        if (!/^[a-zA-Z0-9]+$/.test(username)) {
            req.flash('error', 'اسم المستخدم يجب أن يحتوي على أحرف إنجليزية وأرقام فقط ولا يحتوي على فراغات');
            return res.redirect('/admin/manageAdmin');
        }

        // تحقق من عدم وجود اسم مستخدم آخر بنفس الاسم
        const existingAdmin = await Admin.findOne({ username: username });
        if (existingAdmin && existingAdmin._id.toString() !== admin._id.toString()) {
            req.flash('error', 'اسم المستخدم موجود بالفعل');
            return res.redirect('/admin/manageAdmin');
        }

        admin.username = username;

        if (password) {
            admin.password = password; // سيتم تشفير كلمة المرور في المخطط
        }

        await admin.save();

        req.flash('success', 'تم تحديث بيانات الأدمن بنجاح');
        res.redirect('/admin/manageAdmin');
    } catch (error) {
        console.error('Error updating admin:', error);
        req.flash('error', 'حدث خطأ أثناء تحديث بيانات الأدمن');
        res.redirect('/admin/manageAdmin');
    }
};




// تعديل بيانات العداد

// عرض صفحة تعديل العدادات
exports.getCounterPage = async (req, res) => {
    if (req.isAuthenticated()) { // تحقق من المصادقة
        try {
            const counter = await Counter.findOne({ name: 'orderNumber' }); // استبدل 'yourCounterName' بالاسم المناسب

            res.render(path.join(__dirname, '../views/counter.ejs'), {
                user: req.user, // تمرير المستخدم المصادق عليه
                currentPage: 'counter', // لتحديد الصفحة الحالية
                lastNumber: counter ? counter.lastNumber : 0, // تمرير lastNumber إلى القالب
                messages: req.flash() // تمرير رسائل الفلاش إلى القالب
            });
        } catch (err) {
            console.error(err);
            res.status(500).send("حدث خطأ ما!");
        }
    } else {
        res.redirect('/admin'); // إعادة التوجيه إذا لم يكن المستخدم مصادق عليه
    }
};

exports.updateCounterPage = async (req, res) => {
    if (req.isAuthenticated()) {
        const { lastNumber } = req.body;
        try {
            // تحديث lastNumber باستخدام updateOne
            const result = await Counter.updateOne({ name: 'orderNumber' }, { $set: { lastNumber: lastNumber } });
            
            if (result.nModified > 0) {
                console.log("Counter updated successfully");
            } else {
                console.log("No documents matched the query. Updated 0 documents.");
            }

            // إعادة التوجيه إلى صفحة counter بعد التحديث
            res.redirect('/admin/counter');
        } catch (err) {
            console.error("Error updating counter:", err);
            res.status(500).send("حدث خطأ ما!");
        }
    } else {
        res.redirect('/admin'); // إعادة التوجيه إذا لم يكن المستخدم مصادق عليه
    }
};

// تعديل بيانات العداد 




// عرض قائمة العملاء
exports.getCustomers = async (req, res) => {
    if (req.isAuthenticated()) { // تحقق من المصادقة
        try {
            const customers = await User.find(); // جلب جميع العملاء من قاعدة البيانات

            res.render(path.join(__dirname, '../views/customers.ejs'), {
                user: req.user, // تمرير المستخدم المصادق عليه
                currentPage: 'customers', // لتحديد الصفحة الحالية
                customers: customers // تمرير قائمة العملاء إلى القالب
            });
        } catch (err) {
            console.error(err);
            res.status(500).send("حدث خطأ ما!");
        }
    } else {
        res.redirect('/admin'); // إعادة التوجيه إذا لم يكن المستخدم مصادق عليه
    }
};


// حذف عميل معين
exports.deleteCustomer = async (req, res) => {
    if (req.isAuthenticated()) { // تحقق من المصادقة
        try {
            const customerId = req.params.id; // الحصول على ID العميل من المعاملات

            await User.findByIdAndDelete(customerId); // حذف العميل باستخدام الـ ID

            req.flash('success', 'تم حذف العميل بنجاح');
            res.redirect('/admin/customers'); // إعادة التوجيه إلى صفحة العملاء بعد الحذف
        } catch (err) {
            console.error("Error deleting customer:", err);
            req.flash('error', 'حدث خطأ ما أثناء حذف العميل');
            res.status(500).send("حدث خطأ ما!");
        }
    } else {
        res.redirect('/admin'); // إعادة التوجيه إذا لم يكن المستخدم مصادق عليه
    }
};


// عرض الوردرات
exports.getOrdersPage = async (req, res) => {
    if (req.isAuthenticated()) { // تحقق من المصادقة
        try {
            // جلب جميع الأوامر من السكيما User (هنا يتم افتراض أن `orders` هو حقل فرعي في سكيما `User`)
            const users = await User.find(); 
            const orders = users.map(user => user.orders).flat(); // تجميع جميع الأوامر في مصفوفة واحدة

            res.render(path.join(__dirname, '../views/orders.ejs'), {
                user: req.user, // تمرير المستخدم المصادق عليه
                currentPage: 'orders', // لتحديد الصفحة الحالية
                orders: orders // تمرير قائمة الأوامر إلى القالب
            });
        } catch (err) {
            console.error("Error fetching orders:", err);
            res.status(500).send("حدث خطأ ما!");
        }
    } else {
        res.redirect('/admin'); // إعادة التوجيه إذا لم يكن المستخدم مصادق عليه
    }
};





// مسح الطلب
exports.deleteOrder = async (req, res) => {
    if (req.isAuthenticated()) { // تحقق من المصادقة
        try {
            const orderId = req.params.id; // الحصول على ID الأمر من المعاملات

            // البحث عن المستخدم الذي يحتوي على هذا الأمر
            const user = await User.findOne({ "orders._id": orderId });

            if (user) {
                // استخدام filter لإزالة الأمر من المصفوفة
                user.orders = user.orders.filter(order => order._id.toString() !== orderId);

                // حفظ التغييرات
                await user.save();

                req.flash('success', 'تم حذف الأمر بنجاح');
                res.redirect('/admin/orders'); // إعادة التوجيه إلى صفحة الأوامر بعد الحذف
            } else {
                req.flash('error', 'لم يتم العثور على الأمر');
                res.redirect('/admin/orders');
            }

        } catch (err) {
            console.error("Error deleting order:", err);
            req.flash('error', 'حدث خطأ ما أثناء حذف الأمر');
            res.status(500).send("حدث خطأ ما!");
        }
    } else {
        res.redirect('/admin'); // إعادة التوجيه إذا لم يكن المستخدم مصادق عليه
    }
};






// تسجيل خروج 

exports.logout = (req, res) => {
    req.session.destroy(err => {
      if (err) {
        return res.status(500).send('Failed to log out');
      }
      res.clearCookie('connect.sid'); // قم بمسح ملفات تعريف الارتباط لجلسة المستخدم
      res.redirect('/admin/login'); // إعادة التوجيه إلى صفحة تسجيل الدخول الخاصة بالمسؤول
    });
  };