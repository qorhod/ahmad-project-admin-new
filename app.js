const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 3001;
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const livereload = require('livereload');
const connectLivereload = require('connect-livereload');
const flash = require('connect-flash');
const adminController = require('./admin/controllers/adminController');
const multer = require('multer');
const fs = require('fs');
const converter = require("arabic-digits-converter"); // مكتبة تحويل الأرقام

require('dotenv').config();
require('./admin/config/passport')(passport);

// إعدادات التحويل للأرقام غير الإنجليزية
function convertToEnglishNumbers(data) {
    const isNumericString = /^[٠١٢٣٤٥٦٧٨٩۰۱۲۳۴۵۶۷۸۹]+$/; // تحقق من أن النص يحتوي فقط على أرقام غير إنجليزية

    if (typeof data === "string" && isNumericString.test(data)) {
        return converter.toEnglishDigits(data); // تحويل الأرقام فقط
    } else if (typeof data === "object" && data !== null) {
        for (let key in data) {
            data[key] = convertToEnglishNumbers(data[key]);
        }
    }
    return data;
}

// Middleware لتطبيق التحويل على جميع الطلبات
app.use((req, res, next) => {
    req.body = convertToEnglishNumbers(req.body);
    req.query = convertToEnglishNumbers(req.query);
    next();
});

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

app.use(flash());

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
    adminController.initializeAdmin();
    adminController.initializeDefaultPermissions();
    adminController.initializePrices();
    
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

// إعدادات multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// تأكد من أن مجلد 'uploads' موجود
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

// استقبال الصورة من العميل
app.post('/upload-image', upload.single('image'), (req, res) => {
  const imagePath = req.file.path;

  // احفظ مسار الصورة في قاعدة البيانات هنا
  // ...

  res.json({ imagePath });
});

// خدمة الملفات الثابتة من مجلد uploads
app.use('/uploads', express.static('uploads'));
