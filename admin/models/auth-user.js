// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
// const passportLocalMongoose = require('passport-local-mongoose');

// const authUserSchema = new Schema({
//     userName: { type: String, unique: true, required: true },
//     name: String,
//     password: String,
//     role: { type: String, enum: ['salesManager', 'salesMan', 'IndustrialManager', 'factoryWorker'], required: true },
//     permissions: [String]
// }, { timestamps: true });

// authUserSchema.plugin(passportLocalMongoose, { usernameField: 'userName' });

// const AuthUser = mongoose.models.AuthUser || mongoose.model("AuthUser", authUserSchema);

// module.exports = AuthUser;








const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const authUserSchema = new Schema({
    userName: { type: String, unique: true, required: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    // password: String,
    role: { type: String, enum: ['salesManager', 'salesMan', 'IndustrialManager', 'factoryWorker'], required: true },
    permissions: [String]
}, { timestamps: true });

authUserSchema.plugin(passportLocalMongoose, { usernameField: 'userName' });

// استخدام الشرطية للتحقق من وجود النموذج مسبقًا قبل تعريفه
const AuthUser = mongoose.models.AuthUser || mongoose.model('AuthUser', authUserSchema);

module.exports = AuthUser;
