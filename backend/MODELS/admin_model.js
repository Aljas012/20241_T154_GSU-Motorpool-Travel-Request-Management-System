const mongoose = require('mongoose')
const Schema = mongoose.Schema

const admin_schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('admin_datas', admin_schema)