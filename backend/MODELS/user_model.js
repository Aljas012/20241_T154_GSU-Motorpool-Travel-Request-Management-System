const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const user_schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: false },
    office_code:{type: String, required: true},
    college_name: {type:String,required: true},
}, 
{ timestamps: true });

module.exports = mongoose.model('user_data', user_schema);