const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const permissionsSchema = new Schema({
    role: { type: String, unique: true, required: true },
    permissions: [String]
}, { timestamps: true });

const Permissions = mongoose.model("Permissions", permissionsSchema);

module.exports = Permissions;
