const express = require('express') //اكواد جاهزة من اكسبرس
const router = express.Router() // اكواد جاهزة من اكسبرس

const User = require("../models/customersSchema.js") // اسكيما العملاء

const AuthUser = require("../models/auth-user") // تسيما الحسابات اليوزرات

const commands = require("../models/commands")

var moment = require('moment'); // مكتبة لتعديل شكل التاريخ والوقت الوجودة في الداتا وعن طريق المنقوز
const bcrypt = require('bcrypt');  // تحضير مكتبة تشفير الباسورد
var jwt = require("jsonwebtoken"); // تحضير مكتبة التوكن

const AsyncLock = require('async-lock'); //هذا ولي تحت كود عشان يعمل قفلعلى الداتا يمنع من تكرار البينات عطاني اياه الذاكاء الصناعي عسانمشكلة تكرار مجموع المواد في الداتا
const lock = new AsyncLock();


const {requireAuth} = require("../middleware/middleware.js") // تسيما الحسابات اليوزرات

const {checkIfUser} = require("../middleware/middleware.js")

const {YourModel} = require('../middleware/middleware.js'); //دالة عشان ترقم البينات

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
              
          


var decoded = jwt.verify(req.cookies.jwt, 'shhhhh'); // لمعرفة الأيدي من التوكن عشان نحطة في البحث بال اي دي تحت عشان نعرف العملاء الي تحت اسم هذا المستخدم
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





          measurement:[]
        }
    
     
const vgf= await User.findOneAndUpdate(
  { _id: v.id },
  { $push: { orders: [n] } }, // إضافة البيانات داخل orders
  { new: true, upsert: true },
  // { $push: { 'orders.$[].measurement': v } },
  // { new: true, upsert: true }
  
)


.then(updatedUser => {
  // return res.json({ id:"done" })
  console.log('تمت إضافة البيانات بنجاح:', updatedUser);
})
.catch(error => {
  console.error('حدث خطأ أثناء إضافة البيانات:', error);
});









               console.log(v)
                 // اذا موجود يرسل هذا النص إلى الفرنت اند هصيغة الجيسون يعني هذا الحساب مسجل مسبقاً و يوقف الاسطر الي بعدة

return res.json({ id:"done" })

   
            });










            router.post("/basic-measurementbbb/:id",restrictFactoryWorker, async (req, res) => {
              try {
                  const v = req.body;
                  const b = req.params.id;
                  var decoded = jwt.verify(req.cookies.jwt, 'shhhhh');
                  
                  // إنشاء مثيل جديد من المودل مع ترقيم البيانات
                  const n = new YourModel({
                    
                      status: 'مسودة',
                      branch: v.branch,
                      location: v.location,
                      salesEmployeeId: decoded.id,
                      salesEmployeeName: 'String',
                      salesEmployeeUserName: 'String',
                      aluminumCode0: v.aluminumCode0,
                      aluminumThickness0: v.aluminumThickness0,
                      aluminumColorCode0: v.aluminumColorCode0,
                      glasstype0: v.glasstype0,
                      glassThickness0: v.glassThickness0,
                      glassColorCode0: v.glassColorCode0,
                      measurement: []
                     
                  });
                  
                  // حفظ الوثيقة في قاعدة البيانات
                  const savedDocument = await n.save();
                  console.log('تمت إضافة البيانات بنجاح:', savedDocument);
                  
                  // تحديث مستخدم معين في مودل User بإضافة البيانات الجديدة إلى حقل الأوامر
                  const updatedUser = await User.findOneAndUpdate(
                      { _id: v.id },
                      { $push: { orders: n } }, // انتبه هنا، لا تحتاج إلى array brackets لأن n هو بالفعل كائن واحد
                      { new: true, upsert: true }
                  );
                  console.log('تمت إضافة البيانات بنجاح:', updatedUser);
          
                  return res.json({ id: "done" });
              } catch (error) {
                  console.error('حدث خطأ أثناء إضافة البيانات:', error);
                  return res.status(500).json({ error: 'حدث خطأ أثناء إضافة البيانات' });
              }
          });







          // ركوس خاص في تأكيد الطلب واعطاه رقم 

          router.post("/review/:id", async (req, res) => {
            try {
                const v = req.body;
                const b = req.params.id;
                console.log(v.id)
                var decoded = jwt.verify(req.cookies.jwt, 'shhhhh');
                
                // إنشاء مثيل جديد من المودل مع ترقيم البيانات
                const n = new YourModel({
                  
                    // status:v.confirming,
                    status:"مؤكد",
                    // branch: v.branch,
                    // location: v.location,
                    // salesEmployeeId: decoded.id,
                    // salesEmployeeName: 'String',
                    // salesEmployeeUserName: 'String',
                    // aluminumCode0: v.aluminumCode0,
                    // aluminumThickness0: v.aluminumThickness0,
                    // aluminumColorCode0: v.aluminumColorCode0,
                    // glasstype0: v.glasstype0,
                    // glassThickness0: v.glassThickness0,
                    // glassColorCode0: v.glassColorCode0,
                    // measurement: []
                   
                });

               
              const g = await  User.findOne( // هذا انا وضعته لزيادة الامان لكي لا يعدل احتهم من الفحص ويضهر زر اعتماد الطلب ويصدر طلب جديد فأستدعيت هذي من الداتات وتأكدت من رقم الايدي ووضعت شرط بحيث لا يتم التعديل إلا اذا كانة مسوادة
                  { "orders._id": v.id }
                )
                const foundObject =await g.orders.find(item => item.id === v.id); // عشان اجيب الوبجكة الذي يحمل هذا الايدي 
                // console.log("fffffffff")
                // console.log(v.confirming2)
                // console.log("fffffffff")

                if (foundObject.status == "مسودة" && Array.isArray(foundObject.measurement) && foundObject.measurement.length > 0) { // اشترط ان يكون مسودة لكي لايوكون موكد ونزيد نهب رقم طلب جديد
                // حفظ الوثيقة في قاعدة البيانات
                const savedDocument = await n.save();
                console.log('تمت إضافة البيانات بنجاح:', savedDocument);
                

               


                // تحديث مستخدم معين في مودل User بإضافة البيانات الجديدة إلى حقل الأوامر
                const updatedUser = await User.updateOne(
                    { "orders._id": v.id },
                    { $set: { "orders.$[orderElem].status": n.status,"orders.$[orderElem].status2": 'قيد التصنيع',"orders.$[orderElem].orderNumber": n.orderNumber } },
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














            router.get("/measurementmm/:id",restrictFactoryWorker, (req, res) => {
              
              // User.findById(req.params.id) // هذي الادة من منقز لاستخراج ابجكت معين من الداتا ممكن تكتب الايري على طول بس حن استخرجناه من الرابط بهذي العبارة واضفنا اسم المتغير الي اضفنه فوق
              //         .then((result)=>{
                       
              User.findOne({'orders._id': req.params.id})


    //  User.orders.findOne({'orders.measurement._id': req.params.id})
  //   User.findOne({
  //   "orders": {
  //     "$elemMatch": {
  //       "measurement._id": ObjectId("65e38779b4a0b7802ed92fb7")
  //     }
  //   }

  // })



// User.findById(req.params.id, 'orders._id' )
.then((result)=>{

  const h =result

 console.log("++++++++++++++++++++++++++")
 console.log(h)

const idToFind = req.params.id; // من الرابط id 

const foundObject = h.orders.find(item => item.id === idToFind); //  عشان يعطيني البجكت حامل هذا الادي من الداتا

console.log(foundObject);

      console.log("++++++++++++++++++++++++++")
              

                        res.render('user/measurement',{arrM:foundObject ,moment:moment} ) // المتغير الثاني حق اداة تغيير شكل اوقت
                      }).catch((err)=>{
                          console.log(err)
                 })


            });











            router.get("/measurementtt/:id",restrictFactoryWorker, (req, res) => {
              
             
                       
              // User.findOne({'orders._id': req.params.id})

              const customerId = req.params.id;

              User.findOne(
                { "orders.measurement._id": customerId },
                { "orders.$": 1 }
              )
.then((result)=>{
 
  if (result) {
    const measurement = result.orders[0].measurement.find(m => m._id.toString() === customerId);
    console.log(measurement);
    res.render('user/measurement',{arrM:measurement ,moment:moment} ) // المتغير الثاني حق اداة تغيير شكل اوقت

  } else {
    console.log("No document found");
  }
              

                      }).catch((err)=>{
                          console.log(err)
                 })


            });








            router.get("/measurement/:id",restrictFactoryWorker,checkPermission('add_edit_measurement'), (req, res) => {
              const customerId = req.params.id;
              User.findOne({'orders._id': req.params.id})
                  .then((result1) => {
                      if (result1) {


                        const h =result1

                        console.log("++++++++++++++++++++++++++")
                        console.log(h)
                       
                       const idToFind = req.params.id; // من الرابط id 
                       
                       const foundObject = h.orders.find(item => item.id === idToFind); //  عشان يعطيني البجكت حامل هذا الادي من الداتا
                       
                       console.log(foundObject);
                       
                             console.log("++++++++++++++++++++++++++")
                                     
                       
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
 console.log("777777777777777777777777")
console.log(result2)
console.log("777777777777777777777777")
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













//  تم دمج ركوستات البوست التابعة لصفحة المقاس ركوست من رفع قياس جديد والأخر من تعديل القياس 


router.post("/measurement/:id",restrictFactoryWorker, async (req, res) => {



  // هذا عشان اذا الداتا حقة التسعير موجودة ينشأها وذا موجودة ما يساوي شي
  const cc = await commands.find()
  // console.log('hhhhhhhhhhhhhhhhhhjjjj:');
  // console.log(cc.length ==0?1:0);
  // console.log('hhhhhhhhhhhhhhhhhjjj:');
  if(cc.length ==0){
   const newUser = await commands.create({
        price: {
            slidingD10: 530,
            slidingD10b: 500,
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
            Skylight: 1100
        },
        createdAt: new Date()
    });

    console.log('تم انشاء هذه الاسعار لانها غير موجودة مسبقا في الداتا:', newUser);
  
  }
  //// هذا عشان اذا الداتا حقة التسعير موجودة ينشأها وذا موجودة ما يساوي شي////

   








  const v = req.body;
  console.log(v.aluminumCode)

/// دالة مجموع الامتار
  const data = {
    aluminumCode: v.aluminumCode, // يمكنك استبدال القيم بالقيم الفعلية
    h: parseFloat(v.H ),
    w: parseFloat(v.W ),
    lip:v.lip,

  
};

const { resultH, resultW ,totalMeters,total,price } = calculateResults(data);
console.log("النتائج:", resultH, resultW ,totalMeters,total,price);
//// دالة مجموع الامتار///

/// دالة المعادلات الام
// let datas ={
//   H:200,
//   W:100,
//   aluminumCode:"ROYAL 2"
  
//   }
  
  const { E10, F10 ,G10,H10,I10,J10,M10,N10,Q10,K10,L10,O10,P10 } = motherEquation(data)
  
  if(F10!=undefined){


    console.log('قيمة الخلية E10 ', E10);
    console.log('قيمة الخلية F10 ', F10);
    console.log('قيمة الخلية G10 ', G10);
    console.log('قيمة الخلية H10 ', H10);
    console.log('قيمة الخلية I10 ', I10);
    console.log('قيمة الخلية J10 ', J10);
    console.log('قيمة الخلية M10 ', M10);
    console.log('قيمة الخلية N10 ', N10);
    console.log('قيمة الخلية Q10 ', Q10);
    
    console.log('قيمة الخلية K10 ', K10);
    console.log('قيمة الخلية L10 ', L10);
    console.log('قيمة الخلية O10 ', O10);
    console.log('قيمة الخلية P10 ', P10);
    }else{
        console.log('قيمة الخلية Q10 ', Q10);
        console.log('قيمة الخلية E10 ', E10);
        console.log('قيمة الخلية P10 ', P10);
    }



/// دالة المعادلات الام///
  
  try {
    const decoded = jwt.verify(req.cookies.jwt, 'shhhhh');


    // خاص باترقيم القياسات يعني اذا كان القياس الاخير مرقم فجمع عليه رقم 1 وكتب الترقيم لهاذا القياس واذا كان  غير ذالك فلا تفعل شي
    const user = await User.findOne({ "orders._id": v.iid });

    if (!user) {
        console.log('User not found');
        return res.status(404).send('User not found');
    }

    const order = user.orders.id(v.iid);

    if (!order) {
        console.log('Order not found');
        return res.status(404).send('Order not found');
    }

    // إضافة المنطق للترقيم
    let sequenceNumber = null;
    if (order.measurement.length > 0) {
        const lastMeasurement = order.measurement[order.measurement.length - 1];
        if (lastMeasurement.sequenceNumber && !isNaN(lastMeasurement.sequenceNumber)) {
            sequenceNumber = lastMeasurement.sequenceNumber + 1;
        }
    }
    ////خاص للترقيم
    const n = {
      iid: v.iid,
      status: 'مسودة',
      branch: v.branch,
      location: v.location,
      salesEmployeeId: decoded.id,
      salesEmployeeName: '',
      salesEmployeeUserName: '',
      aluminumCode: v.aluminumCode,
      aluminumThickness: v.aluminumThickness,
      aluminumColorCode: v.aluminumColorCode,
      glasstype: v.glasstype,
      glassThickness: v.glassThickness,
      glassColorCode: v.glassColorCode,
      H: v.H,
      W: v.W,
      designCode: v.designCode,
      insideOrOutside: v.insideOrOutside,
      temper: v.temper,
      lip: v.lip,
      comments: v.comments,
      sequenceNumber: sequenceNumber, // إضافة الترقيم
      totalMeters:{
        H1: resultH,
        W1: resultW,
        totalMeters: totalMeters,
       
    },

    price:{ // التسعيرة

    //   // item: String,

      umberOfMeters: totalMeters,
      price: price,
      discount: 0,
      total: total,
      totalWithDiscount:total,


    //   // totalBeforeTax: Number,
    //   // tax: Number,
    //   // totalWithTax: Number,
      },
      motherEquation: {

        E10 :E10,  // الحلق
        F10 :F10, // الكعب
        G10 :G10, // الشنكل
        H10 :H10, // الجنب
        I10 :I10,// درفة الشبك
        J10 :J10, //ربل درفة
        M10 :M10,// زجاج
        N10 :N10,// شبك حديد 2م
        Q10 :Q10, // زجاج الثابت
        K10 :K10, // كفرات درفه 
        L10 :L10, // كفرات شبك 
        O10 :O10, //مسكة
        P10 :P10, // سيلكون المنيوم
       


   },


 totalPrice:{ // التسعيرة


    }



    };


    const nn = {
      iid: v.iid,
      status: 'مسودة',
      branch: v.branch,
      location: v.location,
      salesEmployeeId: decoded.id,
      salesEmployeeName: '',
      salesEmployeeUserName: '',
      aluminumCode: v.aluminumCode,
      aluminumThickness: v.aluminumThickness,
      aluminumColorCode: v.aluminumColorCode,
      glasstype: v.glasstype,
      glassThickness: v.glassThickness,
      glassColorCode: v.glassColorCode,
      H: v.H,
      W: v.W,
      designCode: v.designCode,
      insideOrOutside: v.insideOrOutside,
      temper: v.temper,
      lip: v.lip,
      comments: v.comments,
      
      totalMeters:{
        H1: resultH,
        W1: resultW,
        totalMeters: totalMeters,
       
    },

    // price:{ // التسعيرة

    //   // item: String,

      // umberOfMeters: totalMeters,
      // price: price,
      // discount: 0,
      // total: total,
      // totalWithDiscount:total,


    //   // totalBeforeTax: Number,
    //   // tax: Number,
    //   // totalWithTax: Number,
      // },
      motherEquation: {

        E10 :E10,  // الحلق
        F10 :F10, // الكعب
        G10 :G10, // الشنكل
        H10 :H10, // الجنب
        I10 :I10,// درفة الشبك
        J10 :J10, //ربل درفة
        M10 :M10,// زجاج
        N10 :N10,// شبك حديد 2م
        Q10 :Q10, // زجاج الثابت
        K10 :K10, // كفرات درفه 
        L10 :L10, // كفرات شبك 
        O10 :O10, //مسكة
        P10 :P10, // سيلكون المنيوم
       


   },


 totalPrice:{ // التسعيرة


    }



    };
    //رمز الأمن لموقع twilio يصنع بوت واتساب
    // SZWG4Z4SX8NC7N3J1WL6T3AW
// هذه الدالة تمسح القديم في الدالتا وتكتب الجديد الي هو توتل القياسات بعد حسابها 
    async function  updatetotalMotherEquation(resultsArrayAfter,id) {
      const dgd = await User.updateOne(
        { "orders._id": id }, 
        { $unset: { "orders.$[orderElem].motherEquationTotal": "" } }, 
        { 
            arrayFilters: [ { "orderElem._id": id } ],
            new: true 
        }
    );
  
  
      resultsArrayAfter.forEach(async function(result ) {
        // for (const result of allResults) {
  
  // var k =({
  
  //   // motherEquationTotal: {
  //       aluminumCode:result.aluminumCode,
  //       E10T :result.E10T,  // الحلق
  //       F10T :result.F10T, // الكعب
  //       G10T :result.G10T, // الشنكل
  //       H10T :result.H10T, // الجنب
  //       I10T :result.I10T,// درفة الشبك
  //       J10T :result.J10T, //ربل درفة
  //       M10T :result.M10T,// زجاج
  //       N10T :result.N10T,// شبك حديد 2م
  //       Q10T :result.Q10T, // زجاج الثابت
  //       K10T :result.K10T, // كفرات درفه 
  //       L10T :result.L10T, // كفرات شبك 
  //       O10T :result.O10T, //مسكة
  //       P10T :result.P10T, // سيلكون المنيوم
       
  
  
  //       E10TF :result.E10F,  // الحلق
  //       F10TF :result.F10F, // الكعب
  //       G10TF :result.G10F, // الشنكل
  //       H10TF :result.H10F, // الجنب
  //       I10TF :result.I10F,// درفة الشبك
  //       J10TF :result.J10F, //ربل درفة
  //       M10TF :result.M10F,// زجاج
  //       N10TF :result.N10F,// شبك حديد 2م
  //       Q10TF :result.Q10F, // زجاج الثابت
  //       K10TF :result.K10F, // كفرات درفه 
  //       L10TF :result.L10F, // كفرات شبك 
  //       O10TF :result.O10F, //مسكة
  //       P10TF :result.P10F, // سيلكون المنيوم
  
  
  // //  },
  
  // })

// ظظ
 function sanitizeValue(value) {
    // إذا كانت القيمة undefined أو null أو ليست رقمًا، نعيد القيمة 0
    if (value === undefined || value === null || isNaN(Number(value))) {
        return 0;
    }
    // إذا كانت القيمة رقمًا، نعيدها مع تقريبها إلى رقمين عشريين
    if (typeof value === 'number' || !isNaN(Number(value))) {
        return Number(value).toFixed(2);
    }
    // لأي قيمة أخرى، نعيدها كما هي دون تعديل
    return value;
}

// استخدم الدالة sanitizeValue لتعيين القيم في الكائن k
var k = {
    aluminumCode: result.aluminumCode,
    E10T: sanitizeValue(result.E10T),  // الحلق
    F10T: sanitizeValue(result.F10T), // الكعب
    G10T: sanitizeValue(result.G10T), // الشنكل
    H10T: sanitizeValue(result.H10T), // الجنب
    I10T: sanitizeValue(result.I10T), // درفة الشبك
    J10T: sanitizeValue(result.J10T), // ربل درفة
    M10T: sanitizeValue(result.M10T), // زجاج
    N10T: sanitizeValue(result.N10T), // شبك حديد 2م
    Q10T: sanitizeValue(result.Q10T), // زجاج الثابت
    K10T: sanitizeValue(result.K10T), // كفرات درفه 
    L10T: sanitizeValue(result.L10T), // كفرات شبك 
    O10T: sanitizeValue(result.O10T), // مسكة
    P10T: sanitizeValue(result.P10T), // سيلكون المنيوم

    E10TF: sanitizeValue(result.E10F),  // الحلق
    F10TF: sanitizeValue(result.F10F), // الكعب
    G10TF: sanitizeValue(result.G10F), // الشنكل
    H10TF: sanitizeValue(result.H10F), // الجنب
    I10TF: sanitizeValue(result.I10F), // درفة الشبك
    J10TF: sanitizeValue(result.J10F), // ربل درفة
    M10TF: sanitizeValue(result.M10F), // زجاج
    N10TF: sanitizeValue(result.N10F), // شبك حديد 2م
    Q10TF: sanitizeValue(result.Q10F), // زجاج الثابت
    K10TF: sanitizeValue(result.K10F), // كفرات درفه 
    L10TF: sanitizeValue(result.L10F), // كفرات شبك 
    O10TF: sanitizeValue(result.O10F), // مسكة
    P10TF: sanitizeValue(result.P10F) // سيلكون المنيوم
};







      const vgfg = await User.updateOne(
        { "orders._id": id }, 
        { $push: { "orders.$[orderElem].motherEquationTotal": k } }, 
        { 
          arrayFilters: [ { "orderElem._id": id } ],
          new: true 
        }
  
      );
    // }
    });
  
  
  }

// هذه الدالة تمسح القديم في الدالتا وتكتب الجديد الي هو توتل القياسات بعد حسابها //



    const result1 = await User.findOne({'orders._id': v.idUrl});
    if (result1 && resultH && resultW && totalMeters) { // حطيت مع التأكد من صحة بينات القياس وانواع الالمنيوم
      const vgf = await User.updateOne(
        { "orders._id": v.id }, 
        { $push: { "orders.$[orderElem].measurement": n } }, 
        { 
          arrayFilters: [ { "orderElem._id": v.id } ],
          new: true 
        }

      );

      
// دالة تحديث الخصم
      let dataId ={

        iid:v.id ,
        // id:,
            aluminumCodeFront:v.aluminumCode
        }
        await refreshDiscount(dataId)
// دالة تحديث الخصم//
await updateTotal(v.iid)// معادلة تحديث الجمالي والضريبة


//
let = aluminumCode=v.aluminumCode






const gg = await User.findOne({'orders._id': v.iid})
    const h =  gg
    const idToFind = v.iid; // من الرابط id 

    const foundObject = h.orders.find(item => item.id === idToFind); //  عشان يعطيني البجكت حامل هذا الادي من الداتا
    
    
   var {resultsArrayBefore,resultsArrayAfter} = totalMotherEquation(foundObject);
    
    console.log("Before:",resultsArrayBefore);
    
    console.log("After:",resultsArrayAfter);
    



    // measurement._id": v.idUrl

updatetotalMotherEquation(resultsArrayAfter,v.id)



//================== هنا معادلة تقرير قص الزجاج السحاب مع رفعها على الداتا===================
const foundObjectg = foundObject.measurement.pop(); //  عشان يعطيني البجكت حامل هذا الادي من الداتا

var C4 = foundObjectg.aluminumCode;
var B10 = foundObjectg.H; // الأرتفاع H
var C10 = foundObjectg.W; // العرض
var results = calculateValues(C4, B10, C10); // دالة قص الزجاج
// console.log("aasswwwwwwwwwwwwwwwwwww",results.valueA,C4); // Output the calculated value of A
// console.log("resultsthhhhhhhhhhhhh",results.valueB); // Output the calculated value of B


var glassCuttingReportSchema={
  H: results.valueB,
  W: results.valueA,
  reportTemper: results.valueC, // تقرير عدد امتار التنبر
}


const cv = await User.updateOne(
  { "orders._id": v.id },
  { $set: { "orders.$[orderElem].measurement.$[lastMeasurement].glassCuttingReport": glassCuttingReportSchema } },
  {
    arrayFilters: [
      { "orderElem._id": v.id },
      { "lastMeasurement._id": foundObjectg._id }
    ],
    new: true
  }
);

//================== هنا معادلة تقرير قص الزجاج السحاب مع رفعها على الداتا===================//


// ========================تقرير قص الألمنيوم===============================



let B100 = foundObjectg.H
let C100= foundObjectg.W
let M4= foundObjectg.aluminumCode
const {Q4,R4,S4,T4,U4} = aluminumCuttingReport(M4,B100,C100);// معادلة تقرير قص الألمنيوم
console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",Q4,R4,S4,T4,U4);

var aluminumCuttingReportSchema={
  Q4: Q4.toFixed(2),
  R4: R4.toFixed(2),
  S4: S4.toFixed(2),
  T4: T4.toFixed(2),
  U4: U4.toFixed(2),
}


const cvd = await User.updateOne(
  { "orders._id": v.id },
  { $set: { "orders.$[orderElem].measurement.$[lastMeasurement].aluminumCuttingReport": aluminumCuttingReportSchema } },
  {
    arrayFilters: [
      { "orderElem._id": v.id },
      { "lastMeasurement._id": foundObjectg._id }
    ],
    new: true
  }
);

// ========================تقرير قص الألمنيوم===============================//

    return res.json({ id: "done" });


           } else if( resultH && resultW && totalMeters) { // حطيت مع التأكد من صحة بينات القياس وانواع الالمنيوم
      // const updateData =await {};
      // Object.keys(nn).forEach(key => {
      //   updateData[`orders.$[outer].measurement.$[inner].${key}`] = nn[key];
      // });

      // const y = await User.updateOne(
      //   { "orders.measurement._id": v.idUrl }, 
      //   { $set: updateData
      //     // "orders.$[outer].measurement.$[inner].total": total}
      //   },
      //   { 
      //     arrayFilters: [
      //       { "outer.measurement._id": v.idUrl },
      //       { "inner._id": v.idUrl }
      //     ],
      //     // new: true 
      //   }


      // );

      console.log("aass",v.idUrl); // Output the calculated value of A




      const updateData = {};
      Object.keys(nn).forEach(key => {
        updateData[`orders.$[outer].measurement.$[inner].${key}`] = nn[key];
      });
      
      const y = await User.updateOne(
        { "orders.measurement._id": v.idUrl }, 
        { 
          $set: { 
            ...updateData,
            "orders.$[outer].measurement.$[inner].price.total": total
          }
        },
        { 
          arrayFilters: [
            { "outer.measurement._id": v.idUrl },
            { "inner._id": v.idUrl }
          ]
          
        }
        
      );


// دالة تحديث الخصم
let dataIdd ={

  iid:v.iid ,
  id:v.idUrl,
      // aluminumCodeFront:
  }
  await refreshDiscount(dataIdd)
// دالة تحديث الخصم//


     await updateTotal(v.iid)// معادلة تحديث الجمالي والضريبة


      // const k = await User.updateOne(
      //   { "orders.measurement._id": v.idUrl }, 
      //   { $set: 
      //     {"orders.$[outer].measurement.$[inner].price.total": total}
      //   },
      //   { 
      //     arrayFilters: [
      //       { "outer.measurement._id": v.idUrl },
      //       { "inner._id": v.idUrl }
      //     ],
      //     // new: true 
      //   }


      // );
      // console.log("total:",v.iid)





      const gg = await User.findOne({'orders._id': v.iid})
      const h =  gg
      const idToFind = v.iid; // من الرابط id 
  
      const foundObject = h.orders.find(item => item.id === idToFind); //  عشان يعطيني البجكت حامل هذا الادي من الداتا
      
      
     var {resultsArrayBefore,resultsArrayAfter} = totalMotherEquation(foundObject);
      
      console.log("Before:",resultsArrayBefore);
      
      console.log("After:",resultsArrayAfter);
      
  
  
  
  
  updatetotalMotherEquation(resultsArrayAfter,v.iid)




//================== هنا معادلة تقرير قص الزجاج السحاب مع رفعها على الداتا===================
const foundObjectgc = foundObject.measurement.find(item => item.id === v.idUrl); //  عشان يعطيني البجكت حامل هذا الادي من الداتا

// console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",foundObjectgc); // Output the calculated value of B

var C4 = foundObjectgc.aluminumCode;
var B10 = foundObjectgc.H; // الأرتفاع H
var C10 = foundObjectgc.W; // العرض
var results = calculateValues(C4, B10, C10);
// console.log("aasswwwwwwwwwwwwwwwwwww",results.valueA,C4); // Output the calculated value of A
// console.log("resultsthhhhhhhhhhhhh",results.valueB); // Output the calculated value of B


var glassCuttingReportSchema={
// glassCuttingReport:{
  H: results.valueB,
  W: results.valueA,
  reportTemper: results.valueC,
// }
}

const cv = await User.updateOne(
  { "orders._id": v.iid }, 
  { $set: { "orders.$[orderElem].measurement.$[measurementElem].glassCuttingReport": glassCuttingReportSchema } }, 
  { 
    arrayFilters: [ { "orderElem._id": v.iid}, { "measurementElem._id": v.idUrl } ],
    new: true 
  }
);


//================== هنا معادلة تقرير قص الزجاج السحاب مع رفعها على الداتا===================//



// ========================تقرير قص الألمنيوم===============================



let B100 = foundObjectgc.H
let C100= foundObjectgc.W
let M4= foundObjectgc.aluminumCode
const {Q4,R4,S4,T4,U4} = aluminumCuttingReport(M4,B100,C100);// معادلة تقرير قص الألمنيوم
// console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",Q4,R4,S4,T4,U4);

var aluminumCuttingReportSchema={
  Q4: Q4.toFixed(2),
  R4: R4.toFixed(2),
  S4: S4.toFixed(2),
  T4: T4.toFixed(2),
  U4: U4.toFixed(2),
}



const cvx = await User.updateOne(
  { "orders._id": v.iid }, 
  { $set: { "orders.$[orderElem].measurement.$[measurementElem].aluminumCuttingReport": aluminumCuttingReportSchema } }, 
  { 
    arrayFilters: [ { "orderElem._id": v.iid}, { "measurementElem._id": v.idUrl } ],
    new: true 
  }
);



//// ========================تقرير قص الألمنيوم===============================//


      if (y) {

        console.log("تم تحديث بيانات القياس بنجاح:", y);
        res.json({ id: "done" });
      } else {
        console.log("لم يتم العثور على القياس في أي من الاستعلامات");
      }
    }

  

  } catch (error) {
    console.error("حدث خطأ:", error);
    res.status(500).json({ error: "حدث خطأ أثناء تحديث بيانات القياس." });
  }
});







// //// تم دمج ركوستات البوست التابعة لصفحة المقاس ركوست من رفع قياس جديد والأخر من تعديل القياس // // 
















// DELETE مسح القياس

// router.delete('/review/:measurementId-:orderId', requireAuth, async (req, res) => {
//   try {
//     const { measurementId, orderId } = req.params;

//     const user = await User.findOne({ 'orders._id': orderId });
//     if (!user) {
//       return res.status(404).send('User not found');
//     }

//     const order = user.orders.id(orderId);
//     if (!order) {
//       return res.status(404).send('Order not found');
//     }

//     const measurement = order.measurement.id(measurementId);
//     if (!measurement) {
//       return res.status(404).send('Measurement not found');
//     }

//     if (order.status === 'مؤكد') {
//       measurement.delete = !measurement.delete;
//     } else {
//       order.measurement.pull(measurementId);
//     }

//     // حفظ التغييرات باستخدام findOneAndUpdate
//     await User.findOneAndUpdate(
//       { 'orders._id': orderId, 'orders.measurement._id': measurementId },
//       { $set: { 'orders.$.measurement': order.measurement } }
//     );

//     // تحديث الخصم والإجمالي والضريبة
//     let dataIdd = {
//       iid: orderId,
//       aluminumCodeFront: measurement.aluminumCode // تأكد من استخدام الكود الصحيح هنا
//     };

//     await refreshDiscount(dataIdd);
//     await updateTotal(orderId);

//     res.status(200).json({ message: 'Measurement delete status updated successfully.' });
//   } catch (error) {
//     console.error('Error updating measurement:', error);
//     res.status(500).send('An error occurred while updating the measurement.');
//   }
// });



// router.delete('/review/:measurementId-:orderId', requireAuth, async (req, res) => {
//   try {
//     const { measurementId, orderId } = req.params;

//     const user = await User.findOne({ 'orders._id': orderId });
//     if (!user) {
//       return res.status(404).send('User not found');
//     }

//     const order = user.orders.id(orderId);
//     if (!order) {
//       return res.status(404).send('Order not found');
//     }

//     const measurement = order.measurement.id(measurementId);
//     if (!measurement) {
//       return res.status(404).send('Measurement not found');
//     }

//     if (order.status === 'مؤكد') {
//       measurement.delete = !measurement.delete;
//     } else {
//       order.measurement.pull(measurementId);
//     }

//     // حفظ التغييرات باستخدام findOneAndUpdate
//     await User.findOneAndUpdate(
//       { 'orders._id': orderId, 'orders.measurement._id': measurementId },
//       { $set: { 'orders.$.measurement': order.measurement } }
//     );

//     // تحديث الخصم والإجمالي والضريبة
//     let dataIdd = {
//       iid: orderId,
//       aluminumCodeFront: measurement.aluminumCode // تأكد من استخدام الكود الصحيح هنا
//     };

//     await refreshDiscount(dataIdd);
//     await updateTotal(orderId);

//     // إعادة حساب دوال المعادلات الأم
//     const { resultsArrayBefore, resultsArrayAfter } = totalMotherEquation(order);
//     await updatetotalMotherEquation(resultsArrayAfter, orderId);

//     // إعادة حساب تقارير القص
//     const foundObjectgc = order.measurement.find(item => item._id === measurementId);

//     if (foundObjectgc) {
//       const C4 = foundObjectgc.aluminumCode;
//       const B10 = foundObjectgc.H;
//       const C10 = foundObjectgc.W;

//       const glassResults = calculateValues(C4, B10, C10);
//       const glassCuttingReportSchema = {
//         H: glassResults.valueB,
//         W: glassResults.valueA,
//         reportTemper: glassResults.valueC,
//       };

//       await User.updateOne(
//         { 'orders._id': orderId },
//         { $set: { 'orders.$[orderElem].measurement.$[measurementElem].glassCuttingReport': glassCuttingReportSchema } },
//         { arrayFilters: [{ 'orderElem._id': orderId }, { 'measurementElem._id': measurementId }], new: true }
//       );

//       const aluminumResults = aluminumCuttingReport(C4, B10, C10);
//       const aluminumCuttingReportSchema = {
//         Q4: aluminumResults.Q4.toFixed(2),
//         R4: aluminumResults.R4.toFixed(2),
//         S4: aluminumResults.S4.toFixed(2),
//         T4: aluminumResults.T4.toFixed(2),
//         U4: aluminumResults.U4.toFixed(2),
//       };

//       await User.updateOne(
//         { 'orders._id': orderId },
//         { $set: { 'orders.$[orderElem].measurement.$[measurementElem].aluminumCuttingReport': aluminumCuttingReportSchema } },
//         { arrayFilters: [{ 'orderElem._id': orderId }, { 'measurementElem._id': measurementId }], new: true }
//       );
//     }

//     res.status(200).json({ message: 'Measurement delete status updated successfully.' });
//   } catch (error) {
//     console.error('Error updating measurement:', error);
//     res.status(500).send('An error occurred while updating the measurement.');
//   }
// });



// router.delete('/review/:measurementId-:orderId', requireAuth, async (req, res) => {
//   console.log(`Request received for measurementId: ${req.params.measurementId}, orderId: ${req.params.orderId}`);
//   try {
//       const { measurementId, orderId } = req.params;

//       const user = await User.findOne({ 'orders._id': orderId });
//       if (!user) {
//           return res.status(404).send('User not found');
//       }

//       const order = user.orders.id(orderId);
//       if (!order) {
//           return res.status(404).send('Order not found');
//       }

//       const measurement = order.measurement.id(measurementId);
//       if (!measurement) {
//           return res.status(404).send('Measurement not found');
//       }

//       console.log('Current measurement before toggle:', measurement);

//       if (order.status === 'مؤكد') {
//           measurement.delete = !measurement.delete;
//           console.log('Toggled delete status:', measurement.delete);
//       } else {
//           order.measurement.pull(measurementId);
//           console.log('Measurement removed:', measurementId);
//       }

//       await User.findOneAndUpdate(
//           { 'orders._id': orderId },
//           { $set: { 'orders.$.measurement': order.measurement } }
//       );

//       console.log(`Updated measurement for order id: ${orderId}`);
//       console.log('Updated order measurements:', order.measurement);

//       let dataIdd = {
//           iid: orderId,
//           aluminumCodeFront: measurement.aluminumCode
//       };

//       await refreshDiscount(dataIdd);
//       await updateTotal(orderId);

//       const gg = await User.findOne({ 'orders._id': orderId });
//       const foundObject = gg.orders.find(item => item._id.equals(orderId));

//       var { resultsArrayBefore, resultsArrayAfter } = totalMotherEquation(foundObject);
//       console.log("Before:", resultsArrayBefore);
//       console.log("After:", resultsArrayAfter);

//       await updatetotalMotherEquation(resultsArrayAfter, orderId);

//       const finalUser = await User.findOne({ 'orders._id': orderId });
//       const finalOrder = finalUser.orders.id(orderId);
//       const finalMeasurement = finalOrder.measurement.id(measurementId);
//       console.log('Final measurement after all updates:', finalMeasurement);

//       res.status(200).json({ message: 'Measurement delete status updated successfully.' });
//   } catch (error) {
//       console.error('Error updating measurement:', error);
//       res.status(500).send('An error occurred while updating the measurement.');
//   }
// });




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
                       


        res.render('user/total-meters',{arrR:foundObject,idCustomer:idCustomer ,moment:moment} ) // المتغير الثاني حق اداة تغيير شكل اوقت
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
              slidingD10b: 500,
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
              Skylight: 1100
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








    router.post('/pricegg/:id', requireAuth,restrictFactoryWorker, async function (req, res, next) {
      const v = await req.body
      try {
        console.log("uuuuuuuuuuuuuuuuuuuuuuuuuuu")
        console.log(v)
        console.log("uuuuuuuuuuuuuuuuuuuuuuuuuuu")
          // const ObjectId = require('mongoose').Types.ObjectId;
  
          // // الشرط لتحديث الوثائق
          // const filter = {
          //     "orders.measurement.aluminumCode": "GOLF12", // الشرط على أن يكون aluminumCode مساويًا لـ "GOLF10"
          //     "orders.measurement.discount": { $ne: 2 } // الشرط على أن يكون discount مختلفًا عن 1
          // };
  
          // // القيمة الجديدة لـ discount
          // const update = { $set: { "orders.$[].measurement.$[elem].discount": 22222 } };
  
          // // الخيارات لتحديث الوثائق
          // const options = {
          //     arrayFilters: [{ "elem.aluminumCode": "GOLF12" }], // شرط لعنصر في الـ array
          //     multi: true // تحديث عدة وثائق
          // };
  
          // // تحديث الوثائق
          // const d = await User.updateMany(filter, update);
          // console.log('تم تحديث الوثائق بنجاح:', d);
          // res.redirect(`/price/65faed920d5e625395d9aa83`);
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
       

            // const vgf = await User.updateOne(
            //   { "orders._id": iid }, 
            //   { $set: { [`orders.$[orderElem].measurement.${index}.price.discount`]: hhh } }, 
            //   // { $set: { "orders.$[orderElem].measurement.3.price.discount":hhh } }, 
            //   // { $set: { "orders.$[orderElem].measurement." + indexVariable + ".price.discount" : 1} }, 
            //   { 
            //     arrayFilters: [ { "orderElem._id": iid }, 
            //     // { "measurementElem": 3 }
            //   ],
            //     new: true 
            //   }
            
            // );
      
            
            // updateTotal(v.iid)// معادلة تحديث الجمالي والضريبة
          }
          })
       //
      let to=hhh/pp
       foundObject.measurement.forEach(async (item,index) => {
        if(item.aluminumCode===l){
         
        // console.log("uuuuuuuuuuuuuuuuuuuuuuuuuuu")
        // console.log(pp)
        // console.log("uuuuuuuuuuuuuuuuuuuuuuuuuuu")
   
        const vgf = await User.updateOne(
          { "orders._id": iid }, 
          { $set: { [`orders.$[orderElem].measurement.${index}.price.discount`]: to } }, 
          // { $set: { "orders.$[orderElem].measurement.3.price.discount":hhh } }, 
          // { $set: { "orders.$[orderElem].measurement." + indexVariable + ".price.discount" : 1} }, 
          { 
            arrayFilters: [ { "orderElem._id": iid }, 
            // { "measurementElem": 3 }
          ],
            new: true 
          }
        
        );
  


    const data = {
          aluminumCode: item.aluminumCode, // يمكنك استبدال القيم بالقيم الفعلية
          h: parseFloat(item.H ),
          w: parseFloat(item.W ),
          discound:parseFloat(to)
      };



        const { resultH, resultW ,totalMeters,total,price } = calculateResults(data);
   
  let u = {
    

    umberOfMeters: totalMeters,
    price: price,
    discount: to,
    total: total,

  }
        
        const lkj = await User.updateOne(
          { "orders._id": iid }, 
          { $set: { [`orders.$[orderElem].measurement.${index}.price`]: u } }, 
          { 
            arrayFilters: [ { "orderElem._id": iid }, 
          ],
            new: true 
          }
        
        );




    

      }

      })
       //
       const { done } = await updateTotal(iid)// معادلة تحديث الجمالي والضريبة

    let don = await done

  res.redirect(`/price/${iid}`);

         
 
      } catch (error) {
          console.error('حدث خطأ أثناء تحديث الوثائق:', error);
          res.status(500).json({ error: 'حدث خطأ أثناء تحديث الوثائق' });
      }
  });
    





/////////////////////////////
 
  router.post('/price/:id', requireAuth,restrictFactoryWorker, async function (req, res, next) {
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
  




//////////Post////////
router.post('/test', requireAuth,restrictFactoryWorker, async function (req, res, next) {
  const v = await req.body
  console.log(v.total)
    try {
// المدخلات
      let iid = v.iid // id for order
      let id = "65fe4b1d66fa54f1fb370e0e" // id for mesurement

      const findDate = await  User.findOne({'orders._id': iid})

          const h =  findDate
  
  
        //  let indexVariable = `orders.$[orderElem].${"1"}.price.discount`
        const foundObject = await h.orders.find(item => item.id === iid); //  عشان يعطيني البجكت حامل هذا الادي من الداتا
        const mm = foundObject.measurement.find(item => item.id === id); //  عشان يعطيني البجكت حامل هذا الادي من الداتا

      //   var measurement=[
      //     { price :{
       
      //      price:100,  
      //      total:150,
      //      discount:50
      //  },
      //  aluminumCode:"GOLF12"
       
      //  },
      //  { price :{
       
      //  price:55,  
      //  total:250,
      //  discount:50
      //  },
      //  aluminumCode:"GOLF10"
      //  },
      //  { price :{
       
      //  price:55,  
      //  total:95,
      //  discount:40
      //  },
      //  aluminumCode:"GOLF10"
      //  }
      //  ]
      var pp =0
      var price = 0
      var total = 0
      var discount = 0
      var aluminumCode =''
       let wordCount = 0;
       const resultMap = new Map(); // إنشاء Map خارج اللوب الخارجي
       
       foundObject.measurement.forEach((item, index) => {
           const itemm = { 
               // value1: item.totalMeters.totalMeters , 
               value1: item.price.price, 
               value2: item.price.total,
               value3: item.price.discount,
               // value5: item.price.totalWithDiscount,  
               
               word: item.aluminumCode 
           };
       
       
           const key = `${itemm.word}`; // تكوين مفتاح يحتوي على الكلمة ورقم العمود
       
           if (resultMap.has(key)) {
               resultMap.set(key, {
                   // value1: resultMap.get(key).value1 += itemm.value1,
                   value1: resultMap.get(key).value1 = itemm.value1,
                   value2: resultMap.get(key).value2 + itemm.value2,
                   value3: resultMap.get(key).value3 + itemm.value3,
                   // value5: resultMap.get(key).value5 + itemm.value5,
                   word: resultMap.get(key).word = itemm.word, 
                 
               });
               
               // resultMap.set(key, resultMap.get(key) ); //
           } else {
               resultMap.set(key, itemm);
               // resultMap.set(key.length, 1);//
           } 
         
       });
       
        let index = 0; 
        // عرض النتيجة -->
       
        resultMap.forEach((value, key   ) => {
       
         // console.log(`${key} تكرر ${value} مرات`); 
         index++; 
       
        //  console.log(key,value.value1,value.value2,value.value3)
        if(mm.aluminumCode===key){
          aluminumCode=key
          price = value.value1
         total = value.value2
          discount = value.value3
         
        
        
        }
      

  //  console.log(aluminumCode,price,total,discount)
          
        })
            console.log(aluminumCode,price,total,discount)







//         let pp = 0 // عدد المطلبات الي نفس الاسم عشان يقسمها عليهم
        // let hhh = //v.discount // المبلغ 
//         let l = v.aluminumCode

        foundObject.measurement.forEach(async (item,index) => {
          if(mm.aluminumCode===item.aluminumCode){
            pp++
           
          
          
          }

        })
        console.log(pp)
        let to=discount/pp //الخصم تقسيم عدد القياسات المتشابهه في اسم القطاع
       let tot = total/pp // اجمالي السعر لكل القطاعات المتشابها تقسيم عدلدها
       let y = tot-to
// console.log(to)


// ////////////////
      const filter = {
          "orders.measurement.aluminumCode": aluminumCode
      };
  
      const update = { $set: { 
        "orders.$[orderElem].measurement.$[elem].price.discount": to,
        "orders.$[orderElem].measurement.$[elem].price.totalWithDiscount": y,

    
    } };
  
      const options = {
          arrayFilters: [{ "elem.aluminumCode": aluminumCode },
          { "orderElem._id": iid }
        ],
          multi: true
      };

  
      const result = await User.updateMany(filter, update, options);
      console.log('تم تحديث الوثائق بنجاح:', result);
// // /////////////



 



//       // updateTotal(iid)
//           updateTotal(v.iid)// معادلة تحديث الجمالي والضريبة

      res.redirect(`/test`);
      // res.redirect(`/price/65fb082c7f80673a1fcc2a15`);


  } catch (error) {
      console.error('حدث خطأ أثناء تحديث الوثائق:', error);
      // Handle error
  }


     


});


//////////// لتجربنه وسيتم حذفه  /////




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

      res.render('user/glass-cutting', { arrR: foundMeasurement, idCustomer: idCustomer, foundOrder: foundOrder, technicians: technicians, moment: moment });
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

      res.render('user/aluminum-cutting', { arrR: foundMeasurement, idCustomer: idCustomer, foundOrder: foundOrder, technicians: technicians, moment: moment });
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






// router.post("/aluminum-cutting/assign", async (req, res) => {
//   const { idCustomer, orderId, technicianId, taskType } = req.body;
//   let { selectedMeasurements } = req.body;

//   try {
//       const user = await User.findOne({ _id: idCustomer });
//       if (user) {
//           const order = user.orders.id(orderId);
//           if (!order) {
//               return res.status(404).send('Order not found');
//           }

//           // تأكد من أن selectedMeasurements هو مصفوفة
//           if (!Array.isArray(selectedMeasurements)) {
//               selectedMeasurements = [selectedMeasurements];
//           }

//           selectedMeasurements.forEach(measurementId => {
//               const measurement = order.measurement.id(measurementId);
//               if (measurement) {
//                   if (taskType === 'cutting') {
//                       measurement.cuttingTechnician = technicianId;
//                       measurement.cuttingStatus = false;
//                   } else if (taskType === 'assembly') {
//                       measurement.assemblyTechnician = technicianId;
//                       measurement.assemblyStatus = false;
//                   }
//               }
//           });

//           await user.save();
//           res.redirect(`/aluminum-cutting/${orderId}`);
//       } else {
//           res.status(404).send('User not found');
//       }
//   } catch (err) {
//       console.log(err);
//       res.status(500).send('Server Error');
//   }
// });





// مسار للحصول على تفاصيل طلب القطع
// مسار للحصول على تفاصيل طلب القطع
// router.get("/aluminum-cutting/:id", (req, res) => {
//   User.findOne({'orders._id': req.params.id})
//     .then((result) => {
//       const user = result;
//       const idCustomer = user._id; // استخدم _id للحصول على معرف العميل
//       const idToFind = req.params.id; // الحصول على المعرف من الرابط
//       const foundObject = user.orders.find(item => item._id.toString() === idToFind); // إيجاد الطلب باستخدام المعرف

//       if (!foundObject) {
//         return res.status(404).send('Order not found');
//       }

//       // إضافة الجزء الخاص بجلب الفنيين
//       Worker.find().then((workers) => {
//         res.render('user/aluminum-cutting', {
//           arrR: foundObject,
//           idCustomer: idCustomer,
//           workers: workers,
//           moment: moment
//         });
//       }).catch((err) => {
//         console.log(err);
//         res.status(500).send('Server Error');
//       });
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).send('Server Error');
//     });
// });





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

    res.render('user/total-materials',{arrR:foundObject,idCustomer:idCustomer ,moment:moment} ) // المتغير الثاني حق اداة تغيير شكل اوقت
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

                            
                              // هذا اذا تبغى تخلي تسجيل مستخدم جديد بدون قيود
                                          

                                        //   router.post('/sign-up', async(req, res) => { // وكتبنا نفس الأسماء في ملف الاسكيما name="" حطينا المسار الي يرسل منه الركوست طبعنا الفور هذا داخلة الفرغات الي نعبيها طبعا سمينا كل واحد فيه  action="/user/add.html" نوع الركوست وفي   method="post"  لو تلاحظ حطينا حطينا في  <form  action="/user/add.html" method="post" class="mx-0 row gx-3 gy-4 mt-3"> بهذي الطريقة  add طبعاً هنا خطوة جداً مهمه المسار الي موجد كتبناه في ملف 
                                        // //  console.log(req.body)
                                        //   let result= await AuthUser.create(req.body)
                                        //     try{
                                        //       console.log(result)
                                        //       // res.render("/home" ) // هذا يطبع
                                        //       res.redirect('/home') // هذا يحولك
                                        //      }
                                        //       catch(err){
                                        //       console.log(err)
                                        //     }
                                          
                                        //   })
                              // ////هذا اذا تبغى تخلي تسجيل مستخدم جديد بدون قيود////



// تم إقافة لأن استغنينا عنه في الأدمن
            // const { check, validationResult } = require("express-validator"); // تبع الي تحت حق التأكد من صحة الايميل و قوقة الباسورد

        //     router.post('/sign-up', // هذا ركزس عادي حق تسجيل مستخدم جديد واضفنا معه الاكواد التالية عشان يتأكد من ان اليوزر والمز السري مكتوبة بشكل قوي طبعا فيه دالة حزمه ثبتناها وخذا الكواد هذي من مرجعها
        //     check("email", "Please provide a valid email").isEmail(),
        //     check("password", "Password must be at least 8 characters with 1 upper case letter and 1 number"
        //     ).matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/),
        //     async(req, res) => { // هنا نكمل الركزست
        //       //  console.log(req.body)
        //       try{
        //         const objError = validationResult(req);  // يجمع الاخطاء هنا
        //         console.log(objError.errors)  // ملاحظة هذي تعتبر مصفوفةمن الأخطاء تصنعة حزمة التأكد من صحة الايمل و قوة الباسورد م
        //         console.log("----------------------")
        //           if(objError.errors.length > 0 ){ // طبعا هنا مصفوة الأخطاء لاتنطبع إلى اذا فيه خطاء في الايميل او قوة الباسورد عشان كذا انشأنا هذ الشرط و نقول فيه اذا النث حق الاري اكبر من صف نفذ الشر يعني فيه اخطاء بختصار
        //             return   res.json({ arrvalidationError: objError.errors}) // app نرسل رسالة الخطاء للفرنت اند بستخدام صيغة الجيسون طبعا معرقين صيغة الجيسزن في ملف 
        //           }




        //       const n = await AuthUser.findOne({email: req.body.email}) // عشان يبحث عن اليميل المراد تسجيله اذا هو موجد من قبل اولا في قاعدة البيانات
        //       console.log(n)
                


              
        //       if(n){
        //         return res.json({ existEmail: "Email already exist"}) // اذا موجود يرسل هذا النص إلى الفرنت اند هصيغة الجيسون يعني هذا الحساب مسجل مسبقاً و يوقف الاسطر الي بعدة
        //         // res.redirect('/sign-up')
                  

        //       }
        //         const newUser = await AuthUser.create(req.body) // اذا كل ماسبق صحيح راح يوصل إيلا هذه النقطة وينشأ الحساب 

        //           // اكواد التوكن جاهزة
        //       var token = jwt.sign({ id: newUser._id , name: newUser.name, userName: newUser.userName }, "shhhhh"); // انشانا منتغير وطلمبنا مكتلة التوكن ونحط اي اسم للبينات الي راح نخليها تصير توكن وبعده نحط البينات الي تبغاه يحطها في في التوكن من الافضل وضع الرأيد فقط وعدم وضع اليوزر والباسورد للأمان فقط واخر شي تحط رمز سري على التوكن حطيته اي شي
        //       res.cookie("jwt", token, { httpOnly: true, maxAge: 86400000 }); // هذا يحفظ داخل الكوكيز الوكل كلمة بين الاقواس هذا الكي الي راح يحفظ به والي بعدة التوكن والي بين القواس المطعجة اول واحد خاص في الحماية تقدر تبحث عن في قوقل واخر شي كم مدة حفظ التوكن وبعدين ينحذف بالملي سكند طبعا مسجل انا يوم كامل
        //       // res.redirect("/home") // هذي يحول عليه مايتأكد من التوكن اذا ماكتبت هذا الكود مارح يشتغل معك 
        //  // ///اكواد التوكن جاهزة//
                  
        //             res.json({ id: newUser._id }) // مثل ما تشوف فوق لازم تعلمه وين يروح بعد حفظ التوكن ولاكن راح يخرب تسجيل الدخول لذالك قنا له بعد ما تخلص انرسل هذا الجيسون
        //            }
        //             catch(err){
        //             console.log(err)
        //           }
                
        //         })



  
        //login
       

        // router.post('/login', async(req, res) => { // وكتبنا نفس الأسماء في ملف الاسكيما name="" حطينا المسار الي يرسل منه الركوست طبعنا الفور هذا داخلة الفرغات الي نعبيها طبعا سمينا كل واحد فيه  action="/user/add.html" نوع الركوست وفي   method="post"  لو تلاحظ حطينا حطينا في  <form  action="/user/add.html" method="post" class="mx-0 row gx-3 gy-4 mt-3"> بهذي الطريقة  add طبعاً هنا خطوة جداً مهمه المسار الي موجد كتبناه في ملف 
        //   console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
        //     const loginUser= await AuthUser.findOne({email: req.body.email});
        //     console.log(loginUser);
           
            
        //    if(loginUser==null)
        //    {
        //     console.log("the email not register")
        //    }else{
        //     const match = await bcrypt.compare(req.body.password, loginUser.password); // كود جاهز من مكتبة تشفير الباسورد عشان يتأكد من الباس المدخل مع الباس الي في قاعدة البيانات اذا صحيح يصير المتغير قيمة ترو واذا خطاء يصير فولص
        //     if(match){
        //       console.log("correct email and password ")
        //       // اكواد التوكن جاهزة
        //       var token = jwt.sign({ id: loginUser._id }, "shhhhh"); // انشانا منتغير وطلمبنا مكتلة التوكن ونحط اي اسم للبينات الي راح نخليها تصير توكن وبعده نحط البينات الي تبغاه يحطها في في التوكن من الافضل وضع الرأيد فقط وعدم وضع اليوزر والباسورد للأمان فقط واخر شي تحط رمز سري على التوكن حطيته اي شي
        //       res.cookie("jwt", token, { httpOnly: true, maxAge: 86400000 }); // هذا يحفظ داخل الكوكيز الوكل كلمة بين الاقواس هذا الكي الي راح يحفظ به والي بعدة التوكن والي بين القواس المطعجة اول واحد خاص في الحماية تقدر تبحث عن في قوقل واخر شي كم مدة حفظ التوكن وبعدين ينحذف بالملي سكند طبعا مسجل انا يوم كامل
        //       res.redirect("/home") // هذي يحول عليه مايتأكد من التوكن اذا ماكتبت هذا الكود مارح يشتغل معك 
        //  // ///اكواد التوكن جاهزة//

        //     }else{
        //       console.log("email and password not correct ")
        //     }

        //    }
        //       // console.log(result)
        //       // try{
        //       //   console.log(loginUser)
                
        //       //   res.redirect('/home') // هذا يحولك
        //       //  }
        //       //   catch(err){
        //       //   console.log(err)
        //       // }
            
        //     })
        


  



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







router.get('/home', requireAuth,restrictFactoryWorker, (req, res) => {
  User.find().then((result) => {
    const user = res.locals.user;  // هذه تم تمريرها مدالة التوكن عشان نرسل الصلاحيات إلى الفرنت اند عشان نخفي ونظهر بعض الأزرار
    res.render("index", { arr: result, moment: moment, permissions: user ? user.permissions : [] });
  }).catch((err) => {
    console.log(err);
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









module.exports = router // كود جاهز :تصدير الملفات



