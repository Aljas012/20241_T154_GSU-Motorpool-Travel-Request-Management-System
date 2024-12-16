const mongoose = require('mongoose')
const Schema = mongoose.Schema

const driver_schema = new Schema({
    driverName:   { type: String, required: true },
    status: {type:String,required:true},
    contactInformation: {type:String,required:true}
}, { timestamps: true });

module.exports = mongoose.model('driver_data', driver_schema)