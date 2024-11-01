
// تم الغاء هذه الاسكيما وضمها مع اسكيما المستخدم


//https://mongoosejs.com/docs/documents.html#updating-using-save الطريقة كامله لأستخدام اداة المنقز تلاقيها في موقعهم وانتبه للأحرف الكبتل في البداية ساوها زيهم هذا الرابط 

const mongoose = require("mongoose"); // كود جاهز استدعاء ادات المنقز 
const Schema = mongoose.Schema; // تجهيز الإسكيما من المنقز
 
// define the Schema (the structure of the article)

const userSchema = new Schema({// بناء الاسكيما مثل ما توريد

    
    
    firstNamecustomer: String,
    lastNamecustomer: String,
    phoneNumber: String,
    gender: String,
    branch: String,
    salesEmployeeId: String,
    salesEmployeeName: String,
    salesEmployeeUserName: String,
    orders: [{
        orderNumber: Number,
            status: String,
            status2: String,
            branch: String,
            location: String,
            salesEmployeeId: String,
            salesEmployeeName: String,
            salesEmployeeUserName: String,


            aluminumCode0:String ,
            aluminumThickness0: String,
            aluminumColorCode0: String,

            glasstype0: String,
            glassThickness0: String,
            glassColorCode0: String,
          
            TAX: Number, // الضريبة 
        // التسعيرات المحلية للطلب
            prices: { 
                slidingD10: Number,
                slidingD10p: Number,
                slidingD12: Number,
                slidingS: Number,
                interruptT: Number,
                interrupt: Number,
                fixedD10: Number,
                fixedD4: Number,
                fixedS10: Number,
                fixedS4: Number,
            
                GOLF10: Number,
                GOLF12: Number,
                ROYAL2: Number,
                ROYAL3: Number,
        
               
                ROYAL2: Number,
                
                // اسعار الستركتشر
                SG50: Number,
                SMART: Number,
                FORTICKS: Number,
            
                // سكاي لايت
                SKYLIGHT: Number,
                SKYLIGHT_FOR_WALK: Number,
            
                // سعر التيوبات
                T8CM: Number,
                T10CM: Number,
                FLAT: Number,
            
                // الابواب 
                SLICES_DOOR: Number,
                DOUBLE_GLASS_DOOR: Number
            },

            



      
                    measurement:[{
                        sequenceNumber: Number, // ترقيم القياس عند تأكيده
                        delete: Boolean, // حالة القياس هل هو محذوف طبعا لا بد ان يكون الطلب مؤكد
                        iid:String,
                        id_id:String,
                            H: Number,
                            W: Number,
                            designCode: String,

                            aluminumCode: String,
                            aluminumThickness: Number,
                            insideOrOutside: String,
                            aluminumColorCode: String,
                            aluminumSize: Number, // مقاس الألمنيوم نحتاجه فقط في الأستركتشر وال التيوبات
                            glasstype: String,
                            glassThickness: String,
                            // glassColorCode: String,
                            glassColorCodeInside: String,

                            glassColorCodeOutside: String,

                            fixed:String,
                            

                            glassCode: String,
                            temper: String,
                            lip: String,
                            illumination: String,  // الإنميشن 
                            comments: String,

                            totalMeters:{
                                H1: Number,
                                W1: Number,
                                totalMeters: Number,
                               
                            },


                            price:{ // التسعيرة

                                item: String,
                                umberOfMeters: Number,
                                price: Number,
                                
                                total: Number,
                            
                                },


                                // totalPrice:{ // التسعيرة

                 
                                //     totalBeforeTax: Number,
                                //     tax: Number,
                                //     totalWithTax: Number,
                                //     },

                                motherEquation: {

                                     E10 :Number,  // الحلق
                                     F10 :Number, // الكعب
                                     G10 :Number, // الشنكل
                                     H10 :Number, // الجنب
                                     I10 :Number,// درفة الشبك
                                     J10 :Number, //ربل درفة
                                     M10 :Number,// زجاج
                                     N10 :Number,// شبك حديد 2م
                                     Q10 :Number, // زجاج الثابت
                                     K10 :Number, // كفرات درفه 
                                     L10 :Number, // كفرات شبك 
                                     O10 :Number, //مسكة
                                     P10 :Number, // سيلكون المنيوم
                                    


                                },


                                cuttingTechnicianGlass: { type: Schema.Types.ObjectId, ref: 'AuthUser' },
                                cuttingStatusGlass: { type: Boolean, default: false },
                                assemblyTechnicianGlass: { type: Schema.Types.ObjectId, ref: 'AuthUser' },
                                assemblyStatusGlass: { type: Boolean, default: false },
                            



                                glassCuttingReport:{
                                    H: Number,
                                    W: Number,
                                    reportTemper: Number,
                                },


                                                //مختصه في صففخة ترير قص لالميم ذكاء صناعي                           
                               cuttingTechnician: { type: Schema.Types.ObjectId, ref: 'AuthUser' },   // هذا لكتابة ايد الفني 
                                cuttingStatus: { type: Boolean, default: false },
                                assemblyTechnician: { type: Schema.Types.ObjectId, ref: 'AuthUser' },
                                assemblyStatus: { type: Boolean, default: false },
                            

                                aluminumCuttingReport:{
                                    
                                    Q4: Number,
                                    R4: Number,
                                    S4: Number,
                                    T4: Number,
                                    U4: Number,
                                
                                },



                                // اضافه الوحدات مثل زيادة الشبابيك في نفس الطاقة
                                additions:{
                                    // الاستركتشر 
                                    Structure:{
                                        number: Number, // عدد الوحدات
                                        price: Number,
                                        totalPrice: Number,

                                       
                                    },

                                        // مفصلات 
                                    Hinges:{
                                        number: Number, // عدد الوحدات
                                        price: Number,
                                        totalPrice: Number,

                                    },

                                    // شباك رول
                                    
                               RollWindow:{
                                        number: Number, // عدد الوحدات
                                        price: Number,
                                        totalPrice: Number,

                                    }
                                   
                                },




                    }],
                    totalAllPrice:Number, // مجموع سعر  جميع القياسات

                    // totalMeters:[{
                    //     H1: Number,
                    //     W1: Number,
                    //     totalMeters: Number,
                       
                    // }],

                    // totalPrice: String,


                    totalPrice:{ // التسعيرة

                        
                    totalBeforeTax: Number,
                    Discount: Number,
                    totalAftereDiscount: Number,
                    tax: Number,
                    totalWithTax: Number,
                    },
                    


                    totalTempers:{ // مجموع امتار  السكريت وسعره 
                        
                        MetersPrice: Number, // سعر المتر لذا الاوردر يتم تعبديه تلقائي من قامه السعار ويمكن تعديله من الواجهه
                        totalTempersPrice: Number, // اجمالي السعر لكي الاسعار 
                        totalTempersMeters: Number, // مجموع امتار السكريت الي في الاوردر 
                
                        },




                    

                    motherEquationTotal:[ {
              // تجميع  العداد مع بعض بشرط نفس اسم القطاع
                        aluminumCode: String,
                        E10T :Number,  // الحلق
                        F10T :Number, // الكعب
                        G10T :Number, // الشنكل
                        H10T :Number, // الجنب
                        I10T :Number,// درفة الشبك
                        J10T :Number, //ربل درفة
                        M10T :Number,// زجاج
                        N10T :Number,// شبك حديد 2م
                        Q10T :Number, // زجاج الثابت
                        K10T :Number, // كفرات درفه 
                        L10T :Number, // كفرات شبك 
                        O10T :Number, //مسكة
                        P10T :Number, // سيلكون المنيوم
                // تجميع  العداد مع بعض بشرط نفس اسم القطاع//


// نفس الي فوق ولاكن تم عمل عمليات حسابيه عليها
                        E10TF :Number,  // الحلق
                        F10TF :Number, // الكعب
                        G10TF :Number, // الشنكل
                        H10TF :Number, // الجنب
                        I10TF :Number,// درفة الشبك
                        J10TF :Number, //ربل درفة
                        M10TF :Number,// زجاج
                        N10TF :Number,// شبك حديد 2م
                        Q10TF :Number, // زجاج الثابت
                        K10TF :Number, // كفرات درفه 
                        L10TF :Number, // كفرات شبك 
                        O10TF :Number, //مسكة
                        P10TF :Number, // سيلكون المنيوم
// نفس الي فوق ولاكن تم عمل عمليات حسابيه عليها//

                   }],









        
            // createdAt:Date
            createdAt: {
                type: Date,
                default: Date.now
              } ,
            updatedAt:{type:Date,default:Date.now},
        
  
    }]



},{ timestamps: true }); // اضفنا هذا عشان يطبع في الداتا التاريخ والوقت واخر تعديل 
 
 
// Create a model based on that schema
const User = mongoose.models.customer || mongoose.model('customer', userSchema);

 
// export the model
module.exports = User;  //app.js نصدر الداتا عشان نستقبلها في صفحة 