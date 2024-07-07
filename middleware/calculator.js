//  فنكشن الحاسبة




const AuthUser = require("../models/auth-user") // تسيما الحسابات اليوزرات




var jwt = require("jsonwebtoken"); // تحضير مكتبة التوكن



function g (A=0){



}


g()

// فنكشن عشان تتأكد من انك مسجل الدخول عشان ماتزيد تدخل على صفحة الوق ان و تسجيل مستخدم زي كذا
const calculator  = async(req, res, next)=>{
  const n = await (req.body)
    // console.log(n)
    let v =req.body.a1*req.body.a2
    // res.locals.u =v
var vip = 10
// res.u =vip
// res.locals.u =v
      // console.log(v)
      
             next()
      
  };














module.exports = calculator


// module.exports ={

//   myFunc () {
  
//         const x =1
//         const y =2
//         return x+y
//     }
// }