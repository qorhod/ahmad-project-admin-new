const express = require('express');
const app = express();
const path = require('path');
const port = 3001;
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const livereload = require('livereload');
const connectLivereload = require('connect-livereload');
const flash = require('connect-flash');
const adminController = require('./admin/controllers/adminController'); // استيراد وحدة تحكم الأدمن

require('dotenv').config();
require('./admin/config/passport')(passport); // تحميل إعدادات passport للأدمن

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use('/admin/public', express.static(path.join(__dirname, 'admin/public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(cookieParser());

// إعدادات الجلسة
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true
}));

app.use(flash()); // استخدام connect-flash

// إعدادات passport
app.use(passport.initialize());
app.use(passport.session());

// إعدادات live reload
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, 'public'));
liveReloadServer.watch(path.join(__dirname, 'admin/public'));
app.use(connectLivereload());
liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});

// الاتصال بقاعدة البيانات
mongoose.connect(process.env.DATABASE_PASSWORD)
  .then(() => {
    // تهيئة الأدمن الافتراضي والصلاحيات الافتراضية
    adminController.initializeAdmin();
    adminController.initializeDefaultPermissions();
    
    app.listen(port, () => {
      console.log(`http://localhost:${port}/`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

// إعداد التوجيهات
const allRoutes = require('./routes/allRoutes');
const adminRoutes = require('./admin/routes/adminRoutes');

// استخدم مسارات الأدمن
app.use('/admin', adminRoutes);

// استخدم مسارات أخرى
app.use(allRoutes);
