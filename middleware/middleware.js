
// يوجد هنا دالة فنكشن لتحقق من التوكن وفنكشن آخر تتأكد من تسجيل دخولك عشاد دعدل على الصغحاتي مثل صفحة تسجيل الدخول


const AuthUser = require("../models/auth-user") // تسيما الحسابات اليوزرات

const User = require("../models/customersSchema")
const Counter = require('../models/counter'); // مكان حفظ اخر ترقيم للطلب



// فنكشن التأكد من التكوكن الدرس رقم 8 مستوى 2
var jwt = require("jsonwebtoken"); // تحضير مكتبة التوكن


//  يوجد كودين في صفحة الاب تبع الادة الي  تجيب التوكن من المتصفع لان السيرف ما يستطيع
// const requireAuth = (req, res ,next) => {
//     console.log(req.cookies.jwt)
//     const token = req.cookies.jwt

//     if (req.path === '/login'|| req.path === '/'|| req.path === '/sign-up' || req.path === '/admin') { // *  هذا عشان يستثني لي هذي الصفحات من التحويل غلى صفة تسجيل الدخول اذا التوكن غير موجود لاني حطية في صفحة الراوت ان يحدد جميع الركوستات الي تحمل قت بأستخدام علامة 

//       next();
//     } else{

//     if(token){
//       jwt.verify(token, "shhhhh", (err) => { // هذا تحقق اذا التكون مكتوب بطريقة صحيحة ولابيعطك خطاء ويحولك على صفة اللوقن
//         if (err) { 
//           res.redirect("/login"); 
//           } else {
//             next() // اذا صح يعطيك نكست للركوس القادم
//           }
  
//          });
//         }else{
      
//          res.redirect("/login"); // اذا غلط يحولك على صفحة اللوقن
//         }

//       }
//   };


const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  if (req.path === '/login' || req.path === '/' || req.path === '/sign-up' || req.path === '/admin') {
    next();
  } else {
    if (token) {
      jwt.verify(token, "shhhhh", (err, decoded) => {
        if (err) {
          res.redirect("/login");
        } else {
          req.user = decoded;
          next();
        }
      });
    } else {
      res.redirect("/login");
    }
  }
};
  
  ///فنكشن التأكد من التوكن ///



  


// فنكشن عشان تتأكد من انك مسجل الدخول عشان ماتزيد تدخل على صفحة الوق ان و تسجيل مستخدم زي كذا
// const checkIfUser  = (req, res, next)=>{
//   // res.locals.xxx = "qorhod" // هذا الاداة مهمة جدا جدا لاني دورت عليها واجد طبعا تكتب فيها اي شي وتقدر تضهره في الي صفحة من الصفحات التاليه بكتابة اسمة في اي صفحة تبغى طبعا اخر كلمة تكتب في اي اسم تبغى زي المتغير بضبط انا كاتب 3 اكس
// const token = req.cookies.jwt
//         if (token){
//           // login user

//                       jwt.verify(token, "shhhhh", async(err,decoded) => { // هذا يتأكد من ان التوكن مكتوب بطريقة صحيحة واذا فيه خطا ينطبع في الخطا و التغير الي بعد كلم الخطاء يجيب لن التوكن عشان نتسفيد منه الاكواد التالية 
//                         if (err) { 
//                           res.locals.user =null //null يعني اذا خطاء خرج ذي للركوستات الي تحت مكتوب عليه اسم اذي الدالة ان تعطيه 
//                           next() // اذا صح يعطيك نكست للركوس القادم
//                           } else {
//                           const loginUser = await AuthUser.findById(decoded.id) // هذا عشان يروح قاعدة البينات وستخرج بينات الحساب من الايد وهذا اليدي اخذناه من التوكن الي في المتصفح لأننا سجلنا الأيدي في التوكن عند تسجيل الدخول تقدر ترجعلها وتشوف
//                           res.locals.user =loginUser //الي تبغى وتقدر تشوف كيف سويت في صفحة الويلكم بستخدام هذا المتغير   ejs وخليناه يساوي البينات حقت العميل عن طريق استخراج اليدي من التوكن لاننا جعلنا الايدي يكتب في التوكن عند تسجيل الدخول خلاص ذلحين نقدر نطبع في صفحة user هذا ارسالة ركوست للدوالة القادمة وسمينا امتغير حقة 
//                                next() // اذا صح يعطيك نكست للركوس القادم


//                           }
                   
//                         });


            
//         }else{
//           res.locals.user =null
//           next()
//         }
// };



// الكود الأصلي الي فوق ولكن هذا الي تحت يمرر اسماء الصالحيات لجميع الركوستات
const checkIfUser = async (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
      try {
          const decoded = jwt.verify(token, "shhhhh");
          const loginUser = await AuthUser.findById(decoded.id);

          if (!loginUser) {
              res.locals.user = null;
              res.locals.permissions = [];
          } else {
              res.locals.user = loginUser;
              res.locals.permissions = loginUser.permissions;
          }
      } catch (err) {
          res.locals.user = null;
          res.locals.permissions = [];
      }
  } else {
      res.locals.user = null;
      res.locals.permissions = [];
  }
  next();
};


// هي المعادة تساوي ترقيم لطلبات وما يتكرر الرقم لانه يحتوي على داله من المنقو ديبي



// دالة لتأكد من الحساب هل الصلاحية في الوصول إلى الركوست بأستخدم الصلاحيات الممنوحة له 

const checkPermission = (requiredPermission) => (req, res, next) => {
  const user = res.locals.user;

  if (!user) {
      console.log("User not found in res.locals");
      return res.status(404).send({ message: 'User not found.' });
  }

  // التحقق من وجود الإذن المطلوب في قائمة أذونات المستخدم
  const hasPermission = user.permissions.some(permission => permission.name === requiredPermission);

  if (!hasPermission) {
      console.log("Insufficient permissions:", requiredPermission);
      return res.status(403).send({ message: 'Access denied: insufficient permissions.' });
  }

  next();
};


// // دالة لتأكد من الحساب هل الصلاحية في الوصول إلى الركوست بأستخدم الصلاحيات الممنوحة له  // 








// const mongoose = require('mongoose');

// const yourSchema = new mongoose.Schema({
//   // تعريف باقي حقول الوثيقة هنا
//   // مثال: firstName: String, lastName: String, وما إلى ذلك
 
//     orderNumber: Number, // حقل جديد لترقيم البيانات
//       status: String,
   
// });

// // استخدام وظيفة pre لتحديد قيمة حقل الترقيم والحقل orderNumber قبل حفظ الوثيقة
// yourSchema.pre('save', async function(next) {
//   // إذا كانت هذه الوثيقة جديدة ولم يتم تحديد قيمة لحقل الترقيم (orderNumber)
//   if (this.isNew && !this.orderNumber) {
//       try {
//           // احسب عدد الوثائق الموجودة في المجموعة وأضف 1 للحصول على القيمة الجديدة لحقل الترقيم
//           const count = await this.constructor.countDocuments(); // هذي هي الداله التي لل تكرر الرقم لم اعرف كيف الصفرها إى الان ولاكن انقص العدد مثل ما سويت تحت
//           this.orderNumber = count -225 + 100;
//           // this.orderNumber = count + 1;
//           // this.orderNumber = count > 0 ? count + 1 : 1;

//       } catch (err) {
//           next(err);
//       }
//   }

//   // تعيين القيمة الافتراضية لحقل updatedAt قبل حفظ الوثيقة
//   this.updatedAt = new Date();

//   next();
// });





// const YourModel = mongoose.model('YourModel', yourSchema);

// module.exports = YourModel;
//////معادلة الترقيم///




        //counter دالة ترقيم جديدة افضل من الي فوق هذه تقوم بحف اخر ترقيم في الداتا بأسم

        async function getNextOrderNumber() {
          const counter = await Counter.findOneAndUpdate(
            { name: 'orderNumber' },
            { $inc: { lastNumber: 1 } },
            { new: true, upsert: true } 
          );

          return counter.lastNumber;
        }


        //counter دالة ترقيم جديدة افضل من الي فوق هذه تقوم بحف اخر ترقيم في الداتا بأسم







// دالة عشان اذا دخل المستخدم على رابط غير موجود يرجعة لصفحة الهوم ما عرفة اشغلها لعدم التفرغ

// // Middleware لفحص الطلبات الواردة وتوجيه المستخدمين إلى صفحة الوجهة المطلوبة
// const checkExtension = (req, res, next) => {
//   // قم بفحص الطلبات التي تحتوي على امتدادات غير صحيحة
//   if (req.path.includes('.') && !req.path.endsWith('.html')) {
//       // إعادة توجيه المستخدمين إلى الصفحة الرئيسية
//       return res.redirect('/');
//   }
//   // في حال كان الامتداد صحيحًا، فقم بتمرير الطلب إلى middleware القادم
//   next();
// };

// app.use(checkExtension);

// //دالة عشان اذا دخل المستخدم على رابط غير موجود يرجعة لصفحة الهوم ما عرفة اشغلها لعدم التفرغ//

// دالة للتحقق من دور المستخدم
function ensureRole(role) {
  return function (req, res, next) {
    if (req.user && req.user.role === role) {
      return next();
    } else {
      res.redirect('/login');
    }
  }
}



// هذه الدالة من اجل تقيد الصفحات عشان ما تظهر لحساب العمال 
function restrictFactoryWorker(req, res, next) {
  if (req.user && req.user.role === 'factoryWorker' && req.path !== '/workerPage') {
    return res.redirect('/workerPage');
  }
  next();
}

// هذا تجيب البينات من التكوكن بما في ذالك نوع الحساب
function verifyToken(req, res, next) {
  const token = req.cookies.jwt;
  if (!token) return res.status(401).send('Access Denied');

  try {
      const verified = jwt.verify(token, 'shhhhh');
      req.user = verified; // تحتوي على { id, userName, name, role, iat }
      next();
  } catch (err) {
      res.status(400).send('Invalid Token');
  }
}

module.exports = {checkIfUser,requireAuth,ensureRole,restrictFactoryWorker,verifyToken,checkPermission,getNextOrderNumber}

// module.exports = {requireAuth}
// module.exports = {checkIfUser}