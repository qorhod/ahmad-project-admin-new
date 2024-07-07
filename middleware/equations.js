
// يوجد هنا دالة فنكشن لتحقق من التوكن وفنكشن آخر تتأكد من تسجيل دخولك عشاد دعدل على الصغحاتي مثل صفحة تسجيل الدخول


const AuthUser = require("../models/auth-user") // تسيما الحسابات اليوزرات

const User = require("../models/customersSchema")

const commands = require("../models/commands")


// فنكشن التأكد من التكوكن الدرس رقم 8 مستوى 2
var jwt = require("jsonwebtoken"); // تحضير مكتبة التوكن









// في ملف يحتوي على الدالة calculateResults.js
  function  calculateResults(data) {

   
      

// console.log("ggggggggggggggggggggggggggg")

    var h = data.h;
    var w = data.w;
    var lip = data.lip;
    var aluminumCode = data.aluminumCode;

    let resultH;
    let resultW;

    // حساب النتيجة للمترين الأول والثاني بناءً على نوع الألمنيوم
    if (aluminumCode === "Sliding D10") {
        resultH = lip==="YAS"?h + 5:h;
        resultW = lip==="YAS"?w + 5:w;
    } else if (aluminumCode === "Sliding D12") {
        resultH = lip==="YAS"?h + 10:h;
        resultW = lip==="YAS"?w + 10:w;
    } else if (aluminumCode === "GOLF10") {
        resultH = lip==="YAS"?h + 6:h;
        resultW =  lip==="YAS"?w + 6:w;
    } else if (aluminumCode === "ROYAL 2" || aluminumCode === "ROYAL 3" || aluminumCode === "Fixed S10" || aluminumCode === "Fixed D10" || aluminumCode === "Sliding S" || aluminumCode === "GOLF12" || aluminumCode === "Sliding D10+" || aluminumCode === "Fixed D4") {
        resultH = lip==="YAS"?h + 8:h;
        resultW = lip==="YAS"?w + 8:w;
    } else if (aluminumCode === "Fixed S4") {
        resultH = lip==="YAS"?h + 5.6:h;
        resultW = lip==="YAS"?w + 5.6:w;
    } 

    let H1 = resultH;
    let W1 = resultW;

    // قم بتحويل الصيغة إلى الشكل البرمجي
    let totalMeters;
    if (H1 * W1 / 10000 < 1 && H1 * W1 / 10000 !== 0 && H1 * W1 / 10000 !== "FALSE") {
        totalMeters = 1;
    } else {
        totalMeters = H1 * W1 / 10000;
    }



// معادلة حساب السعر

    // function  functionPrice(price) {
      

        var fixedD10= 450
        var  slidingD10= 530
         var slidingD10b= 500
         var slidingD12= 550
         var slidingS= 300
        
      
         var fixedD4= 300
         var fixedS10= 350
         var fixedS4= 300
     
         var GOLF10= 550
         var GOLF12= 600
         var ROYAL2= 700
         var ROYAL3= 1000
    
    
        //  commands.findById("65f99ec185fc1702281d9695")
        //  .then((result)=>{
        //      console.log(result.price.DoorD10)
        //     })
    // معادلة التسعيره
    
    var input = "Sliding D10"
    
    // var price = 450 // السعر
    
    var discound =data.discound ||0 // الخصم
    var totalMetersp = 2.85585 // مجموع الامتار
    var measurementUnits;
    let total;
    let price ;
    if(aluminumCode==="Fixed D10"){
    total = (fixedD10-discound)*totalMeters
    price=fixedD10
    
    }else if(aluminumCode==="Sliding D10"){
    total = (slidingD10-discound)*totalMeters
    price=slidingD10
    
    }else if(aluminumCode==="Sliding D12"){
    total = (slidingD12-discound)*totalMeters
    price=slidingD12
    
    }else if(aluminumCode==="GOLF10"){
    total = (GOLF10-discound)*totalMeters
    price=GOLF10
    
    }else if(aluminumCode==="ROYAL 2"){
    total = (ROYAL2-discound)*totalMeters
    price=ROYAL2
    
    }else if(aluminumCode==="ROYAL 3"){
    total = (ROYAL3-discound)*totalMeters
    price=ROYAL3

    }else if(aluminumCode==="Fixed S10"){
    total = (fixedS10-discound)*totalMeters
    price=fixedS10
    
    }else if(aluminumCode==="Sliding S"){
    total = (slidingS-discound)*totalMeters
    price=slidingS
    
    }else if(aluminumCode==="GOLF12"){
    total = (GOLF12-discound)*totalMeters
    price=GOLF12
    
    }else if(aluminumCode==="Sliding D10+"){
    total = (slidingD10b-discound)*totalMeters
    price=slidingD10b
    
    }else if(aluminumCode==="Fixed D4"){
    total = (fixedD4-discound)*totalMeters
    price=fixedD4
    
    }else if(aluminumCode==="Fixed S4"){
    total = (fixedS4-discound)*totalMeters
    price=fixedS4
    
    }
    
    // return { total };
    
    // console.log(total)
    
    
    // معادلة حساب السعر//
    
   


    // console.log(totalMeters); // النتيجة
if({ resultH, resultW ,totalMeters,total,price }){
    return { resultH, resultW ,totalMeters,total,price };
}else{

    return false
    //  json({ err:"نوع الألمنيوم غير صحيح" })
}

}










function  functionPrice(price) {


    var fixedD10= 450
    var  slidingD10= 530
     var slidingD10b= 500
     var slidingD12= 550
     var slidingS= 300
    
  
     var fixedD4= 300
     var fixedS10= 350
     var fixedS4= 300
 
     var GOLF10= 550
     var GOLF12= 600
     var ROYAL2= 700
     var ROYAL3= 1000



// معادلة التسعيره

var input = "Sliding D10"

var price = 450 // السعر

var discound =0 // الخصم
var totalMetersp = 2.85585 // مجموع الامتار
var measurementUnits;
let total;

if(input==="Fixed D10"){
total = (fixedD10-discound)*totalMetersp


}else if(input==="Sliding D10"){
total = (slidingD10-discound)*totalMetersp


}else if(input==="Sliding D12"){
total = (slidingD12-discound)*totalMetersp


}else if(input==="GOLF10"){
total = (GOLF10-discound)*totalMetersp


}else if(input==="ROYAL 2"){
total = (ROYAL2-discound)*totalMetersp


}else if(input==="ROYAL 3"){
total = (ROYAL3-discound)*totalMetersp


}else if(input==="Fixed S10"){
total = (fixedS10-discound)*totalMetersp


}else if(input==="Sliding S"){
total = (slidingS-discound)*totalMetersp


}else if(input==="GOLF12"){
total = (GOLF12-discound)*totalMetersp


}else if(input==="Sliding D10+"){
total = (slidingD10b-discound)*totalMetersp


}else if(input==="Fixed D4"){
total = (fixedD4-discound)*totalMetersp


}else if(input==="Fixed S4"){
total = (fixedS4-discound)*totalMetersp


}

return { total };

// console.log(total)




}

// console.log(total)



// معادلة تحديث الجمالي والضريبة
// async function   updateTotal(iid) {



// let priceTot = await 0;
// const h = await User.findOne({'orders._id': iid})
// const foundObject = await h.orders.find(item => item.id === iid); //  عشان يعطيني البجكت حامل هذا الادي من الداتا
// foundObject.measurement.reverse().forEach((item, index) => {  
//   priceTot +=item.price.total;

 
// })
// let taxx  = priceTot*15/100
// let priceTotAndtaxx= priceTot+taxx
// console.log("الاجمالي",priceTot,taxx,priceTotAndtaxx)
// const totalAndTax = {
//   // totalPrice:"22"
//   // totalPrice:{ // التسعيرة

                 
//     totalBeforeTax: priceTot,
//     tax: taxx,
//     totalWithTax: priceTotAndtaxx,
//     // }
// }

//       const nm = await User.updateOne(
//         { "orders._id": iid }, 
//         { $set: { "orders.$[orderElem].totalPrice": totalAndTax } }, 
//         { 
//           // arrayFilters: [ { "orderElem._id": v.id } ],
//           arrayFilters: [ { "orderElem._id": iid } ],

//           new: true 
//         }
//         );


// let done ="done"
//         if({ nm }){
//             return { done};
//         }else{
        
//             return false
//             //  json({ err:"نوع الألمنيوم غير صحيح" })
//         }

// }

//// معادلة تحديث الجمالي والضريبة////


async function updateTotal(iid) {
    let priceTot = 0;
    
    const h = await User.findOne({'orders._id': iid});
    
    const foundObject = h.orders.find(item => item.id === iid); //  عشان يعطيني البجكت حامل هذا الادي من الداتا
    if(foundObject.measurement[0]  ){ // هذا الشرط عشان اذا اخر قياس ماهو موجود ما يطلع خطا وتصير النتأج اصفار
    foundObject.measurement.reverse(); // قلب الترتيب للبدء من القيم الأحدث
    for (const item of foundObject.measurement) {
        priceTot += item.price.totalWithDiscount ;
    }
}
    let taxx  = priceTot * 0.15;
    let priceTotAndtaxx = priceTot + taxx;
    console.log("الاجمالي", priceTot, taxx, priceTotAndtaxx);
    const totalAndTax = {
        totalBeforeTax: priceTot ,
        tax:taxx ,
        totalWithTax:  priceTotAndtaxx ,
    };

  

    const nm = await User.updateOne(
        { "orders._id": iid }, 
        { $set: { "orders.$[orderElem].totalPrice": totalAndTax } }, 
        { 
            arrayFilters: [ { "orderElem._id": iid } ],
            new: true 
        }
    );

    if (nm.nModified > 0) {
        return { done: "done" };
    } else {
        return false;
    }
}













// let dataId ={

//     iid: ,
//     // id:,
//         aluminumCodeFront:
//     }
//     refreshDiscount(dataId)

// معادلة تحديث الخصم لما تضيف اول تعدل اوردر تجمع الخصم ثم تقسمه على عدد الوردرات التي بنفس القطاع

async function refreshDiscount(dataId) {
// المدخلات
let iid = dataId.iid // id for order
let id=   ""  //dataId.id // id for mesurement
let aluminumCodeFront = ""
let  mm =NaN

const findDate = await  User.findOne({'orders._id': iid})

    const h =  findDate

  const foundObject = await h.orders.find(item => item.id === iid); //  عشان يعطيني البجكت حامل هذا الادي من الداتا

if (foundObject.measurement[0]  === 'object'){   // كتبة هذا الشرط عاش اذا جينا نحذف اخر قياس يصير مشكلة لانه القياس غير موجود 

  if(dataId.id){
    id=dataId.id
     mm = foundObject.measurement.find(item => item.id === id); //  عشان يعطيني البجكت حامل هذا الادي من الداتا
    
    }else{
        aluminumCodeFront=dataId.aluminumCodeFront
    }



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
  if((aluminumCodeFront?aluminumCodeFront:mm.aluminumCode)===key){
    aluminumCode=key
    price = value.value1
   total = value.value2
    discount = value.value3
   
  
  
  }


  })
      console.log(aluminumCode,price,total,discount)







  foundObject.measurement.forEach(async (item,index) => {
    if((aluminumCodeFront?aluminumCodeFront:mm.aluminumCode)===item.aluminumCode){
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



if (result) {
    return { done: "done" };
} else {
    return false;
}

}

}



// دالة المعادلات الام
function motherEquation(data){
        
    const aluminumCode = data.aluminumCode;
    const B10 =data.h ; //W
    const C10 =data.w ;//H
    const D10 = 0; // الثابت باقي نضيفه
    if (aluminumCode === "ROYAL 2" || aluminumCode === "ROYAL 3" || aluminumCode === "Sliding D12" || aluminumCode === "GOLF10" || aluminumCode === "Sliding S" || aluminumCode === "GOLF12" || aluminumCode === "Sliding D10+" || aluminumCode === "Sliding D10") {
    const E10 = ((B10 / 100) * 2) + ((C10 / 100) * 2);  // الحلق
    const F10 = (((((C10 - 7) / 2) + 3.5) - 11) / 100 * 2) * 2; // الكعب
    const G10 = (B10 - 6.5 - D10) / 100 * 2; // الشنكل
    const H10 = (B10 - 6.5 - D10) / 100 * 2; // الجنب
    const I10 = (((B10 - 6.5 - D10) * 2) / 100) + (((((C10 - 7) / 2) + 3) * 2) / 100); // درفة الشبك
    const J10 = ((F10) + (H10 - 0.24)) * 2; //ربل درفة
    const M10 =(((((((C10 - 5) / 2) - 4.5) / 100) * ((B10 - 14) / 100)) * 2) * 2);// زجاج
    const N10 = ((B10 - 10) * ((C10 / 2) - 10)) / 10000; // شبك حديد 2م
    const Q10 = (B10 * C10) / 10000; // زجاج الثابت
    const K10 = Math.ceil(C10 / 100) * 2; // كفرات درفه 
    const L10 = Math.ceil(C10 / 100) * 2; // كفرات شبك 
    const O10 = Math.ceil(C10 / 100) * 2; //مسكة
    const P10 = Math.ceil(C10 / 350) * 1; // سيلكون المنيوم
    
    
    
        return { E10, F10 ,G10,H10,I10,J10,M10,N10,Q10,K10,L10,O10,P10 };
    
    }else if(aluminumCode === "Fixed D10" || aluminumCode === "Fixed D4" || aluminumCode === "Fixed S4" || aluminumCode === "Fixed S10" ){
    
        const E10 = ((B10 / 100) * 2) + ((C10 / 100) * 2);  // الحلق
    const F10 = (((((C10 - 7) / 2) + 3.5) - 11) / 100 * 2) * 2; // الكعب
    const G10 = (B10 - 6.5 - D10) / 100 * 2; // الشنكل
    const H10 = (B10 - 6.5 - D10) / 100 * 2; // الجنب
    const I10 = (((B10 - 6.5 - D10) * 2) / 100) + (((((C10 - 7) / 2) + 3) * 2) / 100); // درفة الشبك
    const J10 = ((F10) + (H10 - 0.24)) * 2; //ربل درفة
    const M10 =(((((((C10 - 5) / 2) - 4.5) / 100) * ((B10 - 14) / 100)) * 2) * 2);// زجاج
    const N10 = ((B10 - 10) * ((C10 / 2) - 10)) / 10000; // شبك حديد 2م
    const Q10 = (B10 * C10) / 10000; // زجاج الثابت
    // const K10 = Math.ceil(C10 / 100) * 2; // كفرات درفه 
    // const L10 = Math.ceil(C10 / 100) * 2; // كفرات شبك 
    // const O10 = Math.ceil(C10 / 100) * 2; //مسكة
    const P10 = Math.ceil((C10+B10) / 350) * 2; // سيلكون المنيوم
    Q10==((B10 * C10) / 10000)*2
    // P10=P10/2

        return { Q10, E10 ,P10 };
    
    }
    }
// دالة المعادلات الام//



// دالة تابعه لدالة الام ولاكنها تحسب النواتج الي تحت


function totalMotherEquation(measurement) {

    // هذا القسم جمع مجموع كل قطاع على حده ومن ثم يخرجها في اري إلى القسم التالي
      var combinedResults = {};
    measurement.measurement.forEach(function(item) {
      var code = item.aluminumCode;
      if (combinedResults[code]) {
        Object.keys(item.motherEquation).forEach(function(key) {
          combinedResults[code][key] = (combinedResults[code][key] || 0) + item.motherEquation[key];
        });
      } else {
        combinedResults[code] = { ...item.motherEquation };
      }
    });
    
    // var resultElement = document.getElementById("ww");
    // var htmlString = "";
    var resultsArray = [];
    
    Object.keys(combinedResults).forEach(function(key) {
      var item = combinedResults[key];
      resultsArray.push({ aluminumCode: key });
    //   htmlString += "<h3>" + key + "</h3>";
      Object.keys(item).forEach(function(subKey) {
        resultsArray[resultsArray.length - 1][subKey] = item[subKey];
        // htmlString += "<p>" + subKey + ": " + item[subKey] + "</p>";
      });
      // htmlString += "<hr>";
    });
    
    // console.log(resultsArray);
    // resultElement.innerHTML = htmlString;
        
    // هذا القسم جمع مجموع كل قطاع على حده ومن ثم يخرجها في اري إلى القسم التالي//
    
    
    
    
    
    
    
    
    
    
    
      var resultsArray1 = [];
      resultsArray.forEach(function(item) {
            var aluminumCode = item.aluminumCode;
    
            var sumE10 = 0,
                sumF10 = 0,
                sumG10 = 0,
                sumH10 = 0,
                sumI10 = 0,
                sumJ10 = 0,
                sumM10 = 0,
                sumN10 = 0,
                sumQ10 = 0,
                sumK10 = 0,
                sumL10 = 0,
                sumO10 = 0,
                sumP10 = 0;
    
            if (aluminumCode === "ROYAL 2" || aluminumCode === "ROYAL 3" || aluminumCode === "Sliding D12" || aluminumCode === "GOLF10" || aluminumCode === "Sliding S" || aluminumCode === "GOLF12" || aluminumCode === "Sliding D10+" || aluminumCode === "Sliding D10") {
                sumE10 += item.E10;
                sumF10 += item.F10;
                sumG10 += item.G10;
                sumH10 += item.H10;
                sumI10 += item.I10;
                sumJ10 += item.J10;
                sumM10 += item.M10;
                sumN10 += item.N10;
                sumQ10 += item.Q10;
                sumK10 += item.K10;
                sumL10 += item.L10;
                sumO10 += item.O10;
                sumP10 += item.P10;
    
                if (aluminumCode === "Sliding D12" || aluminumCode === "GOLF10" || aluminumCode === "Sliding S" || aluminumCode === "GOLF12" || aluminumCode === "Sliding D10") {
                    let pasE10 = sumE10 / 5.8,
                        pasH10 = sumH10 / 5.8,
                        pasF10 = sumF10 / 5.8,
                        pasI10 = sumI10 / 6;
    
                    resultsArray1.push({
                        aluminumCode: item.aluminumCode,
                        E10F: Math.ceil(pasE10),
                        H10F: Math.ceil(pasH10),
                        F10F: Math.ceil(pasF10),
                        I10F: Math.ceil(pasI10),

                        E10T :Math.ceil(item.E10),  // الحلق
                        F10T :Math.ceil(item.F10), // الكعب
                        G10T :Math.ceil(item.G10), // الشنكل
                        H10T :Math.ceil(item.H10), // الجنب
                        I10T :Math.ceil(item.I10),// درفة الشبك
                        J10T :Math.ceil(item.J10), //ربل درفة
                        M10T :Math.ceil(item.M10),// زجاج
                        N10T :Math.ceil(item.N10),// شبك حديد 2م
                        Q10T :Math.ceil(item.Q10), // زجاج الثابت
                        K10T :Math.ceil(item.K10), // كفرات درفه 
                        L10T :Math.ceil(item.L10), // كفرات شبك 
                        O10T :Math.ceil(item.O10), //مسكة
                        P10T :Math.ceil(item.P10), // سيلكون المنيوم
                    });
                } else if (aluminumCode === "ROYAL 2") {
                    let pasE10 = sumE10 / 6,
                        pasH10 = sumH10 / 6,
                        pasF10 = sumF10 / 6,
                        pasI10 = sumI10 / 6;
    
                    resultsArray1.push({
                        aluminumCode: item.aluminumCode,
                        E10F: Math.ceil(pasE10),
                        H10F: Math.ceil(pasH10),
                        F10F: Math.ceil(pasF10),
                        I10F: Math.ceil(pasI10),
                        
                        E10T :Math.ceil(item.E10),  // الحلق
                        F10T :Math.ceil(item.F10), // الكعب
                        G10T :Math.ceil(item.G10), // الشنكل
                        H10T :Math.ceil(item.H10), // الجنب
                        I10T :Math.ceil(item.I10),// درفة الشبك
                        J10T :Math.ceil(item.J10), //ربل درفة
                        M10T :Math.ceil(item.M10),// زجاج
                        N10T :Math.ceil(item.N10),// شبك حديد 2م
                        Q10T :Math.ceil(item.Q10), // زجاج الثابت
                        K10T :Math.ceil(item.K10), // كفرات درفه 
                        L10T :Math.ceil(item.L10), // كفرات شبك 
                        O10T :Math.ceil(item.O10), //مسكة
                        P10T :Math.ceil(item.P10), // سيلكون المنيوم
                    });
                }
            } else if (aluminumCode === "Fixed D10" || aluminumCode === "Fixed D4" || aluminumCode === "Fixed S4" || aluminumCode === "Fixed S10") {
                sumE10 += item.E10;
                sumF10 += item.F10;
                sumG10 += item.G10;
                sumH10 += item.H10;
                sumI10 += item.I10;
                sumJ10 += item.J10;
                sumM10 += item.M10;
                sumN10 += item.N10;
                sumQ10 += item.Q10;
                sumK10 += item.K10;
                sumL10 += item.L10;
                sumO10 += item.O10;
                sumP10 += item.P10;
    
                if (aluminumCode === "Fixed D10" || aluminumCode === "Fixed D4") {
                    let pasE10 = sumE10 / 5.8;
    
                    resultsArray1.push({
                        aluminumCode: item.aluminumCode,
                        E10F: Math.ceil(pasE10),
                        Q10F: Math.ceil(sumQ10*2),
                        P10F: Math.ceil(sumP10),
                        E10T :Math.ceil(item.E10),  // الحلق
                        F10T :Math.ceil(item.F10), // الكعب
                        G10T :Math.ceil(item.G10), // الشنكل
                        H10T :Math.ceil(item.H10), // الجنب
                        I10T :Math.ceil(item.I10),// درفة الشبك
                        J10T :Math.ceil(item.J10), //ربل درفة
                        M10T :Math.ceil(item.M10),// زجاج
                        N10T :Math.ceil(item.N10),// شبك حديد 2م
                        Q10T :Math.ceil(item.Q10), // زجاج الثابت
                        K10T :Math.ceil(item.K10), // كفرات درفه 
                        L10T :Math.ceil(item.L10), // كفرات شبك 
                        O10T :Math.ceil(item.O10), //مسكة
                        P10T :Math.ceil(item.P10), // سيلكون المنيوم
                    });
                } else {
                    let pasE10 = sumE10 / 5.8;
    
                    resultsArray1.push({
                        aluminumCode: item.aluminumCode,
                        E10F: Math.ceil(pasE10),
                        Q10F: Math.ceil(sumQ10),
                        P10F: Math.ceil(sumP10),
                        E10T :Math.ceil(item.E10),  // الحلق
                        F10T :Math.ceil(item.F10), // الكعب
                        G10T :Math.ceil(item.G10), // الشنكل
                        H10T :Math.ceil(item.H10), // الجنب
                        I10T :Math.ceil(item.I10),// درفة الشبك
                        J10T :Math.ceil(item.J10), //ربل درفة
                        M10T :Math.ceil(item.M10),// زجاج
                        N10T :Math.ceil(item.N10),// شبك حديد 2م
                        Q10T :Math.ceil(item.Q10), // زجاج الثابت
                        K10T :Math.ceil(item.K10), // كفرات درفه 
                        L10T :Math.ceil(item.L10), // كفرات شبك 
                        O10T :Math.ceil(item.O10), //مسكة
                        P10T :Math.ceil(item.P10), // سيلكون المنيوم
                    });
                }
            }
        });
        // console.log("u",resultsArray1);
      
    var resultsArrayBefore = resultsArray // نتأج المعادلة الأولى حقت جمع القطاعات المتشابها 
    var resultsArrayAfter = resultsArray1  // نتأج المعادلة الثانيه
        return {resultsArrayBefore,resultsArrayAfter};
    }
    // دالة تابعه لدالة الام ولاكنها تحسب النواتج الي تحت//

    // قم بتعريف measurement كمتغير مزيف هنا
    // على سبيل المثال:
    // var measurement = [{ aluminumCode: "ROYAL 2", E10: 10, F10: 20, G10: 30, H10: 40, I10: 50, J10: 60, M10: 70, N10: 80, Q10: 90, K10: 100, L10: 110, O10: 120, P10: 130 }];
    
    // استدعاء الدالة وحفظ نتائجها
    // var {resultsArrayBefore,resultsArrayAfter} = totalMotherEquationwww(measurement);
    
    // console.log("Before:",resultsArrayBefore);
    
    // console.log("After:",resultsArrayAfter);









            //  دالة تقرير قص الزجاج لسحاب

            // function calculateValues(C4, B10, C10) {
            //     var valueA, valueB;
            
            //     if (C4 === "Sliding D12") {
            //         valueA = (C10 / 2) - 8.75;
            //         valueB = B10 - 15;
            //     } else if (C4 === "GOLF10") {
            //         valueA = (C10 / 2) - 9;
            //         valueB = B10 - 16.4;
            //     } else if (C4 === "GOLF12") {
            //         valueA = (C10 / 2) - 9;
            //         valueB = B10 - 16.4;
            //     } else if (C4 === "Sliding D10") {
            //         valueA = (C10 / 2) - 8.8;
            //         valueB = B10 - 16;
            //     } else if (C4 === "ROYAL 2") {
            //         valueA = (C10 / 2) - 6;
            //         valueB = B10 - 19.6;
            //     } else if (C4 === "Sliding D10+") {
            //         valueA = (C10 / 2) - 8.8;
            //         valueB = B10 - 16;
            //     } else if (C4 === "Sliding S") {
            //         valueA = (C10 / 2) - 6.7;
            //         valueB = B10 - 14.5;
            //     } else if (C4 === "Fixed D10") {
            //         valueA = C10 - 5;
            //         valueB = B10 - 5;
            //     } else if (C4 === "Fixed D4") {
            //         valueA = C10 - 6.1;
            //         valueB = B10 - 6.1;
            //     } else if (C4 === "Fixed S10") {
            //         valueA = C10 - 4.7;
            //         valueB = B10 - 4.5;
            //     } else if (C4 === "Fixed S4") {
            //         valueA = C10 - 4.1;
            //         valueB = B10 - 3.9;
            //     } else {
            //         // Return default values or handle other cases
            //         valueA = 0;
            //         valueB = 0;
            //     }
            
            //     return {valueA: valueA.toFixed(2), valueB: valueB.toFixed(2)};
            // }
            




            function calculateValues(C4, B10, C10) { //الطول ,العرض  ,اسم القطاع
                var valueA, valueB, valueC; // الطول  ,العرض ,امتار التنبر
                
                if (C4 === "Sliding D12") {
                    valueA = (C10 / 2) - 8.75;
                    valueB = B10 - 15;
                    valueC = ((valueA * valueB) * 2)/10000
                } else if (C4 === "GOLF10") {
                    valueA = (C10 / 2) - 9;
                    valueB = B10 - 16.4;
                    valueC = ((valueA * valueB) * 2)/10000
                } else if (C4 === "GOLF12") {
                    valueA = (C10 / 2) - 9;
                    valueB = B10 - 16.4;
                    valueC = ((valueA * valueB) * 2)/10000
                } else if (C4 === "Sliding D10") {
                    valueA = (C10 / 2) - 8.8;
                    valueB = B10 - 16;
                    valueC = ((valueA * valueB) * 2)/10000
                } else if (C4 === "ROYAL 2") {
                    valueA = (C10 / 2) - 6;
                    valueB = B10 - 19.6;
                    valueC = ((valueA * valueB) * 2)/10000
                } else if (C4 === "Sliding D10+") {
                    valueA = (C10 / 2) - 8.8;
                    valueB = B10 - 16;
                    valueC = ((valueA * valueB) * 2)/10000
                } else if (C4 === "Fixed D10") {
                    valueA = C10 - 5;
                    valueB = B10 - 5;
                    valueC = ((valueA * valueB) * 2)/10000
                } else if (C4 === "Fixed D4") {
                    valueA = C10 - 6.1;
                    valueB = B10 - 6.1;
                    valueC = ((valueA * valueB) * 2)/10000
                } else if (C4 === "Fixed S4") {
                    valueA = C10 - 4.1;
                    valueB = B10 - 3.9;
                    valueC = (valueA * valueB)/10000;  // Skip the calculation for valueC
                } else if (C4 === "Fixed S10") {
                    valueA = C10 - 4.7;
                    valueB = B10 - 4.5;
                    valueC = (valueA * valueB)/10000;  // Skip the calculation for valueC
                } else if (C4 === "Sliding S") {
                    valueA = (C10 / 2) - 6.7;
                    valueB = B10 - 14.5;
                    valueC = (valueA * valueB)/10000;  // Skip the calculation for valueC
                } else {
                    // Return default values or handle other cases
                    valueA = 0;
                    valueB = 0;
                    valueC = 0;
                }
                
          
                
                return {valueA: valueA.toFixed(2), valueB: valueB.toFixed(2), valueC: valueC.toFixed(2)};
            }






            // // Example usage:
            // var C4 = "GOLF10";
            // var B10 = 211; // Replace this with the actual value of B10
            // var C10 = 195.5; // Replace this with the actual value of C10
            // var results = calculateValues(C4, B10, C10);
            // console.log(results.valueA); // Output the calculated value of A
            // console.log(results.valueB); // Output the calculated value of B
            // console.log(results.valueC);
            // // دالة تقرير القص//







            // معادلة تقرير قص الألمنيوم
function aluminumCuttingReport(M4,B10,C10,) {
    let E4 = ((C10 / 2 - 0.1) - 0.02);
    const I4 = B10 - 6.5 + 0.2;
    const F4 = I4 + 0.8;
    const G4 = B10 - 6.5 + 0.2;
    const H4 = ((C10 / 2) - 8.3);
    
    let Q4, R4, S4, T4, U4;

    if (M4 === "Sliding D12") {
        Q4 = E4 + 1 - 1.18;
        R4 = F4 + 1 - 1;
        S4 = G4 + 1 - 1;
        T4 = H4 + 1 - 1;
        U4 = I4 + 1 - 1;
    } else if (M4 === "GOLF10" || M4 === "GOLF12") {
        Q4 = E4 - 1 + 1.52 + 0.4;
        R4 = F4 - 1 + 1.3 - 0.4;
        S4 = G4 - 1 + 1.3;
        T4 = H4 - 1 + 0.7 + 8.9;
        U4 = I4 - 1 + 1.4 - 0.1;
    } else if (M4 === "Sliding D10" || M4 === "Sliding D10+" || M4 === "Sliding S") {
        Q4 = E4;
        R4 = F4;
        S4 = G4;
        T4 = H4;
        U4 = I4;
    } else if (M4 === "ROYAL 2") {
        Q4 = E4 - 1 + 5.82;
        R4 = F4 - 1 - 1.3;
        S4 = G4 - 1 - 1.3;
        T4 = H4 - 1 + 8.8;
        U4 = I4 - 1 - 1.3;
    } else if (M4 === "Fixed D10" || M4 === "Fixed D4" || M4 === "Fixed S10" || M4 === "Fixed S4") {
        // Q4 = "--";
        // R4 = "--";
        // S4 = "--";
        // T4 = "--";
        // U4 = "--";
        Q4 = 0;
        R4 = 0;
        S4 = 0;
        T4 = 0;
        U4 = 0;
    }

    return { Q4, R4, S4, T4, U4 };
}

// تستخدم الدالة بمثال:
// let B10 = 161
// let C10= 196.5
// let M4= "GOLF10"
// const result = aluminumCuttingReport(M4,B10,C10);
// console.log(result);


// معادلة تقرير قص الألمنيوم//


// module.exports = calculateResults;
module.exports = {calculateResults,functionPrice,updateTotal,refreshDiscount,motherEquation,totalMotherEquation,calculateValues,aluminumCuttingReport}














// module.exports = {}

// module.exports = {requireAuth}
// module.exports = {checkIfUser}