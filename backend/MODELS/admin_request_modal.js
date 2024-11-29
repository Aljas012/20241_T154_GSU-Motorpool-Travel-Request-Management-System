//This schema is for admin pending request for approval. 


const mongoose = require('mongoose')
const { type } = require('os')
const Schema = mongoose.Schema


const admin_request = new Schema({

    //Motor Vehicle Reservation Details
            assigned_vehicle: {type:String,required:true},
            plate_number: {type:String,required:true},
            driver_name: {type:String,required:true},
            gas_amount: {type:String,required:true},
            verified_gas_amount: {type:String,required:true},
            process_confirmed_personnel :{type:String,required:true},
            verified_by: {type:String,required:true},
            verified_date: {type:String,required:true},

    //Drivers trip ticket portion
            passenger_names: {type:String,required: true},
            travel_purpose: {type:String,required:true},
            travel_location: {type:String,required: true},
            travel_expense: {type:String,required: true},
            date_assigned: {type:String,required:true},
            travel_type: {type:String,required: true},
            departure_time: {type:String,required:true},
            arrival_time: {type:String,required:true},
            return_date_time: {type:String,required:true},
            return_arrival_time: {type:String,required:true},
            att_data: {type:String,required:true},
            rtt_data:
                    {
                        status: {type:String,required:true},
                        reference_id:{type:String, required:true},
                        organization_name: { type: String, required: true },
                        requestor_name: { type: String, unique: true, required: true },
                        collegeName: {type: String,require: true},
                        officeCode: {type: String,require: true},
                        contact_number: { type: String, required: true },
                        request_date: { type: String, required: true },
                        request_time: { type: String, required: true },
                        travel_details: {   
                            passenger_names: { type: String, required: true },
                            date_travel: { type: String, required: true },
                            destination: { type: String, required: true },
                            departure_time: { type: String, required: true },
                            arrival_time: { type: String, required: true },
                            return_date: { type: String, required: true },
                            return_arrival_time: { type: String, required: true }
                        },
                        travel_purpose: {type:String,required: true}
                        ,
                        imgUrl: {
                            file_name: { type: String, required: true }
                        }
                    }

}) 
module.exports = mongoose.model('admin_request_data', admin_request)