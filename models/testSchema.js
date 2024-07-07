           //   هذا الملف فيه الاسكيما حقت تسجيل مستخدم جديد



           //https://mongoosejs.com/docs/documents.html#updating-using-save الطريقة كامله لأستخدام اداة المنقز تلاقيها في موقعهم وانتبه للأحرف الكبتل في البداية ساوها زيهم هذا الرابط 

           const mongoose = require("mongoose"); // كود جاهز استدعاء ادات المنقز 
           const Schema = mongoose.Schema; // تجهيز الإسكيما من المنقز
            
           // define the Schema (the structure of the article)
           
        //    const authUserSchema = new Schema({// بناء الاسكيما مثل ما توريد
           
        //        // تكتب الكي الي تبغى وبعدة نوعة عشان يتخزن في الداتا
        //        profileImage:String,
        //        userName: String,
        //        email: String,
        //        password: String,
        //        customerInfo: [{
        //            firstName: String,
        //            lastName: String,
        //            email: String,
        //            phoneNumber: String,
        //            age: Number,
        //            country: String,
        //            gender: String,
        //            createdAt:Date,
        //            updatedAt:{type:Date,default:Date.now},
             
        //        }]
               




               const authUserSchema = new Schema({// بناء الاسكيما مثل ما توريد
           
                // تكتب الكي الي تبغى وبعدة نوعة عشان يتخزن في الداتا
                // بينات العميل
                firstNamecustomer: String,
                lastNamecustomer: String,
                phoneNumber: String,
                gender: String,
                branch: String,
                salesEmployeeId: Number,
                salesEmployeeName: String,
                salesEmployeeUserName: String,
                orders: [{
                        status: String,
                        branch: String,
                        location: String,
                        salesEmployeeId: Number,
                        salesEmployeeName: String,
                        salesEmployeeUserName: String,
                    
                                measurement:[{
                                        H: Number,
                                        W: Number,
                                        fixed: Boolean,
                                        aluminumCode: String,
                                        aluminumColorCode: String,
                                        glassColorCode: String,
                                        temper: Boolean,
                                        designCode: String,
                                        thickness: Number,
                                        insideOrOutside: String,
                                        comments: String,


                                }],
                                
                                totalMeters:[{
                                    H1: Number,
                                    W1: Number,
                                    totalMeters: Number,
                                   
                                }],


                                price:[{ // التسعيرة

                                item: String,
                                umberOfMeters: Number,
                                price: Number,
                                discount: Number,
                                total: Number,
                                totalBeforeTax: Number,
                                tax: Number,
                                totalWithTax: Number,
                                }],
                                

                    
                        createdAt:Date,
                        updatedAt:{type:Date,default:Date.now},
                    
              
                }]










           },{ timestamps: true }); // اضفنا هذا عشان يطبع في الداتا التاريخ والوقت واخر تعديل 
            
           //  لتشفير كلمة المرور للمستخدمين i npm bcryptاكواد جاهزة من مكتبة 
           const bcrypt = require('bcrypt');
           
           authUserSchema.pre("save", async function (next) { //لازم الاسم نفس اسم التغير حق الاسكيما الي فوق
            const salt = await bcrypt.genSalt();
            this.password = await bcrypt.hash(this.password, salt);
            next();
           });
           
           
            
           // Create a model based on that schema
           const AuthUser = mongoose.model("User", authUserSchema);  //كأنه نشأ اري وداخل اري يبدا يكتب البيانات الي نبغا بصيغة ابجكت customer عشان ننشاء مكان في الداتا بيز بهذا الأسم 
            
            
           // export the model
           module.exports = AuthUser;  //app.js نصدر الداتا عشان نستقبلها في صفحة 