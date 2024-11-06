const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const user_schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: false },
    att_file: [{ type: Schema.Types.ObjectId, ref: 'request_form' }],
    travel_forms: [{ type: Schema.Types.ObjectId, ref: 'travel_form' }] // References to travel_form model
}, 
{ timestamps: true });

module.exports = mongoose.model('user_data', user_schema);