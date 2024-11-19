const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const form_model = new Schema({
    status: {type: Boolean},
    reference_id:{type:String, required:true},
   organization_name: { type: String, required: true },
    requestor_name: { type: String, unique: true, required: true },
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
}, { timestamps: true });

module.exports = mongoose.model('request_form', form_model);
