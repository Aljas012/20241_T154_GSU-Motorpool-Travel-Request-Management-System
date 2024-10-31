const mongoose = require('mongoose')
const Schema = mongoose.Schema

const admin_schema = new Schema({
    office_code: { type: Number, required: true, unique: true },
    password: { type: String, required: true },
    position: { type: String, required: true },
    name: { type: String, required: true },
    department: { type: String, required: true },
    email: { type: String, required: true },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
}, { timestamps: true });

module.exports = mongoose.model('admin', admin_schema)