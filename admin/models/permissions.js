// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const permissionsSchema = new Schema({
//     role: { type: String, required: true, unique: true },
//     permissions: [String]
// }, { timestamps: true });

// const Permissions = mongoose.model('Permissions', permissionsSchema);

// module.exports = Permissions;








const mongoose = require('mongoose');

const permissionSchema = new mongoose.Schema({
    role: { type: String, required: true },
    permissions: [{
        name: { type: String, required: true },
        default: { type: Boolean, default: false },
        description: { type: String, default: '' } // إضافة حقل الوصف
    }]
});

const Permissions = mongoose.model('Permissions', permissionSchema);

module.exports = Permissions;
