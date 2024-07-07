const path = require('path');

// عرض صفحة تسجيل الدخول
exports.getLogin = (req, res) => {
    res.render(path.join(__dirname, '../views/index'));
};

// معالجة تسجيل الدخول
exports.postLogin = (req, res) => {
    const { email, password } = req.body;
    if (email === 'admin@example.com' && password === 'password') {
        res.redirect('/admin/dashboard');
    } else {
        res.redirect('/admin');
    }
};

// عرض لوحة التحكم
exports.getDashboard = (req, res) => {
    const user = { profileImage: '/admin/public/images/user.png', userName: 'Admin' }; // مثال على تعريف المستخدم
    res.render(path.join(__dirname, '../views/dashboard'), { user });
};

// عرض صفحة إضافة مستخدم
exports.addUser = (req, res) => {
    const user = { profileImage: '/admin/public/images/user.png', userName: 'Admin' }; // مثال على تعريف المستخدم
    res.render(path.join(__dirname, '../views/addUser'), { user });
};
