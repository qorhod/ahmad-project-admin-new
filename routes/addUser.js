const express = require('express')//اكواد جاهزة من اكسبرس
const router = express.Router() // اكواد جاهزة من اكسبرس

// const User = require("../models/customersSchema")
const AuthUser = require("../models/auth-user") // تسيما الحسابات اليوزرات

var moment = require('moment'); // مكتبة لتعديل شكل التاريخ والوقت الوجودة في الداتا وعن طريق المنقوز





module.exports = router // كود جاهز :تصدير الملفات