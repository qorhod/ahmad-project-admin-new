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







// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
// const passportLocalMongoose = require('passport-local-mongoose');

// const authUserSchema = new Schema({
//     userName: { type: String, unique: true, required: true },
//     name: { type: String, required: true },
//     password: { type: String, required: true },
//     role: { type: String, enum: ['salesManager', 'salesMan', 'IndustrialManager', 'factoryWorker'], required: true },
//     permissions: [{
//         name: { type: String, required: true },
//         description: { type: String, required: true }
//     }]
// }, { timestamps: true });

// authUserSchema.plugin(passportLocalMongoose, { usernameField: 'userName' });

// const AuthUser = mongoose.model('AuthUser', authUserSchema);

// module.exports = AuthUser;

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const permissionSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true }
});

const authUserSchema = new Schema({
    userName: { type: String, unique: true, required: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['salesManager', 'salesMan', 'IndustrialManager', 'factoryWorker'], required: true },
    permissions: [permissionSchema]
}, { timestamps: true });

authUserSchema.plugin(passportLocalMongoose, { usernameField: 'userName' });

const AuthUser = mongoose.model('AuthUser', authUserSchema);

module.exports = AuthUser;
