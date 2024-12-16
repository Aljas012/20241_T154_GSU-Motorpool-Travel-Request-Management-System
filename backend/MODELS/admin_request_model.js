//This schema is for admin pending request for approval. 
const mongoose = require('mongoose')
const Schema = mongoose.Schema


const admin_request = new Schema({
            status: {type: String },
            reference_id: {type:String,required: true,unique: true},
            assigned_vehicle: {type:String,required:true},
            plate_number: {type:String,required:true},
            driver_name: {type:String,required:true},
            gas_amount: {type:String,required:true},
            verified_gas_amount: {type:String,required:true},
            process_confirmed_personnel :{type:String,required:true},
            verified_by: {type:String,required:true},
            verified_date: {type:String,required:true},
            travel_expense: {type:String,required: true},
            travel_type: {type:String,required: true},
            date_of_travel: {type:String,required: true},
            pre_departure_time: {type:String,required:true},
            pre_arrival_time: {type:String,required:true},
            post_departure_date_time: {type:String,required:true},
            post_arrival_time: {type:String,required:true},
},{timestamps:true}) 
module.exports = mongoose.model('admin_request_data', admin_request)