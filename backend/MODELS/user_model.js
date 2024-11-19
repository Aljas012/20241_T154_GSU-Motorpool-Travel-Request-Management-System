const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const authorityToTravelSchema = new Schema({
    name: { type: String, required: true },
    position: { type: String, required: true },
    purpose_travel: { type: String, required: true },
    station:{type: String, required: true},
    request_date:{type:String,required:true},
    destination: { type: String, required: true },
    fundSource: { type: String, required: false },
    travel_time_period: { type: String, required: true },
    auth_travel_number: { type: String, required: true },
    use_vehicle: { type: String, required: true }, 
    chair_person_name: { type: String, required: true },
    dean_name: { type: String, required: true },
    vpaa_name: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'user_data', required: true }, 
}, { timestamps: true }); 

const user_schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: false },
    office_code: { type: String, required: false },
    college_name: { type: String, required: false },
    temporary_key: { type: String, required: false },
    google_id: { type: String, required: false },
    authority_to_travel: [authorityToTravelSchema], // Array of authorityToTravelSchema objects
}, 
{ timestamps: true }); // This is for the user-level createdAt and updatedAt timestamps.

const User = mongoose.model('user_data', user_schema);

module.exports = User;

