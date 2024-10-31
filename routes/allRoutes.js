const express = require('express') //اكواد جاهزة من اكسبرس
const router = express.Router() // اكواد جاهزة من اكسبرس
const mongoose = require('mongoose');

const User = require("../models/customersSchema.js") // اسكيما العملاء

const AuthUser = require("../models/auth-user") // تسيما الحسابات اليوزرات

const commands = require("../models/commands")
const Prices = require("../models/prices")

var moment = require('moment'); // مكتبة لتعديل شكل التاريخ والوقت الوجودة في الداتا وعن طريق المنقوز
const bcrypt = require('bcrypt');  // تحضير مكتبة تشفير الباسورد
var jwt = require("jsonwebtoken"); // تحضير مكتبة التوكن

const AsyncLock = require('async-lock'); //هذا ولي تحت كود عشان يعمل قفلعلى الداتا يمنع من تكرار البينات عطاني اياه الذاكاء الصناعي عسانمشكلة تكرار مجموع المواد في الداتا
const lock = new AsyncLock();
// const converter = require("arabic-digits-converter"); // مكتبه تحويل الارقم الغير انجليزيه إلى انجليزي



const {requireAuth} = require("../middleware/middleware.js") // تسيما الحسابات اليوزرات

const {checkIfUser} = require("../middleware/middleware.js")


// const equations = require("../middleware/equations.js")
const {calculateResults} = require("../middleware/equations.js")
const {functionPrice} = require("../middleware/equations.js")
const {updateTotal} = require("../middleware/equations.js")
const {refreshDiscount} = require("../middleware/equations.js")
const {motherEquation} = require("../middleware/equations.js")
const {totalMotherEquation} = require("../middleware/equations.js")
const {calculateValues} = require("../middleware/equations.js")
const {aluminumCuttingReport} = require("../middleware/equations.js")
const {updatetotalMotherEquation} = require("../middleware/equations.js")
const { numberAllMeasurementsForOrder } = require('../middleware/sequenceNumberHelper'); // استدعاء دالة الترقيم
const {ensureRole} = require('../middleware/middleware.js')
const {restrictFactoryWorker} = require('../middleware/middleware');
const {verifyToken} = require('../middleware/middleware');
const {checkPermission} = require('../middleware/middleware');  //  التأكد من صلاحية المستخدم للوصول إلى هذه الركوست تستخدم هكذا checkPermission('اسم الصلاحية')
const {getNextOrderNumber} = require('../middleware/middleware');  // دالة ترقيم الطلب المؤكد    

const {calculateTotalTempersMeters} = require("../middleware/equations.js"); // دالة تجمع امتار السكريت في الاوردر كامل 
const {calculateTotalPrice} = require("../middleware/equations.js"); // دالة لجمع مجموع اسعار النواف الضافية 




// router.get("/calculator",calculator) // يعي تنفذ هذاي الداة على جميع الاكواد النجمه يعين جميع الاكواد
// router.post("*",calculator)



router.get("*",checkIfUser) // يعي تنفذ هذاي الداة على جميع الاكواد النجمه يعين جميع الاكواد
router.post("*",checkIfUser)


router.get("*",requireAuth) // يعي تنفذ هذاي الداة على جميع الاكواد النجمه يعين جميع الاكواد




// router.get('/user/measurement',requireAuth, (req, res) => { // نقول له اذ فتحت هذا الامتداد حولني على الملف الي تحت
//   res.render('user/measurement') //هنا تحط اسم الملف الي تبغة يفتحة لحة اذا دخلة على الرابط الي فوق 
// })






router.post("/user/measurement",checkPermission('add_edit_measurement'), async (req, res) => {


  //   const loginUser = await AuthUser.findOne({ email: req.body.email });
            
  console.log("__________________________________________");
    
  console.log(req.body);
  console.log("__________________________________________");
  
  
  });
  







































//GET اكواد كلها 



// قيد التصنيع
router.get('/in-production', requireAuth,restrictFactoryWorker, (req, res) => {
  var decoded = jwt.verify(req.cookies.jwt, 'shhhhh');
  User.find()
    .then((users) => {
      res.render('user/inProduction', { arr: users, moment: moment,jwt:decoded });
    })
    .catch((err) => {
      console.log(err);
    });
});





// قيد التركيب
router.get('/in-installation', requireAuth,restrictFactoryWorker, (req, res) => {
  var decoded = jwt.verify(req.cookies.jwt, 'shhhhh');
  User.find()
    .then((users) => {
      res.render('user/inInstallation', { arr: users, moment: moment,jwt:decoded });
    })
    .catch((err) => {
      console.log(err);
    });
});

// تم التسليم
router.get('/delivered', requireAuth,restrictFactoryWorker, (req, res) => {
  var decoded = jwt.verify(req.cookies.jwt, 'shhhhh');
  User.find()
    .then((users) => {
      res.render('user/delivered', { arr: users, moment: moment,jwt:decoded });
    })
    .catch((err) => {
      console.log(err);
    });
});

// ملغي
// router.get('/canceled', requireAuth, (req, res) => {
//   var decoded = jwt.verify(req.cookies.jwt, 'shhhhh');
//   User.findById(decoded.id)
//     .then((user) => {
//       // استرجاع العملاء ملغي
//       // const canceledCustomers = user.customerInfo.filter(customer => customer.status === 'Canceled');
//       res.render('user/canceled', { arr: user, moment: moment });
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

// ////
router.get('/canceled',requireAuth,restrictFactoryWorker, (req, res, ) => {
  var decoded = jwt.verify(req.cookies.jwt, 'shhhhh');
  User.find()
    .then((users) => {
      res.render('user/canceled', { arr: users, moment: moment,jwt:decoded });
    })
    .catch((err) => {
      console.log(err);
    });
})









//Level 1



// هذا الركوس اذا الواحد دخل على الصفحة الرايسية اش يطلعلة

// router.get('/home',requireAuth, (req, res, ) => {
//     // res.send('<h1>Hello World!</h1>') // هذا الأمر يطبع في المتصفح وتقدر تكتب فيه اش تي ام ال
//     // res.sendFile("./views/home.html", {root: __dirname}); // لعرض التصميم من ملفي اتش تي امل ال
//     // AuthUser.find()//هذا يستدعي قاعدة البينات

//   var decoded = jwt.verify(req.cookies.jwt, 'shhhhh'); // لمعرفة الأيدي من التوكن عشان نحطة في البحث بال اي دي تحت عشان نعرف العملاء الي تحت اسم هذا المستخدم
//   console.log(decoded.id)

//     // AuthUser.findById(decoded.id)//نبعث بال ايدي وجبنا الايد من التوكن بطريقة الي فوق 
//     User.find()

//   .then((result)=>{
//   console.log(result)
//   // res.render("index",  {arr:result.customerInfo , moment:moment } ) // هذا حنا اشأنه في الداتا عطريقاكسيما محمل بأري فيه العملاء الي على اسم المستخدم customerInfoنقول له اطبعلنا طفحة الاندكس في في الامتداد الرايسب وحطينا فاصلة وكتبنا متغير محمل بداتا وارسلناه لصفحة الاندكس عشان يرتبون في الاجدول هناك طبعا حطينا
//   res.render("index", { arr: result, moment: moment });

//   }).catch((err)=>{
//     console.log(err)
//   })
//   })
  
  
  
  
  router.get('/user/add.html',requireAuth,restrictFactoryWorker,checkPermission('add_customer'), (req, res) => { // نقول له اذ فتحت هذا الامتداد حولني على الملف الي تحت
    var decoded = jwt.verify(req.cookies.jwt, 'shhhhh'); 

    res.render('user/add',{ jwt: decoded }) //هنا تحط اسم الملف الي تبغة يفتحة لحة اذا دخلة على الرابط الي فوق 
  })
  
  
  
  router.get('/user/view.html',requireAuth,restrictFactoryWorker, (req, res) => { // نقول له اذ فتحت هذا الامتداد حولني على الملف الي تحت
    res.render('user/view') //هنا تحط اسم الملف الي تبغة يفتحة لحة اذا دخلة على الرابط الي فوق 
  })
  
  
  
  router.get('/user/:id',requireAuth,restrictFactoryWorker, (req, res) => { // نقول له اذ فتحت هذا الامتداد حولني على الملف الي تحت
  
    User.findById(req.params.id)
  
    res.render('user/edit') //هنا تحط اسم الملف الي تبغة يفتحة لحة اذا دخلة على الرابط الي فوق 
  })
  
  
  
  // هذا الركوست اذا احد ضغط على عرض للعميل
  
  router.get('/view/:id',requireAuth,restrictFactoryWorker,async (req, res) => {  // :id طبعاً هذا الجزء مهم جداً عندي جزء في الرابط متغير يعتمد على ضغط المستخدم على اي عميل فتوجد طريقة جمية  جداً انك تكتب متغير في الرابط وبعيث يتغر مع النقرات ويكون فيه اليدي حق العميل ولكتابت متغير ضع نقطتان راسياتن وبعدها اسم المتغير الي تبغى مثل 
   
    // const a =await User.findById(req.params.id) // هذي الادة من منقز لاستخراج ابجكت معين من الداتا ممكن تكتب الايري على طول بس حن استخرجناه من الرابط بهذي العبارة واضفنا اسم المتغير الي اضفنه فوق
// AuthUser.findOne({"customerInfo._id":req.params.id})
User.findOne({_id:req.params.id})
// console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaa")
// console.log(a)
// console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaa")
.then((result)=>{
console.log(result)
// res.render("index",  {arr:result.customerInfo , moment:moment } ) // هذا حنا اشأنه في الداتا عطريقاكسيما محمل بأري فيه العملاء الي على اسم المستخدم customerInfoنقول له اطبعلنا طفحة الاندكس في في الامتداد الرايسب وحطينا فاصلة وكتبنا متغير محمل بداتا وارسلناه لصفحة الاندكس عشان يرتبون في الاجدول هناك طبعا حطينا
// console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaa")
// console.log(result)
// console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaa")
// const clickedobject = result.customerInfo.find((item)=>{

//   const clickedobject = result.find((item)=>{
//   return item._id == req.params.id
  
// })
// console.log(clickedobject)
var decoded = jwt.verify(req.cookies.jwt, 'shhhhh'); 


          res.render('user/view',{arrView:result ,moment:moment,userId:decoded.id} ) // المتغير الثاني حق اداة تغيير شكل اوقت
        }).catch((err)=>{
            console.log(err)
   })
   
  
  })
  
  




  
  router.get('/edit/:id',requireAuth,restrictFactoryWorker, async(req, res) => { // نقول له اذ فتحت هذا الامتداد حولني على الملف الي تحت
    const b= await User.findOne({"_id":req.params.id })
    // const b =await User.findById(req.params.id)
    

   
    
   
    // console.log(b)

  
    // console.log(User.findOne({ }))
    // AuthUser.findOne({"customerInfo._id":req.params.id })
    
    .then((result)=>{
  // // const clickedObject =result.customerInfo.find((item) =>{
  // //   return item._id ==req.params.id
  // // })
  console.log("bgsgfdgggsgfgsgsdfgsfgsdgfdsxxxxxxxx")
  console.log(result)
        // res.render('user/ test',{obj:result ,moment:moment} )
        res.render('user/edit',{obj:result ,moment:moment} )
    }).catch((err)=>{
      console.log(err)
    })
  })


  // sign out
  router.get('/signout',requireAuth, (req, res) => { //هذا تسجيل الخروج 
    res.cookie("jwt", { maxAge: 1 }); // هذا يحذف التوكن عشان سجل حروج بختصار يكتب توكن فاضي ويخليه لمدة جزء من الثانية
    
    res.redirect("/") // بعد مايحذف التوكن يحول المستخدم إلى صفحة الرأيسية
  })

  


            //GET Level 2
            router.get("/", (req, res) => {

              res.render("welcome");

            });



            router.get("/login", (req, res) => {

              res.render("auth/login");

            });



            //تم الإستغناء عنه ويتم انشاء الحسابات في الادمن
            // router.get("/sign-up", (req, res) => {

            //   res.render("auth/sign-up");

            // });
            
    
            

            
            //   ////GET Level ////2/////


                // صفحة القياسات الأساسية
            router.get("/basic-measurement/:id",restrictFactoryWorker,checkPermission('add_order'), (req, res) => {
              
              User.findById(req.params.id) // هذي الادة من منقز لاستخراج ابجكت معين من الداتا ممكن تكتب الايري على طول بس حن استخرجناه من الرابط بهذي العبارة واضفنا اسم المتغير الي اضفنه فوق
                      .then((result)=>{
                        console.log(req.body)
                        res.render('user/basic-measurement',{arrM:result ,moment:moment} ) // المتغير الثاني حق اداة تغيير شكل اوقت
                      }).catch((err)=>{
                          console.log(err)
                 })


            });



                // صفحة القياسات الأساسية
                router.get("/edit-basic-measurement/:orderId", restrictFactoryWorker, checkPermission('add_order'), async (req, res) => {
                  try {
                      // جلب orderId من المسار
                      const { orderId } = req.params;
                      
                      // جلب customerId من الاستعلام
                      const { customerId } = req.query;
                      // البحث عن الطلب بناءً على orderId
                      const user = await User.findOne({ "orders._id": orderId }, { "orders.$": 1 }); // يستخدم $ لجلب الطلب فقط
                      
                      if (user && user.orders.length > 0) {
                          const order = user.orders[0]; // الطلب الذي تم جلبه
                          res.render('user/edit-basic-measurement', { order: order, customerId: customerId, moment: moment });
                      } else {
                          res.status(404).send('Order not found');
                      }
                  } catch (err) {
                      res.status(500).send(err);
                  }
              });




     router.post('/edit-basic-measurement', async (req, res) => {
  try {
      const {
          branch,
          location,
          aluminumCode0,
          aluminumThickness0,
          aluminumColorCode0,
          glasstype0,
          glassThickness0,
          glassColorCode0,
          id
      } = req.body;

      // تحديث الطلب داخل المستخدم بناءً على ID
      const user = await User.findOneAndUpdate(
          { "orders._id": id },
          {
              $set: {
                  "orders.$.branch": branch,
                  "orders.$.location": location,
                  "orders.$.aluminumCode0": aluminumCode0,
                  "orders.$.aluminumThickness0": aluminumThickness0,
                  "orders.$.aluminumColorCode0": aluminumColorCode0,
                  "orders.$.glasstype0": glasstype0,
                  "orders.$.glassThickness0": glassThickness0,
                  "orders.$.glassColorCode0": glassColorCode0
              }
          },
          { new: true }
      );

      if (!user) {
          return res.status(404).json({ message: 'Order not found' });
      }

      res.json({ message: 'Order updated successfully', id });
  } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
  }
});




// جميع المسودات 

            router.get('/draft',requireAuth,restrictFactoryWorker,checkPermission('all_draft'), (req, res, ) => {
              var decoded = jwt.verify(req.cookies.jwt, 'shhhhh');
              User.find()
                .then((users) => {
                  res.render('user/draft', { arr: users, moment: moment,jwt:decoded });
                })
                .catch((err) => {
                  console.log(err);
                });
            })



// المسودة الخاصة في اليوزر

router.get('/my-draft',requireAuth,restrictFactoryWorker,checkPermission('my_draft'), (req, res, ) => {
  var decoded = jwt.verify(req.cookies.jwt, 'shhhhh');
  User.find()
    .then((users) => {
      res.render('user/myDraft', { arr: users, moment: moment,jwt:decoded });
    })
    .catch((err) => {
      console.log(err);
    });
})





            router.post("/basic-measurement/:id",restrictFactoryWorker,checkPermission('add_order'), async (req, res) => {
              const v = await req.body
              const b = req.params.id
              
          


              var decoded = jwt.verify(req.cookies.jwt, 'shhhhh'); // استخراج البيانات من التوكن

              // استدعاء جميع بيانات `prices`
              const allPricesData = await Prices.findOne({}); // هذا سيعيد جميع الوثائق من نموذج `prices`
              
              // التحقق من وجود البيانات
              if (!allPricesData || allPricesData.length === 0) {
                return res.status(404).json({ error: 'لم يتم العثور على أي بيانات في prices' });
              }

              const prices = allPricesData.price
              console.log("====================jj")

              // إنشاء كائن جديد يحتوي على البيانات التي نريد إضافتها
              
   const n = await {
  status: 'مسودة',
  branch: v.branch,
  location: v.location,
  salesEmployeeId: decoded.id,
  salesEmployeeName: decoded.name,
  salesEmployeeUserName: decoded.userName,

  aluminumCode0:v.aluminumCode0,
  aluminumThickness0: v.aluminumThickness0,
  aluminumColorCode0: v.aluminumColorCode0,

  glasstype0: v.glasstype0,
  glassThickness0: v.glassThickness0,
  glassColorCode0: v.glassColorCode0,
  // glassColorCode0: v.glassColorCode,
  TAX:allPricesData.TAX,
  prices: { 
    slidingD10: prices.slidingD10,
    slidingD10p: prices.slidingD10p,
    slidingD12: prices.slidingD12,
    slidingS: prices.slidingS,
    interruptT: prices.interruptT,
    interrupt: prices.interrupt,
    fixedD10: prices.fixedD10,
    fixedD4: prices.fixedD4,
    fixedS10: prices.fixedS10,
    fixedS4: prices.fixedS4,
  
    GOLF10: prices.GOLF10,
    GOLF12: prices.GOLF12,
    ROYAL2: prices.ROYAL2,
    ROYAL3: prices.ROYAL3,
  
    // اسعار الستركتشر
    SG50: prices.SG50,
    SMART: prices.SMART,
    FORTICKS: prices.FORTICKS,
  
    // سكاي لايت
    SKYLIGHT: prices.SKYLIGHT,
    SKYLIGHT_FOR_WALK: prices.SKYLIGHT_FOR_WALK,
  
    // سعر التيوبات
    T8CM: prices.T8CM,
    T10CM: prices.T10CM,
    FLAT: prices.FLAT,
  
    // الابواب 
    SLICES_DOOR: prices.SLICES_DOOR,
    DOUBLE_GLASS_DOOR: prices.DOUBLE_GLASS_DOOR
  },
  



          measurement:[]
        };
    
// تحديث مستند المستخدم بناءً على `_id` وإضافة البيانات إلى `orders`
try {
  const updatedUser = await User.findOneAndUpdate(
    { _id: v.id }, // البحث عن المستخدم بناءً على `id`
    { $push: { orders: n } }, // إضافة البيانات الجديدة إلى `orders`
    { new: true, upsert: true } // إنشاء مستند جديد إذا لم يتم العثور على أي مستند
  );

  // console.log('تمت إضافة البيانات بنجاح:', updatedUser);
  return res.json({ id: "done" });

} catch (error) {
  console.error('حدث خطأ أثناء إضافة البيانات:', error);
  return res.status(500).json({ error: 'حدث خطأ أثناء إضافة البيانات' });
}









               console.log(v)
                 // اذا موجود يرسل هذا النص إلى الفرنت اند هصيغة الجيسون يعني هذا الحساب مسجل مسبقاً و يوقف الاسطر الي بعدة

return res.json({ id:"done" })

   
            });

















          // ركوس خاص في تأكيد الطلب واعطاه رقم 

          router.post("/review/:id", async (req, res) => {
            try {
                const v = req.body;
                const b = req.params.id;
                console.log(v.id)
                var decoded = jwt.verify(req.cookies.jwt, 'shhhhh');

                const orderNumber = await getNextOrderNumber(); // دالة ترقيم الطلبات المؤكدة الجديدة

                // إنشاء مثيل جديد من المودل مع ترقيم البيانات
    
               
              const g = await  User.findOne( // هذا انا وضعته لزيادة الامان لكي لا يعدل احتهم من الفحص ويضهر زر اعتماد الطلب ويصدر طلب جديد فأستدعيت هذي من الداتات وتأكدت من رقم الايدي ووضعت شرط بحيث لا يتم التعديل إلا اذا كانة مسوادة
                  { "orders._id": v.id }
                )
                const foundObject =await g.orders.find(item => item.id === v.id); // عشان اجيب الوبجكة الذي يحمل هذا الايدي 
                // console.log("fffffffff")
                // console.log(v.confirming2)
                // console.log("fffffffff")

                if (foundObject.status == "مسودة" && Array.isArray(foundObject.measurement) && foundObject.measurement.length > 0) { // اشترط ان يكون مسودة لكي لايوكون موكد ونزيد نهب رقم طلب جديد
                
           
               


                // تحديث مستخدم معين في مودل User بإضافة البيانات الجديدة إلى حقل الأوامر
                const updatedUser = await User.updateOne(
                    { "orders._id": v.id },
                    { $set: { "orders.$[orderElem].status":'مؤكد',"orders.$[orderElem].status2": 'قيد التصنيع',"orders.$[orderElem].orderNumber": orderNumber } },
                    // { $set: { orders: n } }, // انتبه هنا، لا تحتاج إلى array brackets لأن n هو بالفعل كائن واحد
                    { arrayFilters: [{ "orderElem._id": v.id }], new: true, upsert: true }

                );
                console.log('تمت إضافة البيانات بنجاح:', updatedUser);
        


//==============دالة الترقيم للقياسات بشرط ان يكون الأورد مؤكد======================
// var userId =
var orderId =v.id
const bbbf=   await numberAllMeasurementsForOrder(orderId);
/////==============دالة الترقيم للقياسات بشرط ان يكون الأورد مؤكد======================



                return    res.redirect(`/view/${v.idCustomer}`)   //res.json({ id: "done" });
              }else{
                return    res.redirect(`/review/${v.id}`) 
              }
            } catch (error) {
                console.error('حدث خطأ أثناء إضافة البيانات:', error);
                return res.status(500).json({ error: 'حدث خطأ أثناء إضافة البيانات' });
            }
        });


































            router.get("/measurement/:id",restrictFactoryWorker,checkPermission('add_edit_measurement'), (req, res) => {
              const customerId = req.params.id;
              User.findOne({'orders._id': req.params.id})
                  .then((result1) => {
                      if (result1) {


                        const h =result1

                       
                       const idToFind = req.params.id; // من الرابط id 
                       
                       const foundObject = h.orders.find(item => item.id === idToFind); //  عشان يعطيني البجكت حامل هذا الادي من الداتا
                       
                     
                       
                                     
                       
                             return  res.render('user/measurement',{arrM:foundObject ,moment:moment} )


                          console.log("Found in first query:", result1);
                          return result1; // يمكنك التعامل مع result1 هنا
                      } else {
                          return User.findOne(
                              { "orders.measurement._id": customerId },
                              { "orders.$": 1 }
                          );
                      }
                  })
                  .then((result2) => {
                      if (result2) {

                        const measurement = result2.orders[0].measurement.find(m => m._id.toString() === customerId);
                        console.log(measurement);
                        res.render('user/measurement',{arrM:measurement ,moment:moment} ) // المتغير الثاني حق اداة تغيير شكل اوقت
                    

                          // console.log("Found in second query:", result2);
                          // يمكنك التعامل مع result2 هنا
                      } else {
                          console.log("Not found in either queries");
                      }
                  })
                  .catch((error) => {
                      console.error("Error:", error);
                  });
          });





// رفع قياس الاستركتشر

router.get("/structure-measurement/:id",restrictFactoryWorker,checkPermission('add_edit_measurement'), (req, res) => {
  const customerId = req.params.id;
  User.findOne({'orders._id': req.params.id})
      .then((result1) => {
          if (result1) {


            const h =result1

    
           
           const idToFind = req.params.id; // من الرابط id 
           
           const foundObject = h.orders.find(item => item.id === idToFind); //  عشان يعطيني البجكت حامل هذا الادي من الداتا
           
      
           
                         
           
                 return  res.render('user/structure-measurement',{arrM:foundObject ,moment:moment} )


              console.log("Found in first query:", result1);
              return result1; // يمكنك التعامل مع result1 هنا
          } else {
              return User.findOne(
                  { "orders.measurement._id": customerId },
                  { "orders.$": 1 }
              );
          }
      })
      .then((result2) => {
        //خاص بتعديل
          if (result2) {

            const measurement = result2.orders[0].measurement.find(m => m._id.toString() === customerId);
            console.log(measurement);
            res.render('user/structure-measurement',{arrM:measurement ,moment:moment} ) // المتغير الثاني حق اداة تغيير شكل اوقت
        

              // console.log("Found in second query:", result2);
              // يمكنك التعامل مع result2 هنا
          } else {
              console.log("Not found in either queries");
          }
      })
      .catch((error) => {
          console.error("Error:", error);
      });
});



// رفع قياس الإسكاي لايت 
router.get("/skylight-measurement/:id",restrictFactoryWorker,checkPermission('add_edit_measurement'), (req, res) => {
  const customerId = req.params.id;
  User.findOne({'orders._id': req.params.id})
      .then((result1) => {
          if (result1) {


            const h =result1

      
           const idToFind = req.params.id; // من الرابط id 
           
           const foundObject = h.orders.find(item => item.id === idToFind); //  عشان يعطيني البجكت حامل هذا الادي من الداتا
           

           
                         
           
                 return  res.render('user/skylight-measurement',{arrM:foundObject ,moment:moment} )


              console.log("Found in first query:", result1);
              return result1; // يمكنك التعامل مع result1 هنا
          } else {
              return User.findOne(
                  { "orders.measurement._id": customerId },
                  { "orders.$": 1 }
              );
          }
      })
      .then((result2) => {
        //خاص بتعديل
          if (result2) {

            const measurement = result2.orders[0].measurement.find(m => m._id.toString() === customerId);
            console.log(measurement);
            res.render('user/skylight-measurement',{arrM:measurement ,moment:moment} ) // المتغير الثاني حق اداة تغيير شكل اوقت
        

              // console.log("Found in second query:", result2);
              // يمكنك التعامل مع result2 هنا
          } else {
              console.log("Not found in either queries");
          }
      })
      .catch((error) => {
          console.error("Error:", error);
      });
});



// رفع قياس الابواب

router.get("/doors-measurement/:id",restrictFactoryWorker,checkPermission('add_edit_measurement'), (req, res) => {
  const customerId = req.params.id;
  User.findOne({'orders._id': req.params.id})
      .then((result1) => {
          if (result1) {


            const h =result1

      
           
           const idToFind = req.params.id; // من الرابط id 
           
           const foundObject = h.orders.find(item => item.id === idToFind); //  عشان يعطيني البجكت حامل هذا الادي من الداتا
           

                 return  res.render('user/doors-measurement',{arrM:foundObject ,moment:moment} )


              console.log("Found in first query:", result1);
              return result1; // يمكنك التعامل مع result1 هنا
          } else {
              return User.findOne(
                  { "orders.measurement._id": customerId },
                  { "orders.$": 1 }
              );
          }
      })
      .then((result2) => {
          if (result2) {

            const measurement = result2.orders[0].measurement.find(m => m._id.toString() === customerId);
            console.log(measurement);
            res.render('user/doors-measurement',{arrM:measurement ,moment:moment} ) // المتغير الثاني حق اداة تغيير شكل اوقت
        

              // console.log("Found in second query:", result2);
              // يمكنك التعامل مع result2 هنا
          } else {
              console.log("Not found in either queries");
          }
      })
      .catch((error) => {
          console.error("Error:", error);
      });
});


// ////
// إضافة قياس جديد
router.post("/measurement/:id", restrictFactoryWorker, async (req, res) => {
  try {
    const allPricesData = await Prices.findOne({});
    if (!allPricesData) return res.status(500).json({ error: "بيانات الأسعار غير متوفرة." });

    const v = req.body;
    const decoded = jwt.verify(req.cookies.jwt, 'shhhhh');

    const data = {
      aluminumCode: v.aluminumCode,
      h: parseFloat(v.H),
      w: parseFloat(v.W),
      lip: v.lip,
      prices: allPricesData.price
    };

    const { resultH, resultW, totalMeters, total, price } = calculateResults(data);
    const { E10, F10, G10, H10, I10, J10, M10, N10, Q10, K10, L10, O10, P10 } = motherEquation(data);

    // إعداد تقرير قص الزجاج وإضافة حقل reportTemper
    const glassCuttingReport = calculateValues(v.aluminumCode, v.H, v.W);
    const reportTemper = glassCuttingReport.valueC;

    // إعداد تقرير قص الألمنيوم
    const aluminumCuttingReportData = aluminumCuttingReport(v.aluminumCode, v.H, v.W);

    // إعداد بيانات القياس الجديد
    const newMeasurement = {
      iid: v.iid,
      status: 'مسودة',
      branch: v.branch,
      location: v.location,
      salesEmployeeId: decoded.id,
      aluminumCode: v.aluminumCode,
      aluminumThickness: v.aluminumThickness,
      aluminumSize: v.aluminumSize,
      aluminumColorCode: v.aluminumColorCode,
      glasstype: v.glasstype,
      glassThickness: v.glassThickness,
      glassColorCodeInside: v.glassColorCodeInside,
      glassColorCodeOutside: v.glassColorCodeOutside,
      H: v.H,
      W: v.W,
      designCode: v.designCode,
      insideOrOutside: v.insideOrOutside,
      temper: v.temper,
      lip: v.lip,
      fixed:v.fixed,
      illumination: v.illumination,
      comments: v.comments,
      totalMeters: { H1: resultH, W1: resultW, totalMeters },
      price: { umberOfMeters: totalMeters, price, discount: 0, total, totalWithDiscount: total },
      motherEquation: { E10, F10, G10, H10, I10, J10, M10, N10, Q10, K10, L10, O10, P10 },
      additions: {
        Structure: {
          number: v.StructureNumber || 0,
          price: allPricesData.price.Structure || 0,
          totalPrice: (v.StructureNumber || 0) * (allPricesData.price.Structure || 0),
        },
        Hinges: {
          number: v.HingesNumber || 0,
          price: allPricesData.price.Hinges || 0,
          totalPrice: (v.HingesNumber || 0) * (allPricesData.price.Hinges || 0),
        },
        RollWindow: {
          number: v.RollWindowNumber || 0,
          price: allPricesData.price.RollWindow || 0,
          totalPrice: (v.RollWindowNumber || 0) * (allPricesData.price.RollWindow || 0),
        },
      },
      glassCuttingReport: {
        H: glassCuttingReport.valueB,
        W: glassCuttingReport.valueA,
        reportTemper: reportTemper,
      },
      // aluminumCuttingReport: {
      //   Q4: aluminumCuttingReportData.Q4.toFixed(2),
      //   R4: aluminumCuttingReportData.R4.toFixed(2),
      //   S4: aluminumCuttingReportData.S4.toFixed(2),
      //   T4: aluminumCuttingReportData.T4.toFixed(2),
      //   U4: aluminumCuttingReportData.U4.toFixed(2),
      // }
      
      aluminumCuttingReport: {
        Q4: aluminumCuttingReportData.Q4 !== undefined ? aluminumCuttingReportData.Q4.toFixed(2) : null,
        R4: aluminumCuttingReportData.R4 !== undefined ? aluminumCuttingReportData.R4.toFixed(2) : null,
        S4: aluminumCuttingReportData.S4 !== undefined ? aluminumCuttingReportData.S4.toFixed(2) : null,
        T4: aluminumCuttingReportData.T4 !== undefined ? aluminumCuttingReportData.T4.toFixed(2) : null,
        U4: aluminumCuttingReportData.U4 !== undefined ? aluminumCuttingReportData.U4.toFixed(2) : null,
    }
    


    };

    const user = await User.findOne({ "orders._id": v.iid });
    if (!user) return res.status(404).send('User not found');
    const order = user.orders.id(v.iid);
    if (!order) return res.status(404).send('Order not found');

    let sequenceNumber = order.measurement.length > 0 ? order.measurement[order.measurement.length - 1].sequenceNumber + 1 : 1;
    newMeasurement.sequenceNumber = sequenceNumber;

    await User.updateOne(
      { "orders._id": v.iid },
      { $push: { "orders.$[orderElem].measurement": newMeasurement } },
      { arrayFilters: [{ "orderElem._id": v.iid }] }
    );

    await calculateTotalPrice(v.iid);
    await refreshDiscount({ iid: v.iid, aluminumCodeFront: v.aluminumCode });
    await calculateTotalTempersMeters(v.iid);
    await updateTotal(v.iid);

    res.json({ message: "Measurement added successfully" });
  } catch (error) {
    console.error("حدث خطأ:", error);
    res.status(500).json({ error: "حدث خطأ أثناء إضافة بيانات القياس." });
  }
});


// // تعديل قياس موجود
router.put("/measurement/:id", restrictFactoryWorker, async (req, res) => {
  try {
    const allPricesData = await Prices.findOne({});
    if (!allPricesData) return res.status(500).json({ error: "بيانات الأسعار غير متوفرة." });

    const v = req.body;

    const data = {
      aluminumCode: v.aluminumCode,
      h: parseFloat(v.H),
      w: parseFloat(v.W),
      lip: v.lip,
      prices: allPricesData.price
    };

    const { resultH, resultW, totalMeters, total, price } = calculateResults(data);
    const { E10, F10, G10, H10, I10, J10, M10, N10, Q10, K10, L10, O10, P10 } = motherEquation(data);

    // إعداد تقرير قص الزجاج وإضافة حقل reportTemper
    const glassCuttingReport = calculateValues(v.aluminumCode, v.H, v.W);
    const reportTemper = glassCuttingReport.valueC;

    // إعداد تقرير قص الألمنيوم
    const aluminumCuttingReportData = aluminumCuttingReport(v.aluminumCode, v.H, v.W);

    // إعداد بيانات التحديث
    const updateData = {
      aluminumCode: v.aluminumCode,
      aluminumThickness: v.aluminumThickness,
      aluminumSize: v.aluminumSize,
      aluminumColorCode: v.aluminumColorCode,
      glasstype: v.glasstype,
      glassThickness: v.glassThickness,
      glassColorCodeInside: v.glassColorCodeInside,
      glassColorCodeOutside: v.glassColorCodeOutside,
      H: v.H,
      W: v.W,
      designCode: v.designCode,
      insideOrOutside: v.insideOrOutside,
      temper: v.temper,
      fixed:v.fixed,
      lip: v.lip,
      illumination: v.illumination,
      comments: v.comments,
      totalMeters: { H1: resultH, W1: resultW, totalMeters },
      price: { umberOfMeters: totalMeters, price, discount: 0, total, totalWithDiscount: total },
      motherEquation: { E10, F10, G10, H10, I10, J10, M10, N10, Q10, K10, L10, O10, P10 },
      additions: {
        Structure: {
          number: v.StructureNumber || 0,
          price: v.StructurePrice || 0,
          totalPrice: (v.StructureNumber || 0) * (v.StructurePrice || 0),
        },
        Hinges: {
          number: v.HingesNumber || 0,
          price: v.HingesPrice || 0,
          totalPrice: (v.HingesNumber || 0) * (v.HingesPrice || 0),
        },
        RollWindow: {
          number: v.RollWindowNumber || 0,
          price: v.RollWindowPrice || 0,
          totalPrice: (v.RollWindowNumber || 0) * (v.RollWindowPrice || 0),
        },
      },
      glassCuttingReport: {
        H: glassCuttingReport.valueB,
        W: glassCuttingReport.valueA,
        reportTemper: reportTemper,
      },
      // aluminumCuttingReport: {
      //   Q4: aluminumCuttingReport.Q4.toFixed(2),
      //   R4: aluminumCuttingReport.R4.toFixed(2),
      //   S4: aluminumCuttingReport.S4.toFixed(2),
      //   T4: aluminumCuttingReport.T4.toFixed(2),
      //   U4: aluminumCuttingReport.U4.toFixed(2),
      // }

      aluminumCuttingReport: {
        Q4: aluminumCuttingReportData.Q4 !== undefined ? aluminumCuttingReportData.Q4.toFixed(2) : null,
        R4: aluminumCuttingReportData.R4 !== undefined ? aluminumCuttingReportData.R4.toFixed(2) : null,
        S4: aluminumCuttingReportData.S4 !== undefined ? aluminumCuttingReportData.S4.toFixed(2) : null,
        T4: aluminumCuttingReportData.T4 !== undefined ? aluminumCuttingReportData.T4.toFixed(2) : null,
        U4: aluminumCuttingReportData.U4 !== undefined ? aluminumCuttingReportData.U4.toFixed(2) : null,
    }
    

    };

    // تحديث الحقول في `updateData`
    const updateFields = {};
    Object.keys(updateData).forEach(key => {
      updateFields[`orders.$[outer].measurement.$[inner].${key}`] = updateData[key];
    });

    await User.updateOne(
      { "orders.measurement._id": v.idUrl },
      { $set: updateFields },
      { arrayFilters: [{ "outer.measurement._id": v.idUrl }, { "inner._id": v.idUrl }] }
    );

    // تحديثات إضافية بعد التحديث الأولي
    await calculateTotalPrice(v.iid);
    await refreshDiscount({ iid: v.iid, aluminumCodeFront: v.aluminumCode });
    await calculateTotalTempersMeters(v.iid);
    await updateTotal(v.iid);

    res.json({ message: "Measurement updated successfully" });
  } catch (error) {
    console.error("حدث خطأ:", error);
    res.status(500).json({ error: "حدث خطأ أثناء تحديث بيانات القياس." });
  }
});

// //






//  تم دمج ركوستات البوست التابعة لصفحة المقاس ركوست من رفع قياس جديد والأخر من تعديل القياس 


// router.post("/measurement/:id",restrictFactoryWorker, async (req, res) => {




//   try {
//     // استدعاء بيانات الأسعار
//     const allPricesData = await Prices.findOne({});
    
//     // إذا كنت بحاجة لاستخدام بيانات الأسعار هنا
//     // console.log('بيانات الأسعار:', allPricesData);








//   const v = req.body;
//   console.log(v.aluminumCode)

// /// دالة مجموع الامتار
//   const data = {
//     aluminumCode: v.aluminumCode, // يمكنك استبدال القيم بالقيم الفعلية
//     h: parseFloat(v.H ),
//     w: parseFloat(v.W ),
//     lip:v.lip,
//     prices:allPricesData.price

  
// };








// const { resultH, resultW ,totalMeters,total,price } = calculateResults(data);
// console.log("النتائج:", resultH, resultW ,totalMeters,total,price);

//   // هذا تضرب عدين في بعض و تم انشاها من اجل تطلع اجمال سعر الوحدات ضرب الوحدات في السعر الافتراضي



  

// //// دالة مجموع الامتار///

// /// دالة المعادلات الام
// // let datas ={
// //   H:200,
// //   W:100,
// //   aluminumCode:"ROYAL 2"
  
// //   }
  
//   const { E10, F10 ,G10,H10,I10,J10,M10,N10,Q10,K10,L10,O10,P10 } = motherEquation(data)
  
//   if(F10!=undefined){


//     console.log('قيمة الخلية E10 ', E10);
//     console.log('قيمة الخلية F10 ', F10);
//     console.log('قيمة الخلية G10 ', G10);
//     console.log('قيمة الخلية H10 ', H10);
//     console.log('قيمة الخلية I10 ', I10);
//     console.log('قيمة الخلية J10 ', J10);
//     console.log('قيمة الخلية M10 ', M10);
//     console.log('قيمة الخلية N10 ', N10);
//     console.log('قيمة الخلية Q10 ', Q10);
    
//     console.log('قيمة الخلية K10 ', K10);
//     console.log('قيمة الخلية L10 ', L10);
//     console.log('قيمة الخلية O10 ', O10);
//     console.log('قيمة الخلية P10 ', P10);
//     }else{
//         console.log('قيمة الخلية Q10 ', Q10);
//         console.log('قيمة الخلية E10 ', E10);
//         console.log('قيمة الخلية P10 ', P10);
//     }



// /// دالة المعادلات الام///
  
//   // try {
//     const decoded = jwt.verify(req.cookies.jwt, 'shhhhh');


//     // خاص باترقيم القياسات يعني اذا كان القياس الاخير مرقم فجمع عليه رقم 1 وكتب الترقيم لهاذا القياس واذا كان  غير ذالك فلا تفعل شي
//     const user = await User.findOne({ "orders._id": v.iid });

//     if (!user) {
//         console.log('User not found');
//         return res.status(404).send('User not found');
//     }

//     const order = user.orders.id(v.iid);

//     if (!order) {
//         console.log('Order not found');
//         return res.status(404).send('Order not found');
//     }

//     // إضافة المنطق للترقيم
//     let sequenceNumber = null;
//     if (order.measurement.length > 0) {
//         const lastMeasurement = order.measurement[order.measurement.length - 1];
//         if (lastMeasurement.sequenceNumber && !isNaN(lastMeasurement.sequenceNumber)) {
//             sequenceNumber = lastMeasurement.sequenceNumber + 1;
//         }
//     }



//     ////خاص للترقيم
//     const n = {
//       iid: v.iid,
//       status: 'مسودة',
//       branch: v.branch,
//       location: v.location,
//       salesEmployeeId: decoded.id,
//       salesEmployeeName: '',
//       salesEmployeeUserName: '',
//       aluminumCode: v.aluminumCode,
//       aluminumThickness: v.aluminumThickness,
//       aluminumSize:v.aluminumSize,
//       aluminumColorCode: v.aluminumColorCode,
//       glasstype: v.glasstype,
//       glassThickness: v.glassThickness,
//       glassColorCodeInside: v.glassColorCodeInside,
//       glassColorCodeOutside: v.glassColorCodeOutside,
      

    
//       H: v.H,
//       W: v.W,
//       designCode: v.designCode,
//       insideOrOutside: v.insideOrOutside,
//       temper: v.temper,
//       lip: v.lip,
//       illumination: v.illumination,
//       comments: v.comments,
//       sequenceNumber: sequenceNumber, // إضافة الترقيم
//       totalMeters:{
//         H1: resultH,
//         W1: resultW,
//         totalMeters: totalMeters,
       
//     },

//     price:{ // التسعيرة

//     //   // item: String,

//       umberOfMeters: totalMeters,
//       price: price,
//       discount: 0,
//       total: total,
//       totalWithDiscount:total,


//     //   // totalBeforeTax: Number,
//     //   // tax: Number,
//     //   // totalWithTax: Number,
//       },
//       motherEquation: {

//         E10 :E10,  // الحلق
//         F10 :F10, // الكعب
//         G10 :G10, // الشنكل
//         H10 :H10, // الجنب
//         I10 :I10,// درفة الشبك
//         J10 :J10, //ربل درفة
//         M10 :M10,// زجاج
//         N10 :N10,// شبك حديد 2م
//         Q10 :Q10, // زجاج الثابت
//         K10 :K10, // كفرات درفه 
//         L10 :L10, // كفرات شبك 
//         O10 :O10, //مسكة
//         P10 :P10, // سيلكون المنيوم
       


//    },


//  totalPrice:{ // التسعيرة


//     },

//                             // اضافه الوحدات مثل زيادة الشبابيك في نفس الطاقة
//                           additions:{
//                           // الاستركتشر
//                           Structure: {
//                             number: v.StructureNumber ? v.StructureNumber : 0,
//                             price: allPricesData.price.Structure?allPricesData.price.Structure: 0,
//                             totalPrice: (v.StructureNumber ? v.StructureNumber : 0) * (allPricesData.price.Structure ? allPricesData.price.Structure : 0),
//                           },

//                           // مفصلات
//                           Hinges: {
//                             number: v.HingesNumber ? v.HingesNumber : 0,
//                             price: allPricesData.price.Hinges?allPricesData.price.Hinges: 0,
//                             totalPrice: (v.HingesNumber ? v.HingesNumber : 0) * (allPricesData.price.Hinges ? allPricesData.price.Hinges : 0),
//                           },

//                           // شباك رول
//                           RollWindow: {


//                             number: v.RollWindowNumber ? v.RollWindowNumber : 0,
//                             price: allPricesData.price.RollWindow?allPricesData.price.RollWindow: 0,
//                             totalPrice: (v.RollWindowNumber ? v.RollWindowNumber : 0) * (allPricesData.price.RollWindow ? allPricesData.price.RollWindow : 0),

//                           }

                             
//              }




//     };


//     const nn = {
//       iid: v.iid,
//       status: 'مسودة',
//       branch: v.branch,
//       location: v.location,
//       salesEmployeeId: decoded.id,
//       salesEmployeeName: '',
//       salesEmployeeUserName: '',
//       aluminumCode: v.aluminumCode,
//       aluminumThickness: v.aluminumThickness,
//       aluminumSize:v.aluminumSize,
//       aluminumColorCode: v.aluminumColorCode,
//       glasstype: v.glasstype,
//       glassThickness: v.glassThickness,
//       glassColorCodeInside: v.glassColorCodeInside,
//       glassColorCodeOutside: v.glassColorCodeOutside,
//       H: v.H,
//       W: v.W,
//       designCode: v.designCode,
//       insideOrOutside: v.insideOrOutside,
//       temper: v.temper,
//       lip: v.lip,
//       illumination: v.illumination,
//       comments: v.comments,
      
//       totalMeters:{
//         H1: resultH,
//         W1: resultW,
//         totalMeters: totalMeters,
       
//     },

//     // price:{ // التسعيرة

//     //   // item: String,

//       // umberOfMeters: totalMeters,
//       // price: price,
//       // discount: 0,
//       // total: total,
//       // totalWithDiscount:total,


//     //   // totalBeforeTax: Number,
//     //   // tax: Number,
//     //   // totalWithTax: Number,
//       // },
//       motherEquation: {

//         E10 :E10,  // الحلق
//         F10 :F10, // الكعب
//         G10 :G10, // الشنكل
//         H10 :H10, // الجنب
//         I10 :I10,// درفة الشبك
//         J10 :J10, //ربل درفة
//         M10 :M10,// زجاج
//         N10 :N10,// شبك حديد 2م
//         Q10 :Q10, // زجاج الثابت
//         K10 :K10, // كفرات درفه 
//         L10 :L10, // كفرات شبك 
//         O10 :O10, //مسكة
//         P10 :P10, // سيلكون المنيوم
       


//    },


//  totalPrice:{ // التسعيرة


//     },






//     };

// // هذه الدالة تمسح القديم في الدالتا وتكتب الجديد الي هو توتل القياسات بعد حسابها 
//     async function  updatetotalMotherEquation(resultsArrayAfter,id) {
//       const dgd = await User.updateOne(
//         { "orders._id": id }, 
//         { $unset: { "orders.$[orderElem].motherEquationTotal": "" } }, 
//         { 
//             arrayFilters: [ { "orderElem._id": id } ],
//             new: true 
//         }
//     );
  
  
//       resultsArrayAfter.forEach(async function(result ) {


// // 
//  function sanitizeValue(value) {
//     // إذا كانت القيمة undefined أو null أو ليست رقمًا، نعيد القيمة 0
//     if (value === undefined || value === null || isNaN(Number(value))) {
//         return 0;
//     }
//     // إذا كانت القيمة رقمًا، نعيدها مع تقريبها إلى رقمين عشريين
//     if (typeof value === 'number' || !isNaN(Number(value))) {
//         return Number(value).toFixed(2);
//     }
//     // لأي قيمة أخرى، نعيدها كما هي دون تعديل
//     return value;
// }

// // استخدم الدالة sanitizeValue لتعيين القيم في الكائن k
// var k = {
//     aluminumCode: result.aluminumCode,
//     E10T: sanitizeValue(result.E10T),  // الحلق
//     F10T: sanitizeValue(result.F10T), // الكعب
//     G10T: sanitizeValue(result.G10T), // الشنكل
//     H10T: sanitizeValue(result.H10T), // الجنب
//     I10T: sanitizeValue(result.I10T), // درفة الشبك
//     J10T: sanitizeValue(result.J10T), // ربل درفة
//     M10T: sanitizeValue(result.M10T), // زجاج
//     N10T: sanitizeValue(result.N10T), // شبك حديد 2م
//     Q10T: sanitizeValue(result.Q10T), // زجاج الثابت
//     K10T: sanitizeValue(result.K10T), // كفرات درفه 
//     L10T: sanitizeValue(result.L10T), // كفرات شبك 
//     O10T: sanitizeValue(result.O10T), // مسكة
//     P10T: sanitizeValue(result.P10T), // سيلكون المنيوم

//     E10TF: sanitizeValue(result.E10F),  // الحلق
//     F10TF: sanitizeValue(result.F10F), // الكعب
//     G10TF: sanitizeValue(result.G10F), // الشنكل
//     H10TF: sanitizeValue(result.H10F), // الجنب
//     I10TF: sanitizeValue(result.I10F), // درفة الشبك
//     J10TF: sanitizeValue(result.J10F), // ربل درفة
//     M10TF: sanitizeValue(result.M10F), // زجاج
//     N10TF: sanitizeValue(result.N10F), // شبك حديد 2م
//     Q10TF: sanitizeValue(result.Q10F), // زجاج الثابت
//     K10TF: sanitizeValue(result.K10F), // كفرات درفه 
//     L10TF: sanitizeValue(result.L10F), // كفرات شبك 
//     O10TF: sanitizeValue(result.O10F), // مسكة
//     P10TF: sanitizeValue(result.P10F) // سيلكون المنيوم
// };







//       const vgfg = await User.updateOne(
//         { "orders._id": id }, 
//         { $push: { "orders.$[orderElem].motherEquationTotal": k } }, 
//         { 
//           arrayFilters: [ { "orderElem._id": id } ],
//           new: true 
//         }
  
//       );
//     // }
//     });
  
  
//   }

// // هذه الدالة تمسح القديم في الدالتا وتكتب الجديد الي هو توتل القياسات بعد حسابها //



//     const result1 = await User.findOne({'orders._id': v.idUrl});
//     if (result1 && resultH && resultW && totalMeters) { // حطيت مع التأكد من صحة بينات القياس وانواع الالمنيوم
//       const vgf = await User.updateOne(
//         { "orders._id": v.id }, 
//         { $push: { "orders.$[orderElem].measurement": n } }, 
//         { 
//           arrayFilters: [ { "orderElem._id": v.id } ],
//           new: true 
//         }

//       );


//       // const userId = req.params.id; // استبدلها بالـ userId الذي تريده
//       const orderId = v.iid; // استبدلها بالـ orderId الذي تريده
//        await calculateTotalPrice(orderId); // دالة تحديث مجموع سعر الإضافات




      
// // دالة تحديث الخصم
//       let dataId ={

//         iid:v.id ,
//         // id:,
//             aluminumCodeFront:v.aluminumCode
//         }
//         await refreshDiscount(dataId)

//         await calculateTotalTempersMeters(v.iid)

// // دالة تحديث الخصم//
// await updateTotal(v.iid)// معادلة تحديث الجمالي والضريبة

// //
// let = aluminumCode=v.aluminumCode






// const gg = await User.findOne({'orders._id': v.iid})
//     const h =  gg
//     const idToFind = v.iid; // من الرابط id 

//     const foundObject = h.orders.find(item => item.id === idToFind); //  عشان يعطيني البجكت حامل هذا الادي من الداتا
    
    
//    var {resultsArrayBefore,resultsArrayAfter} = totalMotherEquation(foundObject);
    
//     console.log("Before:",resultsArrayBefore);
    
//     console.log("After:",resultsArrayAfter);
    



//     // measurement._id": v.idUrl

// updatetotalMotherEquation(resultsArrayAfter,v.id)



// //================== هنا معادلة تقرير قص الزجاج السحاب مع رفعها على الداتا===================
// const foundObjectg = foundObject.measurement.pop(); //  عشان يعطيني البجكت حامل هذا الادي من الداتا

// var C4 = foundObjectg.aluminumCode;
// var B10 = foundObjectg.H; // الأرتفاع H
// var C10 = foundObjectg.W; // العرض
// var results = calculateValues(C4, B10, C10); // دالة قص الزجاج
// // console.log("aasswwwwwwwwwwwwwwwwwww",results.valueA,C4); // Output the calculated value of A
// // console.log("resultsthhhhhhhhhhhhh",results.valueB); // Output the calculated value of B


// var glassCuttingReportSchema={
//   H: results.valueB,
//   W: results.valueA,
//   reportTemper: results.valueC, // تقرير عدد امتار التنبر
// }


// const cv = await User.updateOne(
//   { "orders._id": v.id },
//   { $set: { "orders.$[orderElem].measurement.$[lastMeasurement].glassCuttingReport": glassCuttingReportSchema } },
//   {
//     arrayFilters: [
//       { "orderElem._id": v.id },
//       { "lastMeasurement._id": foundObjectg._id }
//     ],
//     new: true
//   }
// );

// //================== هنا معادلة تقرير قص الزجاج السحاب مع رفعها على الداتا===================//


// // ========================تقرير قص الألمنيوم===============================



// let B100 = foundObjectg.H
// let C100= foundObjectg.W
// let M4= foundObjectg.aluminumCode
// const {Q4,R4,S4,T4,U4} = aluminumCuttingReport(M4,B100,C100);// معادلة تقرير قص الألمنيوم
// console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",Q4,R4,S4,T4,U4);

// var aluminumCuttingReportSchema={
//   Q4: Q4.toFixed(2),
//   R4: R4.toFixed(2),
//   S4: S4.toFixed(2),
//   T4: T4.toFixed(2),
//   U4: U4.toFixed(2),
// }


// const cvd = await User.updateOne(
//   { "orders._id": v.id },
//   { $set: { "orders.$[orderElem].measurement.$[lastMeasurement].aluminumCuttingReport": aluminumCuttingReportSchema } },
//   {
//     arrayFilters: [
//       { "orderElem._id": v.id },
//       { "lastMeasurement._id": foundObjectg._id }
//     ],
//     new: true
//   }
// );

// // ========================تقرير قص الألمنيوم===============================//

//     return res.json({ id: "done" });


//            } else if( resultH && resultW && totalMeters) { // حطيت مع التأكد من صحة بينات القياس وانواع الالمنيوم
//       // const updateData =await {};
//       // Object.keys(nn).forEach(key => {
//       //   updateData[`orders.$[outer].measurement.$[inner].${key}`] = nn[key];
//       // });

//       // const y = await User.updateOne(
//       //   { "orders.measurement._id": v.idUrl }, 
//       //   { $set: updateData
//       //     // "orders.$[outer].measurement.$[inner].total": total}
//       //   },
//       //   { 
//       //     arrayFilters: [
//       //       { "outer.measurement._id": v.idUrl },
//       //       { "inner._id": v.idUrl }
//       //     ],
//       //     // new: true 
//       //   }


//       // );

//       console.log("aass",v.idUrl); // Output the calculated value of A




//       const updateData = {};
//       Object.keys(nn).forEach(key => {
//         updateData[`orders.$[outer].measurement.$[inner].${key}`] = nn[key];
//       });
      
//       const y = await User.updateOne(
//         { "orders.measurement._id": v.idUrl }, 
//         { 
//           $set: { 
//             ...updateData,
//             "orders.$[outer].measurement.$[inner].price.total": total
//           }
//         },
//         { 
//           arrayFilters: [
//             { "outer.measurement._id": v.idUrl },
//             { "inner._id": v.idUrl }
//           ]
          
//         }
        
//       );


//       const orderId = v.iid; // استبدلها بالـ orderId الذي تريده
//        await calculateTotalPrice(orderId); // دالة تحديث مجموع سعر الإضافات




// // دالة تحديث الخصم
// let dataIdd ={

//   iid:v.iid ,
//   id:v.idUrl,
//       // aluminumCodeFront:
//   }

//   await calculateTotalTempersMeters(v.iid)


//   await refreshDiscount(dataIdd)
// // دالة تحديث الخصم//


//      await updateTotal(v.iid)// معادلة تحديث الجمالي والضريبة


//       // const k = await User.updateOne(
//       //   { "orders.measurement._id": v.idUrl }, 
//       //   { $set: 
//       //     {"orders.$[outer].measurement.$[inner].price.total": total}
//       //   },
//       //   { 
//       //     arrayFilters: [
//       //       { "outer.measurement._id": v.idUrl },
//       //       { "inner._id": v.idUrl }
//       //     ],
//       //     // new: true 
//       //   }


//       // );
//       // console.log("total:",v.iid)





//       const gg = await User.findOne({'orders._id': v.iid})
//       const h =  gg
//       const idToFind = v.iid; // من الرابط id 
  
//       const foundObject = h.orders.find(item => item.id === idToFind); //  عشان يعطيني البجكت حامل هذا الادي من الداتا
      
      
//      var {resultsArrayBefore,resultsArrayAfter} = totalMotherEquation(foundObject);
      
//       console.log("Before:",resultsArrayBefore);
      
//       console.log("After:",resultsArrayAfter);
      
  
  
  
  
//   updatetotalMotherEquation(resultsArrayAfter,v.iid)




// //================== هنا معادلة تقرير قص الزجاج السحاب مع رفعها على الداتا===================
// const foundObjectgc = foundObject.measurement.find(item => item.id === v.idUrl); //  عشان يعطيني البجكت حامل هذا الادي من الداتا

// // console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",foundObjectgc); // Output the calculated value of B

// var C4 = foundObjectgc.aluminumCode;
// var B10 = foundObjectgc.H; // الأرتفاع H
// var C10 = foundObjectgc.W; // العرض
// var results = calculateValues(C4, B10, C10);
// // console.log("aasswwwwwwwwwwwwwwwwwww",results.valueA,C4); // Output the calculated value of A
// // console.log("resultsthhhhhhhhhhhhh",results.valueB); // Output the calculated value of B


// var glassCuttingReportSchema={
// // glassCuttingReport:{
//   H: results.valueB,
//   W: results.valueA,
//   reportTemper: results.valueC,
// // }
// }

// const cv = await User.updateOne(
//   { "orders._id": v.iid }, 
//   { $set: { "orders.$[orderElem].measurement.$[measurementElem].glassCuttingReport": glassCuttingReportSchema } }, 
//   { 
//     arrayFilters: [ { "orderElem._id": v.iid}, { "measurementElem._id": v.idUrl } ],
//     new: true 
//   }
// );


// //================== هنا معادلة تقرير قص الزجاج السحاب مع رفعها على الداتا===================//



// // ========================تقرير قص الألمنيوم===============================



// let B100 = foundObjectgc.H
// let C100= foundObjectgc.W
// let M4= foundObjectgc.aluminumCode
// const {Q4,R4,S4,T4,U4} = aluminumCuttingReport(M4,B100,C100);// معادلة تقرير قص الألمنيوم
// // console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",Q4,R4,S4,T4,U4);

// var aluminumCuttingReportSchema={
//   Q4: Q4.toFixed(2),
//   R4: R4.toFixed(2),
//   S4: S4.toFixed(2),
//   T4: T4.toFixed(2),
//   U4: U4.toFixed(2),
// }



// const cvx = await User.updateOne(
//   { "orders._id": v.iid }, 
//   { $set: { "orders.$[orderElem].measurement.$[measurementElem].aluminumCuttingReport": aluminumCuttingReportSchema } }, 
//   { 
//     arrayFilters: [ { "orderElem._id": v.iid}, { "measurementElem._id": v.idUrl } ],
//     new: true 
//   }
// );



// //// ========================تقرير قص الألمنيوم===============================//


//       if (y) {

//         console.log("تم تحديث بيانات القياس بنجاح:", y);
//         res.json({ id: "done" });
//       } else {
//         console.log("لم يتم العثور على القياس في أي من الاستعلامات");
//       }
//     }

  

//   } catch (error) {
//     console.error("حدث خطأ:", error);
//     res.status(500).json({ error: "حدث خطأ أثناء تحديث بيانات القياس." });
//   }
// });







// //// تم دمج ركوستات البوست التابعة لصفحة المقاس ركوست من رفع قياس جديد والأخر من تعديل القياس // // 

















router.delete('/review/:measurementId-:orderId', requireAuth,restrictFactoryWorker, async (req, res) => {
  console.log(`Request received for measurementId: ${req.params.measurementId}, orderId: ${req.params.orderId}`);
  try {
      const { measurementId, orderId } = req.params;

      const user = await User.findOne({ 'orders._id': orderId });
      if (!user) {
          return res.status(404).send('User not found');
      }

      const order = user.orders.id(orderId);
      if (!order) {
          return res.status(404).send('Order not found');
      }

      const measurement = order.measurement.id(measurementId);
      if (!measurement) {
          return res.status(404).send('Measurement not found');
      }

      console.log('Current measurement before toggle:', measurement);

      if (order.status === 'مؤكد') {
          measurement.delete = !measurement.delete;
          console.log('Toggled delete status:', measurement.delete);
      } else {
          order.measurement.pull(measurementId);
          console.log('Measurement removed:', measurementId);
      }

      await User.findOneAndUpdate(
          { 'orders._id': orderId },
          { $set: { 'orders.$.measurement': order.measurement } }
      );

      console.log(`Updated measurement for order id: ${orderId}`);
      console.log('Updated order measurements:', order.measurement);

      let dataIdd = {
          iid: orderId,
          aluminumCodeFront: measurement.aluminumCode
      };

      await calculateTotalPrice(orderId); // تحديث  مجموع قياسات الشبابيك الضافيه 


      await calculateTotalTempersMeters(orderId); // دالة السكريت


      await refreshDiscount(dataIdd);

      await updateTotal(orderId);

      const gg = await User.findOne({ 'orders._id': orderId });
      const foundObject = gg.orders.find(item => item._id.equals(orderId));

      var { resultsArrayBefore, resultsArrayAfter } = totalMotherEquation(foundObject);
      console.log("Before:", resultsArrayBefore);
      console.log("After:", resultsArrayAfter);

      await updatetotalMotherEquation(resultsArrayAfter, orderId);

      const finalUser = await User.findOne({ 'orders._id': orderId });
      const finalOrder = finalUser.orders.id(orderId);
      const finalMeasurement = finalOrder.measurement.id(measurementId);
      console.log('Final measurement after all updates:', finalMeasurement);

      res.status(200).json({ message: 'Measurement delete status updated successfully.' });
  } catch (error) {
      console.error('Error updating measurement:', error);
      res.status(500).send('An error occurred while updating the measurement.');
  }
});


























            router.get("/review/:id",requireAuth,restrictFactoryWorker, async (req, res) => {
              // User.findById(req.params.id) // هذي الادة من منقز لاستخراج ابجكت معين من الداتا ممكن تكتب الايري على طول بس حن استخرجناه من الرابط بهذي العبارة واضفنا اسم المتغير الي اضفنه فوق
              // User.findOne({_id:req.params.id}) // عشان نحصل اسم المستخدم الي مسجل الدخول عشان نبحث عن الاري الي داخلة
              User.findOne({'orders._id': req.params.id})

              // User.findById(req.params.id, 'orders._id' )
              .then((result)=>{
                // console.log(req.params.id)
                // console.log("++++++++++++++++++++++++++")
                // console.log(result)
                // console.log("++++++++++++++++++++++++++")

                const h =  result

              
               console.log("++++++++++++++++++++++++++")

      

        
               const idCustomer = h.id // ارسلت له ايدي العميل لاني احتجة في الفرنت اند

              const idToFind = req.params.id; // من الرابط id 
              const foundObject = h.orders.find(item => item.id === idToFind); //  عشان يعطيني البجكت حامل هذا الادي من الداتا




                    console.log("++++++++++++++++++++++++++")
                               


                res.render('user/review',{arrR:foundObject,idCustomer:idCustomer ,moment:moment} ) // المتغير الثاني حق اداة تغيير شكل اوقت
              }).catch((err)=>{
                  console.log(err)
         })
             

            });





    // GRT Reports
    



    // مجموع الأمتار
    router.get("/total-meters/:id",restrictFactoryWorker, (req, res) => {
      User.findOne({'orders._id': req.params.id})

      // User.findById(req.params.id, 'orders._id' )
      .then((result)=>{
        // console.log(req.params.id)
        // console.log("++++++++++++++++++++++++++")
        // console.log(result)
        // console.log("++++++++++++++++++++++++++")

        const h =  result

      
       console.log("++++++++++++++++++++++++++")




       const idCustomer = h.id // ارسلت له ايدي العميل لاني احتجة في الفرنت اند

      const idToFind = req.params.id; // من الرابط id 
      const foundObject = h.orders.find(item => item.id === idToFind); //  عشان يعطيني البجكت حامل هذا الادي من الداتا




            console.log("++++++++++++++++++++++++++")
                       


        res.render('user/total-meters',{arrR:foundObject,idCustomer:idCustomer ,allData:h,moment:moment} ) // المتغير الثاني حق اداة تغيير شكل اوقت
      }).catch((err)=>{
          console.log(err)
 })
     

    });
  



// موقت واحذف فقط لرفع اسعار القطاعات في الداتا

router.post('/total-meters/:id', requireAuth,restrictFactoryWorker, async function (req, res, next) {
  try {
      const newUser = await commands.create({
          price: {
              slidingD10: 530,
              slidingD10p: 500,
              slidingD12: 550,
              slidingS: 300,
              interruptT: 650,
              interrupt: 650,
              fixedD10: 450,
              fixedD4: 300,
              fixedS10: 350,
              fixedS4: 300,
              sketchureSmart: 850,
              sketchureFortex: 1000,
              GOLF10: 550,
              GOLF12: 600,
              ROYAL2: 700,
              ROYAL3: 1000,
              DoorD10: 850,
              SlicedDoor: 400,
              SketchureFortex: 250,
              SKYLIGHT: 1100
          },
          createdAt: new Date()
      });

      console.log('User created successfully:', newUser);
      res.status(201).json({ message: 'تم إنشاء المستخدم بنجاح', newUser });
  } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ error: 'حدث خطأ أثناء إنشاء المستخدم' });
  }
});


   // //POST  Level 3 // ///











    



       // تقرير السعر
    router.get("/price/:id",restrictFactoryWorker,checkPermission('price'), (req, res) => {
        User.findOne({'orders._id': req.params.id})
        // 
      
      .then((result)=>{
        

        const h =  result

       const idCustomer = h.id // ارسلت له ايدي العميل لاني احتجة في الفرنت اند

      const idToFind = req.params.id; // من الرابط id 
      const foundObject = h.orders.find(item => item.id === idToFind); //  عشان يعطيني البجكت حامل هذا الادي من الداتا

// console.log(req.params.id)
      // updateTotal(req.params.id)// معادلة تحديث الجمالي والضريبة



        res.render('user/price',{allData:h, arrR:foundObject,idCustomer:idCustomer ,moment:moment} ) // المتغير الثاني حق اداة تغيير شكل اوقت
        // res.render('user/price',{arrR:result ,moment:moment} ) // المتغير الثاني حق اداة تغيير شكل اوقت
      }).catch((err)=>{
          console.log(err)
 })
     

    });














/////////////////////////////
 
  router.post('/pricexx/:id', requireAuth,restrictFactoryWorker, async function (req, res, next) {
    const v = await req.body
    console.log(v.total)
      try {

        let iid = v.iid
        const findDate = await  User.findOne({'orders._id': iid})

            const h =  findDate
    
    
          //  let indexVariable = `orders.$[orderElem].${"1"}.price.discount`
          const foundObject = await h.orders.find(item => item.id === iid); //  عشان يعطيني البجكت حامل هذا الادي من الداتا
          let pp = 0 // عدد المطلبات الي نفس الاسم عشان يقسمها عليهم
          let hhh = v.discount // المبلغ 
          let l = v.aluminumCode

          foundObject.measurement.forEach(async (item,index) => {
            if(item.aluminumCode===l){
              pp++
   
            // updateTotal(v.iid)// معادلة تحديث الجمالي والضريبة
          }
          })
          let to=hhh/pp //الخصم ناقص عدد القياسات المتشابهه في اسم القطاع
         let tot = v.total/pp // اجمالي السعر لكل القطاعات المتشابها تقسيم عدلدها
         let y = tot-to
         

console.log(to)


////////////////
        const filter = {
            "orders.measurement.aluminumCode": v.aluminumCode
        };
    
        const update = { $set: { 
          "orders.$[orderElem].measurement.$[elem].price.discount": to,
          "orders.$[orderElem].measurement.$[elem].price.totalWithDiscount": y,

      
      } };
    
        const options = {
            arrayFilters: [{ "elem.aluminumCode": v.aluminumCode },
            { "orderElem._id": v.iid }
          ],
            multi: true
        };

    
        const result = await User.updateMany(filter, update, options);
        console.log('تم تحديث الوثائق بنجاح:', result);
// /////////////



   



        // updateTotal(iid)
           await updateTotal(v.iid)// معادلة تحديث الجمالي والضريبة

        res.redirect(`/price/${v.iid}`);
        // res.redirect(`/price/65fb082c7f80673a1fcc2a15`);


    } catch (error) {
        console.error('حدث خطأ أثناء تحديث الوثائق:', error);
        // Handle error
    }


       


});
  



// ركوست إضافة خصم

router.post('/discount/:id', requireAuth, restrictFactoryWorker, async function (req, res, next) {
  // const orderId = req.params.id; // الحصول على معرف الطلب من مسار URL
  // const { discount } = req.body; // الحصول على القيمة الجديدة للخصم من جسم الطلب
  const v =  req.body
  let orderId = v.iid
  try {
      // البحث عن الطلب وتحديث حقل الخصم
      const user = await User.findOneAndUpdate(
          { 'orders._id': orderId }, // البحث عن الطلب بالـ id داخل القائمة
          { $set: { 'orders.$.totalPrice.Discount': v.discount } }, // التعديل على الحقل
          { new: true } // للحصول على المستند المعدل
      );

      if (user) {
          // استدعاء الدالة updateTotal بشكل متزامن بعد تحديث الخصم
          await updateTotal(orderId);

          res.redirect(`/price/${orderId}`);
      } else {
          res.status(404).json({ message: 'لم يتم العثور على الطلب.' });
      }
  } catch (error) {
      console.error('حدث خطأ أثناء التعديل:', error);
      res.status(500).json({ message: 'حدث خطأ أثناء التعديل.', error });
  }
});



// ركوست تعديل السعر


router.post('/edit-price/:id', requireAuth, restrictFactoryWorker, async function (req, res, next) {
  // const orderId = req.params.id; // الحصول على معرف الطلب من مسار URL
  // const { discount } = req.body; // الحصول على القيمة الجديدة للخصم من جسم الطلب
  const v =  req.body
  let orderId = v.iid
  const measurementId = v.id; // الحصول على معرف القياس من مسار URL
  const  price  = v.price; // الحصول على القيمة الجديدة للسعر من جسم الطلب
  const totalMeters=v.totalMeters
  // const total = price  * totalMeters;
  const total = price?price* totalMeters:0 ;

  try {
    console.log()

    console.log(totalMeters)
      // البحث عن الطلب وتحديث حقل price داخل القياس المحدد
      const user = await User.findOneAndUpdate(
          { 'orders._id': orderId, 'orders.measurement._id': measurementId }, // البحث عن الطلب والقياس
          { $set: { 
            'orders.$[order].measurement.$[measurement].price.price': price?price:0 ,
          'orders.$[order].measurement.$[measurement].price.total': total
          } }, // التعديل على الحقل
          { 
              arrayFilters: [
                  { 'order._id': orderId },
                  { 'measurement._id': measurementId }
              ],
              new: true // للحصول على المستند المعدل
          }
      );


      if (user) {
          // استدعاء الدالة updateTotal بشكل متزامن بعد تحديث الخصم
          await updateTotal(orderId);

          res.redirect(`/price/${orderId}`);
      } else {
          res.status(404).json({ message: 'لم يتم العثور على الطلب.' });
      }
  } catch (error) {
      console.error('حدث خطأ أثناء التعديل:', error);
      res.status(500).json({ message: 'حدث خطأ أثناء التعديل.', error });
  }
});













    // تقرير قص الزجاج

//     router.get("/glass-cutting/:id", (req, res) => {
//       User.findOne({'orders._id': req.params.id})

      
//       .then((result)=>{
       

//         const h =  result

//        const idCustomer = h.id // ارسلت له ايدي العميل لاني احتجة في الفرنت اند

//       const idToFind = req.params.id; // من الرابط id 
//       const foundObject = h.orders.find(item => item.id === idToFind); //  عشان يعطيني البجكت حامل هذا الادي من الداتا

//         res.render('user/glass-cutting',{arrR:foundObject,idCustomer:idCustomer ,moment:moment} ) // المتغير الثاني حق اداة تغيير شكل اوقت
//       }).catch((err)=>{
//           console.log(err)
//  })
     

//     });

router.get("/glass-cutting/:id",restrictFactoryWorker,checkPermission('manufacturing_reports'), async (req, res) => {
  try {
      console.log("Request ID:", req.params.id);
      
      // البحث عن المستخدم باستخدام معرف الطلب
      const result = await User.findOne({ 'orders._id': req.params.id });
      
      if (!result) {
          console.log("No user found with the given order ID using orders._id");

          // البحث عن المستخدمين وإظهار جزء من البيانات لتصحيح الأخطاء
          const allUsers = await User.find({}, { orders: 1 }).lean();
          allUsers.forEach(user => {
              console.log("User ID:", user._id);
              user.orders.forEach(order => {
                  console.log("Order ID:", order._id);
                  order.measurement.forEach(measurement => {
                      console.log("Measurement ID:", measurement._id);
                  });
              });
          });

          return res.status(404).send('Order not found');
      }

      const h = result;
      const idCustomer = h._id; // معرف العميل
      console.log("User ID:", idCustomer);
      
      const orderId = req.params.id; // معرف الطلب من الرابط
      const foundOrder = h.orders.find(order => order._id.toString() === orderId);
      
      if (!foundOrder) {
          console.log("No order found with the given order ID in the orders");
          return res.status(404).send('Order not found');
      }
      
      const foundMeasurement = foundOrder.measurement;
      console.log("Found Measurements:", foundMeasurement);

      // جلب الفنيين من قاعدة البيانات بدور factoryWorker
      const technicians = await AuthUser.find({ role: 'factoryWorker' });
      console.log("Technicians:", technicians);

      res.render('user/glass-cutting', { arrR: foundMeasurement, idCustomer: idCustomer, foundOrder: foundOrder, technicians: technicians,allData:h, moment: moment });
  } catch (err) {
      console.log(err);
      res.status(500).send('Server Error');
  }
});




router.post("/glass-cutting/assign",restrictFactoryWorker, async (req, res) => {
    const { idCustomer, orderId, technicianId, taskType } = req.body;
    let { selectedMeasurements } = req.body;

    try {
        const user = await User.findOne({ _id: idCustomer });
        if (user) {
            const order = user.orders.id(orderId);
            if (!order) {
                return res.status(404).send('Order not found');
            }

            // تأكد من أن selectedMeasurements هو مصفوفة
            if (!Array.isArray(selectedMeasurements)) {
                selectedMeasurements = [selectedMeasurements];
            }

            selectedMeasurements.forEach(measurementId => {
                const measurement = order.measurement.id(measurementId);
                if (measurement) {
                    if (taskType === 'cutting') {
                        measurement.cuttingTechnicianGlass = technicianId;
                        measurement.cuttingStatusGlass = false;
                    } else if (taskType === 'double') {
                        measurement.assemblyTechnicianGlass = technicianId;
                        measurement.assemblyStatusGlass = false;
                    }
                }
            });

            await user.save();
            res.redirect(`/glass-cutting/${orderId}`);
        } else {
            res.status(404).send('User not found');
        }
    } catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
    }
});




router.post("/glass-cutting/update-status", async (req, res) => {
  const { idCustomer, orderId, measurementId, taskType } = req.body;

  try {
      const user = await User.findOne({ _id: idCustomer });
      if (user) {
          const order = user.orders.id(orderId);
          if (!order) {
              return res.status(404).send('Order not found');
          }

          const measurement = order.measurement.id(measurementId);
          if (measurement) {
              if (taskType === 'cutting') {
                  measurement.cuttingStatusGlass = !measurement.cuttingStatusGlass;
              } else if (taskType === 'double') {
                  measurement.assemblyStatusGlass = !measurement.assemblyStatusGlass;
              }
          }

          await user.save();
          res.redirect(`/glass-cutting/${orderId}`);
      } else {
          res.status(404).send('User not found');
      }
  } catch (err) {
      console.log(err);
      res.status(500).send('Server Error');
  }
});








// هذا لتعدل حالة القياس من يوزر عامل المصنع لحالة القص والدبل للقزاز

router.post("/glass-cutting/update-status-glass-cutting-and-glass-double", async (req, res) => {
  const { orderId, measurementId, taskType } = req.body;

  try {
      const user = await User.findOne({ "orders._id": orderId });
      if (!user) {
          return res.status(404).send('Order not found');
      }

      const order = user.orders.id(orderId);
      if (!order) {
          return res.status(404).send('Order not found within user');
      }

      const measurement = order.measurement.id(measurementId);
      if (measurement) {
          if (taskType === 'cutting') {
              measurement.cuttingStatusGlass = !measurement.cuttingStatusGlass;
          } else if (taskType === 'double') {
              measurement.assemblyStatusGlass = !measurement.assemblyStatusGlass;
          }

          await user.save();
          res.redirect(`/glass-cutting/${orderId}`);
      } else {
          res.status(404).send('Measurement not found');
      }
  } catch (err) {
      console.log(err);
      res.status(500).send('Server Error');
  }
});









// هذا لتعديل حلة القياس من حساب عامل المصنع حالة القص وحالة التجميع


router.post("/aluminum-cutting/update-status-aluminum-cutting-and-aluminum-assembly", async (req, res) => {
  const { orderId, measurementId, taskType } = req.body;

  try {
      const user = await User.findOne({ "orders._id": orderId });
      if (!user) {
          return res.status(404).send('Order not found');
      }

      const order = user.orders.id(orderId);
      if (!order) {
          return res.status(404).send('Order not found within user');
      }

      const measurement = order.measurement.id(measurementId);
      if (measurement) {
          if (taskType === 'cutting') {
              measurement.cuttingStatus = !measurement.cuttingStatus;
          } else if (taskType === 'assembly') {
              measurement.assemblyStatus = !measurement.assemblyStatus;
          }

          await user.save();
          res.redirect(`/aluminum-cutting/${orderId}`);
      } else {
          res.status(404).send('Measurement not found');
      }
  } catch (err) {
      console.log(err);
      res.status(500).send('Server Error');
  }
});












    // تقرير قص الألمنيوم



//     router.get("/aluminum-cutting/:id", (req, res) => {
//       User.findOne({'orders._id': req.params.id})

      
//       .then((result)=>{
       

//         const h =  result

//        const idCustomer = h.id // ارسلت له ايدي العميل لاني احتجة في الفرنت اند

//       const idToFind = req.params.id; // من الرابط id 
//       const foundObject = h.orders.find(item => item.id === idToFind); //  عشان يعطيني البجكت حامل هذا الادي من الداتا

//         res.render('user/aluminum-cutting',{arrR:foundObject,idCustomer:idCustomer ,moment:moment} ) // المتغير الثاني حق اداة تغيير شكل اوقت
//       }).catch((err)=>{
//           console.log(err)
//  })
     

//     });




router.get("/aluminum-cutting/:id",restrictFactoryWorker,checkPermission('manufacturing_reports'), async (req, res) => {
  try {
      console.log("Request ID:", req.params.id);
      
      // البحث عن المستخدم باستخدام معرف الطلب
      const result = await User.findOne({ 'orders._id': req.params.id });
      
      if (!result) {
          console.log("No user found with the given order ID using orders._id");

          // البحث عن المستخدمين وإظهار جزء من البيانات لتصحيح الأخطاء
          const allUsers = await User.find({}, { orders: 1 }).lean();
          allUsers.forEach(user => {
              console.log("User ID:", user._id);
              user.orders.forEach(order => {
                  console.log("Order ID:", order._id);
                  order.measurement.forEach(measurement => {
                      console.log("Measurement ID:", measurement._id);
                  });
              });
          });

          return res.status(404).send('Order not found');
      }

      const h = result;
      const idCustomer = h._id; // معرف العميل
      console.log("User ID:", idCustomer);
      
      const orderId = req.params.id; // معرف الطلب من الرابط
      const foundOrder = h.orders.find(order => order._id.toString() === orderId);
      
      if (!foundOrder) {
          console.log("No order found with the given order ID in the orders");
          return res.status(404).send('Order not found');
      }
      
      const foundMeasurement = foundOrder.measurement;
      console.log("Found Measurements:", foundMeasurement);

      // جلب الفنيين من قاعدة البيانات بدور factoryWorker
      const technicians = await AuthUser.find({ role: 'factoryWorker' });
      console.log("Technicians:", technicians);

      res.render('user/aluminum-cutting', { arrR: foundMeasurement,allData:h, idCustomer: idCustomer, foundOrder: foundOrder, technicians: technicians, moment: moment });
  } catch (err) {
      console.log(err);
      res.status(500).send('Server Error');
  }
});




router.post("/aluminum-cutting/assign",restrictFactoryWorker, async (req, res) => {
    const { idCustomer, orderId, technicianId, taskType } = req.body;
    let { selectedMeasurements } = req.body;

    try {
        const user = await User.findOne({ _id: idCustomer });
        if (user) {
            const order = user.orders.id(orderId);
            if (!order) {
                return res.status(404).send('Order not found');
            }

            // تأكد من أن selectedMeasurements هو مصفوفة
            if (!Array.isArray(selectedMeasurements)) {
                selectedMeasurements = [selectedMeasurements];
            }

            selectedMeasurements.forEach(measurementId => {
                const measurement = order.measurement.id(measurementId);
                if (measurement) {
                    if (taskType === 'cutting') {
                        measurement.cuttingTechnician = technicianId;
                        measurement.cuttingStatus = false;
                    } else if (taskType === 'assembly') {
                        measurement.assemblyTechnician = technicianId;
                        measurement.assemblyStatus = false;
                    }
                }
            });

            await user.save();
            res.redirect(`/aluminum-cutting/${orderId}`);
        } else {
            res.status(404).send('User not found');
        }
    } catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
    }
});





router.post("/aluminum-cutting/update-status",restrictFactoryWorker, async (req, res) => {
  const { idCustomer, orderId, measurementId, taskType } = req.body;

  try {
      const user = await User.findOne({ _id: idCustomer });
      if (user) {
          const order = user.orders.id(orderId);
          if (!order) {
              return res.status(404).send('Order not found');
          }

          const measurement = order.measurement.id(measurementId);
          if (measurement) {
              if (taskType === 'cutting') {
                  measurement.cuttingStatus = !measurement.cuttingStatus;
              } else if (taskType === 'assembly') {
                  measurement.assemblyStatus = !measurement.assemblyStatus;
              }
          }

          await user.save();
          res.redirect(`/aluminum-cutting/${orderId}`);
      } else {
          res.status(404).send('User not found');
      }
  } catch (err) {
      console.log(err);
      res.status(500).send('Server Error');
  }
});










// تقرير السكريت

router.get("/report-temper/:id",restrictFactoryWorker,checkPermission('manufacturing_reports'), (req, res) => {
  User.findOne({'orders._id': req.params.id})

  
  .then((result)=>{
   

    const h =  result

   const idCustomer = h.id // ارسلت له ايدي العميل لاني احتجة في الفرنت اند

  const idToFind = req.params.id; // من الرابط id 
  const foundObject = h.orders.find(item => item.id === idToFind); //  عشان يعطيني البجكت حامل هذا الادي من الداتا

    res.render('user/report-temper',{allData:h,arrR:foundObject,idCustomer:idCustomer ,moment:moment} ) // المتغير الثاني حق اداة تغيير شكل اوقت
  }).catch((err)=>{
      console.log(err)
})
 

});






// تقرير مجموع المواد



router.get("/total-materials/:id",restrictFactoryWorker, (req, res) => {
  User.findOne({'orders._id': req.params.id})

  
  .then((result)=>{
   

    const h =  result

   const idCustomer = h.id // ارسلت له ايدي العميل لاني احتجة في الفرنت اند

  const idToFind = req.params.id; // من الرابط id 
  const foundObject = h.orders.find(item => item.id === idToFind); //  عشان يعطيني البجكت حامل هذا الادي من الداتا

    res.render('user/total-materials',{arrR:foundObject,idCustomer:idCustomer ,allData:h,moment:moment} ) // المتغير الثاني حق اداة تغيير شكل اوقت
  }).catch((err)=>{
      console.log(err)
})
 

});















  
  //POST    Level 1 اكواد كلها 
                    //add.html هذا عشان ناخذ المدخلات من صفحة اشاء عميل جديد 
  
    router.post('/user/add.html',requireAuth,restrictFactoryWorker,async (req, res) => { // وكتبنا نفس الأسماء في ملف الاسكيما name="" حطينا المسار الي يرسل منه الركوست طبعنا الفور هذا داخلة الفرغات الي نعبيها طبعا سمينا كل واحد فيه  action="/user/add.html" نوع الركوست وفي   method="post"  لو تلاحظ حطينا حطينا في  <form  action="/user/add.html" method="post" class="mx-0 row gx-3 gy-4 mt-3"> بهذي الطريقة  add طبعاً هنا خطوة جداً مهمه المسار الي موجد كتبناه في ملف 
    // console.log(req.body)
    var decoded = jwt.verify(req.cookies.jwt, 'shhhhh'); // لمعرفة الأيدي من التوكن عشان نحطة في البحث بال اي دي تحت عشان نعرف العملاء الي تحت اسم هذا المستخدم

    // const user = new User(req.body); // طبعاً هذا الكلاس موجود كمتغير فوق يربطنا مع ملف الاسكيما اتوقع معناه من ادالة المنقوز بمعنا رح قارن النبوت مع الاسكيما ورتبها مثل السترنق حطة استرنق والنمر حطه نمبر لأن جربة وخلفة النيم في الانبوت عن الاسكيما فما رفعة لدات ورفع المتطابقة فقط 
    // user.save() // يعني احفظها في اداتا
    // User.create(req.body) // هذا الطريقة اختصار عن السطرين الي فوق بدون ماتساوي متغير وبعده تكتب سيف على طول كذا
      // هذي الي الي فوق الكريييت نستخدمها اذا نبغى نضيف داتا جدية  بس اذا نبغى نعدل على داتا موجدودة نستخدم الابديت 
      // AuthUser.updateOne({_id: decoded.id},{customerInfo: req.body}) //  استخدمنا ابديت عشان بعندل على العملاء المرتبطين بهذا اليوزر فهي داتا واحد تحتاج إلى تعديل فقط وليسا اضافة بالكرييت 
      // راح تواجنا مشكلة لو سونا نفس السطر الي فوق بيضيف اول مره عادلي بس اذا بتضيف عميل ثاني راح تواجهنا مشكلة انه بيعدل العميل السابق بالعميل الجديد لذالك يوجد حل باستخدام البش مثل السطر التالي
      // AuthUser.updateOne({_id: decoded.id},{$push:{customerInfo: req.body}}) // كلمة بش هذي مهمه يعين ضف على  على الي موجود ما هو تستبدل 
      // الغية السطر الي فوق عشان احط وقت الانشاء تحت ولاكن هناك مشكلة وقت التعديد على العميل وحليت المشكلة في ركوست التعديل تحت هذا الدرس 13 المستوى 3






      // AuthUser.updateOne({_id: decoded.id},{$push:
      //   {customerInfo: 
      //     {
      //       firstName: req.body.firstName,
      //       lastName: req.body.lastName,
      //       email: req.body.email,
      //       phoneNumber: req.body.phoneNumber,
      //       age: req.body.age,
      //       country: req.body.country,
      //       gender: req.body.gender,
      //       createdAt:new Date()
      //     }
      //   }}) // كلمة بش هذي مهمه يعين ضف على  على الي موجود ما هو تستبدل 




        // console.log(req.body)

                                          let result= await User.create(req.body)
                                            try{
                                              console.log(result)
                                              // res.render("/home" ) // هذا يطبع
                                              res.redirect('/home') // هذا يحولك
                                             }
                                              catch(err){
                                              console.log(err)
                                            }
                                          
                                          })

  //   .then(()=>{
  //     res.redirect("/user/add.html") // بعد ما تخلص حولني على هذا الرابط طبعا الرابط الموجود هو نفسه رابط الصفحة

  //   }).catch((err)=>{
  //     console.log(err)
  //   })
  
  // })
  






  
  // البحث
  
  router.post('/search',requireAuth,restrictFactoryWorker, (req, res) => { // وكتبنا نفس الأسماء في ملف الاسكيما name="" حطينا المسار الي يرسل منه الركوست طبعنا الفور هذا داخلة الفرغات الي نعبيها طبعا سمينا كل واحد فيه  action="/user/add.html" نوع الركوست وفي   method="post"  لو تلاحظ حطينا حطينا في  <form  action="/user/add.html" method="post" class="mx-0 row gx-3 gy-4 mt-3"> بهذي الطريقة  add طبعاً هنا خطوة جداً مهمه المسار الي موجد كتبناه في ملف 
    console.log("5555555555555555555555555555555555555")
    const inputSearch =req.body.searchText.trim() // ترم هذي الي في الاخير عشان تحذف المسافات من البداو والنهاية
    //  هذا مصدر البحث من قاعدة البيانات للمزيد من الرموز 
    // User.find({ age: 24 })//يعني ابحثلي عن الي عمره كذا
    // User.find({ age: {$gt: 24} })//Age > 24
    // User.find({ phoneNumber: {$gte: inputSearch} })//Age >= 24
    // console.log(req.body.searchText)
    var decoded = jwt.verify(req.cookies.jwt, 'shhhhh'); // لمعرفة الأيدي من التوكن عشان نحطة في البحث بال اي دي تحت عشان نعرف العملاء الي تحت اسم هذا المستخدم

    // User.find({  $or: [{ phoneNumber: {$gte: inputSearch} },{firstName: inputSearch}, {lastName: inputSearch}, {age: inputSearch}]  }) // ابحث عن هذا او هذا
   
    AuthUser.findOne({_id:decoded.id}) // عشان نحصل اسم المستخدم الي مسجل الدخول عشان نبحث عن الاري الي داخلة
    .then((result)=>{
      console.log(result)

     const searchCustomers = result.customerInfo.filter((item) =>{ // فلتر يمر على الاري ويطبق الاكواد الي تحت 
      return ( item.firstName.includes(inputSearch) || // اداة من الجافا يعني لف على النص وشف هذي الكلمة موجدة او لا طبعا هنا يبحث عن الفرست نيم includes طبعا هذا 
       item.lastName.includes(inputSearch) || // هنا يبحث عن الست نيم
       item.phoneNumber.includes(inputSearch) // هنا نبحث في رقم الجوال 
       );
     })

      res.render("user/search",  {arr:searchCustomers , moment:moment } )  }) //html نرسلة لصفحة 
      
      .catch((err)=>{
      console.log(err)
    })
  
  })
  
  
              //POST    Level 2
  
                            // sign up

        


  



// تسجيل الدخول
router.post("/login", async (req, res) => {
  try {
    const loginUser = await AuthUser.findOne({ userName: req.body.userName });

    if (!loginUser) {
      return res.json({ notFoundUser: "Username not found, try to sign up" });
    } else {
      const match = await bcrypt.compare(req.body.password, loginUser.password);
      if (match) {
        const token = jwt.sign(
          {
            id: loginUser._id,
            userName: loginUser.userName,
            name: loginUser.name,
            role: loginUser.role
          },
          "shhhhh"
        );

        res.cookie("jwt", token, { httpOnly: true, maxAge: 86400000 });
console.log(loginUser.role)
// console.log("gggggggggggvvvvvvvvv")
        if (loginUser.role === 'factoryWorker') {
          return res.json({ redirectUrl: '/workerPage' });
        } else {
          return res.json({ redirectUrl: '/home' });
        }
      } else {
        return res.json({ passwordError: "incorrect password" });
      }
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// توجيه المستخدمين إلى الصفحات المختلفة بناءً على دورهم
// router.get('/workerPage', requireAuth, ensureRole('factoryWorker'), (req, res) => {
//   res.render('workerPage');
// });


router.get('/workerPage', requireAuth, ensureRole('factoryWorker'), verifyToken, async (req, res) => {
  try {
    const token = req.cookies.jwt; // الحصول على التوكن من الكوكيز
    const decoded = jwt.verify(token, 'shhhhh'); // استخدم مفتاحك السري هنا
    const userId = decoded.id;
    const name = decoded.name;
    const userName = decoded.userName;
console.log(token)
    const orders = await User.aggregate([
        { $unwind: "$orders" },
        { $match: { "orders.status2": "قيد التصنيع" } },
        { $project: { 
            "orders.orderNumber": 1, 
            "orders.measurement": 1,
            _id: 0 
        } }
    ]);

    // تصفية القياسات وإضافة المتغيرات بناءً على ID المستخدم
    const filteredOrders = orders.map(order => {
        const measurements = order.orders.measurement.filter(measurement => 
            (measurement.cuttingTechnicianGlass && measurement.cuttingTechnicianGlass.toString() === userId) || 
            (measurement.assemblyTechnicianGlass && measurement.assemblyTechnicianGlass.toString() === userId) ||
            (measurement.cuttingTechnician && measurement.cuttingTechnician.toString() === userId) || 
            (measurement.assemblyTechnician && measurement.assemblyTechnician.toString() === userId)
        );
        return measurements.length > 0 ? { ...order, orders: { ...order.orders, measurement: measurements } } : null;
    }).filter(order => order !== null);

    res.render('workerPage', { orders: filteredOrders, userId,userName,name });
} catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
}
});







// router.get('/home', requireAuth,restrictFactoryWorker, (req, res) => {
//   User.find().then((result) => {
//     const user = res.locals.user;  // هذه تم تمريرها مدالة التوكن عشان نرسل الصلاحيات إلى الفرنت اند عشان نخفي ونظهر بعض الأزرار
//     res.render("index", { arr: result, moment: moment, permissions: user ? user.permissions : [] });
//   }).catch((err) => {
//     console.log(err);
//   });
// });





router.get('/home', requireAuth, restrictFactoryWorker, (req, res) => {
  const limit = parseInt(req.query.limit) || 30; // تعيين الحد الافتراضي إلى 1 إذا لم يتم تقديمه
  const skip = parseInt(req.query.skip) || 0;   // تعيين قيمة skip الافتراضية إلى 0

  User.find().skip(skip).limit(limit)
    .then((result) => {
      const user = res.locals.user;
      const hasMore = result.length === limit; // تحقق إذا كانت هناك المزيد من البيانات

      res.render("index", {
        arr: result,                // تمرير النتائج التي تم جلبها إلى القالب
        moment: moment,             // تمرير مكتبة moment لتنسيق التواريخ
        permissions: user ? user.permissions : [],
        hasMore: hasMore,           // تمرير ما إذا كانت هناك المزيد من البيانات
        skip: skip + limit,         // زيادة قيمة skip للطلب التالي
        limit: limit                // تمرير limit للقالب
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Something went wrong');
    });
});










      //   router.post("/login", async (req, res) => {
      //     // طباعة خط فاصل في وحدة التحكم للوضوح
      //     console.log("__________________________________________");
      
      //     try {
      //         // البحث عن المستخدم في قاعدة البيانات بناءً على اسم المستخدم المدخل
      //         const loginUser = await AuthUser.findOne({ userName: req.body.userName });
      
      //         // إذا لم يتم العثور على المستخدم، طباعة رسالة وإرجاع استجابة تفيد بأن المستخدم غير موجود
      //         if (loginUser == null) {
      //             console.log("this username not found in DATABASE");
      //             return res.json({ notFoundUser: "Username not found, try to sign up" });
      //         } else {
      //             // مقارنة كلمة المرور المدخلة مع كلمة المرور المخزنة في قاعدة البيانات باستخدام bcrypt
      //             const match = await bcrypt.compare(req.body.password, loginUser.password);
      //             if (match) {
      //                 // إذا كانت كلمة المرور صحيحة، طباعة رسالة وإنشاء توكن JWT يحتوي على معرف المستخدم واسم المستخدم والاسم
      //                 console.log("correct username & password");
      //                 var token = jwt.sign(
      //                     {
      //                         id: loginUser._id,
      //                         userName: loginUser.userName,
      //                         name: loginUser.name
      //                     },
      //                     "shhhhh"
      //                 );
      //                 console.log(token);
      
      //                 // إعداد كوكي تحتوي على التوكن وإرسالها في الاستجابة
      //                 res.cookie("jwt", token, { httpOnly: true, maxAge: 86400000 });
      //                 return res.json({ id: loginUser._id });
      //             } else {
      //                 // إذا كانت كلمة المرور غير صحيحة، طباعة رسالة وإرجاع استجابة تفيد بأن كلمة المرور غير صحيحة
      //                 console.log("wrong password");
      //                 return res.json({ passwordError: "incorrect password" });
      //             }
      //         }
      //     } catch (error) {
      //         // في حالة حدوث خطأ أثناء العملية، طباعة الخطأ وإرجاع استجابة خطأ
      //         console.log(error);
      //         res.status(500).json({ error: "Internal server error" });
      //     }
      // });
      



  
                // //POST  Level 2 // ///






                //POST    Level 3

        //  رفع الصورة الشخصية الدرس رقم 11
                         const multer  = require('multer')
                        // const upload = multer({ dest: 'uploads/' }) // اذا تبغاه ينشأ ملف اسمه كذا ويحفض فيه الصور 
                        const upload = multer({storage: multer.diskStorage({})}); // انا ما ابغه ينشه ملف ويحفض فيه الصور لذالك استخدمة هذا الكود عشان يحفظ في الجهاز وبعدين نرفعة على موقع صور مثل ما راح نشوف في الكواد القادمة
                        const cloudinary = require('cloudinary').v2 //كود خاص بالكوادنيري وهذي موقع لرفع الصور عليه 
          
                    cloudinary.config({ // كود جاهز نسجته من موقع رفع الصور وداخلة ارقام سريه خاصة بارموقع
                      cloud_name: 'dff983twe', 
                      api_key: '898848396616685', 
                      api_secret: 'Wu5c8dt7hFFW9rtbs-BeR3e00O0' 
                    });

                router.post('/update-profile',requireAuth, upload.single('avatar'), function (req, res, next) {
                  // req.file is the `avatar` file
                  // req.body will hold the text fields, if there were any

                  
                  console.log(req.file.path)

                  cloudinary.uploader.upload(req.file.path,{folder: "profileImg"}, async (error, result)=>{ // يعني انشأ ملف داخل موقع الصور وحط الصورة فيه {folder: "profileImg"} عشان يحفض في موقع حفظ الصور طبعا كتبنا 
                    console.log(result, error);
                    if (result){
                      var decoded = jwt.verify(req.cookies.jwt, 'shhhhh'); // لمعرفة الأيدي من التوكن عشان نحطة في البحث بال اي دي تحت عشان نعرف العملاء الي تحت اسم هذا المستخدم
                        const avatar =await AuthUser.updateOne({_id:decoded.id},{profileImage:result.secure_url}) // عشان يضيف او يعدل الصورة في قاعدة البيانات
                        console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxx")
                        console.log(avatar)
                        console.log("bbbbbbbbbbbbbbbbbbbbb")
                        res.redirect("/home")

                    }
                  });

                })


               // //POST  Level 3 // ///
  




  // DELETE ركوست
  
  router.delete('/edit/:id',requireAuth,restrictFactoryWorker, (req, res) => { 
    var decoded = jwt.verify(req.cookies.jwt, 'shhhhh'); // لمعرفة الأيدي من التوكن عشان نحطة في البحث بال اي دي تحت عشان نعرف العملاء الي تحت اسم هذا المستخدم

    // console.log(decoded)
    
    // User.deleteOne({_id:req.params.id} ) //طريقة ثانية للحذف تحط كي وفاليو 
    // AuthUser.findByIdAndDelete(req.params.id) // هذي عشان نحذف الايدي كامل بس حن نبغى نحذف من داخل اري داخل الرمستخدم لذالك راح نستخدم بطريقة الي تحت عن طريق الاب ديت 
    AuthUser.updateOne({"customerInfo._id":req.params.id}, {$pull: {customerInfo:{ _id: req.params.id}}} // هذي الطريقة والي تحت كلها صحيحة بدال ما نبحث عن ايدي المستخد ون ثم ايدي العميل نبحث عن ايدي العميل على طول
    )
    // AuthUser.updateOne({_id:decoded.id}, {$pull: {customerInfo:{ _id: req.params.id}}} // نفس فكرة الي فوق بس تختلف في البحث عن العميل بحيث نبحث عن ايدي المستخدم ثم عن ادي العميل
    // )
    .then((result)=>{
        res.redirect("/home"); // بعد ما تخلص حولني على هذا الرابط طبعا الرابط الموجود هو نفسه رابط الصفحة
        console.log(result)
      }).catch((err)=>{
          console.log(err)
        })
   
  
  })
  
  
  
  
  // PUT ركوست لتعديل
  
  
  router.put('/edit/:id',requireAuth,restrictFactoryWorker, (req, res) => { 
  
    // console.log(req.body)
    // User.findByIdAndUpdate(req.params.id , req.body) // هذه الطريقة لتعديل عن طريق الايدي 
    // User.updateOne({_id: req.params.id}, req.body) // هذي الطريقة الثانية  لعمل التحديث بطريقة انك تحدد الكي والفاليو

    // AuthUser.updateOne({"customerInfo._id": req.params.id}, {"customerInfo.$": req.body}) // هذا الطريقة عشان نعدل على العملاء داخل ايدي معين وفي هذي الخطوة حددنا مكان المستخدم في قاعدة البينات ومن ثم في القوس الثاني حطينا التعديل
      // الغية السطر الي فوق عشانه سببلي مشكلة في الوقت اذا سويت تعديل ينحثف وقت الانشاء بسبب تعديلي في الكورست حق انشاء عميل فوق درس رقم 13 المستوى 3
      //  AuthUser.updateOne(
      //   {"customerInfo._id": req.params.id},
      //    {"customerInfo.$.firstName": req.body.firstName,
      //    "customerInfo.$.lastName": req.body.lastName,
      //    "customerInfo.$.email": req.body.email,
      //    "customerInfo.$.phoneNumber": req.body.phoneNumber,
      //    "customerInfo.$.age": req.body.age,
      //    "customerInfo.$.country": req.body.country,
      //    "customerInfo.$.gender": req.body.gender,
      //    "customerInfo.$.updatedAt": new Date(),
      //   })

    User.updateOne(
        {"_id": req.params.id},
         {"firstNamecustomer": req.body.firstNamecustomer,
         "lastNamecustomer": req.body.lastNamecustomer,
         "phoneNumber": req.body.phoneNumber,
         "branch": req.body.branch,
         "gender": req.body.gender,
         "updatedAt": new Date(),
        })




    .then((result)=>{

     
        res.redirect(`/view/${req.params.id}`) // بعد ما تخلص حولني على هذا الرابط طبعا الرابط الموجود هو نفسه رابط الصفحة
      }).catch((err)=>{
          console.log(err)
        })
   
  
  })
  
  






  // router.post("/user/measurement", async (req, res) => {


  //   //   const loginUser = await AuthUser.findOne({ email: req.body.email });
              
  //   console.log("__________________________________________");
      
  //   console.log(req.body);
  //   console.log("__________________________________________");
    
    
  //   });
    








// مسار لاستدعاء دالة الترقيم

router.post('/number-measurements/:orderId', async (req, res) => {
  const { orderId } = req.params;

  try {
      await numberAllMeasurementsForOrder(orderId);
      res.status(200).send('Measurements have been numbered successfully.');
  } catch (error) {
      console.error('Error numbering measurements:', error);
      res.status(500).send('An error occurred while numbering measurements.');
  }
});









// مسار لتعديل الحالة
router.post('/update-status/:orderId', async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;

  try {
      // ابحث عن المستخدم الذي يحتوي على الطلب المطلوب
      const user = await User.findOne({ "orders._id": orderId });
      if (user) {
          // ابحث عن الطلب وقم بتحديث الحالة
          const order = user.orders.id(orderId);
          if (order) {
              order.status2 = status;
              await user.save();
              const referrer = req.get('Referrer');
              res.redirect(referrer); // إعادة التوجيه إلى الصفحة السابقة
          } else {
              res.status(404).send('Order not found');
          }
      } else {
          res.status(404).send('User not found');
      }
  } catch (error) {
      console.error(error);
      res.status(500).send('Server error');
  }
});





// مسح الواوردر بشرط يكون مسودة

// مسار لحذف الطلبات التي حالتها "مسودة"
router.delete('/delete-order/:orderId',restrictFactoryWorker, async (req, res) => {
  const { orderId } = req.params;

  try {
      // ابحث عن المستخدم الذي يحتوي على الطلب المطلوب
      const user = await User.findOne({ "orders._id": orderId });
      if (user) {
          // ابحث عن الطلب وقم بفحص الحالة قبل الحذف
          const order = user.orders.id(orderId);
          if (order && order.status === 'مسودة') {
              user.orders.pull(orderId); // استخدم pull لإزالة العنصر
              await user.save();
              res.redirect(req.get('Referrer')); // إعادة التوجيه إلى الصفحة السابقة
          } else {
              res.status(400).send('Order status is not "مسودة" or Order not found');
          }
      } else {
          res.status(404).send('User not found');
      }
  } catch (error) {
      console.error(error);
      res.status(500).send('Server error');
  }
});



// لتغير سعر المتر من التنبر لنفس الاوردر 





router.post('/meter-temper-price/:id', async (req, res) => {
  try {
      const orderId = req.params.id; // معرف الطلب الرئيسي
      const newMetersPrice = parseFloat(req.body.MetersPrice); // السعر الجديد
      const iid = req.body.iid; // معرف الطلب الفرعي

      console.log('Received Data:', { orderId, newMetersPrice, iid });

      // التحقق من أن القيم ليست فارغة أو غير صالحة
      if (!orderId || !iid) {
          return res.status(400).send('Invalid request: missing order ID or item ID');
      }

      // استدعاء دالة الحساب مع السعر الجديد إذا كان موجودًا
      await calculateTotalTempersMeters(iid, newMetersPrice);
      await updateTotal(iid)
      console.log('Total tempers meters recalculated successfully');

      res.redirect(`/price/${iid}`);
    } catch (error) {
      console.error('Error updating MetersPrice:', error.message);
      res.status(500).send('Server error');
  }
});


// post بوستات تعديل سعر الشبابسك الاضافيه 

router.post('/update-structure-price/:orderId', async (req, res) => {
  try {
    const { orderId } = req.params;
    const { measurementId, newPrice, iid } = req.body;

    // الحصول على `number` من قاعدة البيانات
    const user = await User.findOne(
      { "orders._id": new mongoose.Types.ObjectId(orderId), "orders.measurement._id": new mongoose.Types.ObjectId(measurementId) },
      { "orders.$": 1 } // جلب فقط الطلب المحدد
    );

    if (!user) {
      return res.status(404).json({ message: "Order or measurement not found" });
    }

    // العثور على `number` داخل الإضافات
    const measurement = user.orders[0].measurement.find(meas => meas._id.equals(measurementId));
    const numberValue = measurement.additions.Structure.number;

    // حساب `totalPrice` الجديد بناءً على `number` و `newPrice`
    const totalPrice = numberValue * newPrice;

    // تحديث `price` و `totalPrice` في قاعدة البيانات
    const updatePathPrice = "orders.$[order].measurement.$[measurement].additions.Structure.price";
    const updatePathTotalPrice = "orders.$[order].measurement.$[measurement].additions.Structure.totalPrice";

    const result = await User.findOneAndUpdate(
      { "orders._id": new mongoose.Types.ObjectId(orderId) },
      { 
        $set: { 
          [updatePathPrice]: newPrice,
          [updatePathTotalPrice]: totalPrice 
        } 
      },
      {
        arrayFilters: [
          { "order._id": new mongoose.Types.ObjectId(orderId) },
          { "measurement._id": new mongoose.Types.ObjectId(measurementId) }
        ],
        new: true
      }
    );

    await calculateTotalPrice(orderId); // دالة تحديث مجموع سعر الإضافات
    await updateTotal(iid)

    res.redirect(`/price/${iid}#measurement-${measurementId}`);

  } catch (error) {
    console.error("Error updating Structure price:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


router.post('/update-hinges-price/:orderId', async (req, res) => {
  try {
    const { orderId } = req.params;
    const { measurementId, newPrice, iid } = req.body;

    const updatePathPrice = "orders.$[order].measurement.$[measurement].additions.Hinges.price";
    const updatePathTotalPrice = "orders.$[order].measurement.$[measurement].additions.Hinges.totalPrice";

    const user = await User.findOne(
      { "orders._id": new mongoose.Types.ObjectId(orderId), "orders.measurement._id": new mongoose.Types.ObjectId(measurementId) },
      { "orders.$": 1 }
    );

    if (!user) {
      return res.status(404).json({ message: "Order or measurement not found" });
    }

    const measurement = user.orders[0].measurement.find(meas => meas._id.equals(measurementId));
    const numberValue = measurement.additions.Hinges.number;

    const totalPrice = numberValue * newPrice;

    const result = await User.findOneAndUpdate(
      { "orders._id": new mongoose.Types.ObjectId(orderId) },
      {
        $set: {
          [updatePathPrice]: newPrice,
          [updatePathTotalPrice]: totalPrice
        }
      },
      {
        arrayFilters: [
          { "order._id": new mongoose.Types.ObjectId(orderId) },
          { "measurement._id": new mongoose.Types.ObjectId(measurementId) }
        ],
        new: true
      }
    );

    await calculateTotalPrice(orderId);
    await updateTotal(iid)

    res.redirect(`/price/${iid}#measurement-${measurementId}`);
  } catch (error) {
    console.error("Error updating Hinges price:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post('/update-rollwindow-price/:orderId', async (req, res) => {
  try {
    const { orderId } = req.params;
    const { measurementId, newPrice, iid } = req.body;

    const updatePathPrice = "orders.$[order].measurement.$[measurement].additions.RollWindow.price";
    const updatePathTotalPrice = "orders.$[order].measurement.$[measurement].additions.RollWindow.totalPrice";

    const user = await User.findOne(
      { "orders._id": new mongoose.Types.ObjectId(orderId), "orders.measurement._id": new mongoose.Types.ObjectId(measurementId) },
      { "orders.$": 1 }
    );

    if (!user) {
      return res.status(404).json({ message: "Order or measurement not found" });
    }

    const measurement = user.orders[0].measurement.find(meas => meas._id.equals(measurementId));
    const numberValue = measurement.additions.RollWindow.number;

    const totalPrice = numberValue * newPrice;

    const result = await User.findOneAndUpdate(
      { "orders._id": new mongoose.Types.ObjectId(orderId) },
      {
        $set: {
          [updatePathPrice]: newPrice,
          [updatePathTotalPrice]: totalPrice
        }
      },
      {
        arrayFilters: [
          { "order._id": new mongoose.Types.ObjectId(orderId) },
          { "measurement._id": new mongoose.Types.ObjectId(measurementId) }
        ],
        new: true
      }
    );

    await calculateTotalPrice(orderId);
    await updateTotal(iid)

    res.redirect(`/price/${iid}#measurement-${measurementId}`);
  } catch (error) {
    console.error("Error updating RollWindow price:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});





module.exports = router // كود جاهز :تصدير الملفات



