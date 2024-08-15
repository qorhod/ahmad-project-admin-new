
const mongoose = require("mongoose"); // كود جاهز استدعاء ادات المنقز 
const Schema = mongoose.Schema; // تجهيز الإسكيما من المنقز
 
// define the Schema (the structure of the article)

const userSchema = new Schema({// بناء الاسكيما مثل ما توريد

    
    
    
    TAX: Number,

    price: { 
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
                    

        
            createdAt:Date,
            updatedAt:{type:Date,default:Date.now},
        
  
    



},{ timestamps: true }); // اضفنا هذا عشان يطبع في الداتا التاريخ والوقت واخر تعديل 
 
 
// Create a model based on that schema
const prices = mongoose.model("prices", userSchema);  //كأنه نشأ اري وداخل اري يبدا يكتب البيانات الي نبغا بصيغة ابجكت customer عشان ننشاء مكان في الداتا بيز بهذا الأسم 
 
 
// export the model
module.exports = prices;  //app.js نصدر الداتا عشان نستقبلها في صفحة 