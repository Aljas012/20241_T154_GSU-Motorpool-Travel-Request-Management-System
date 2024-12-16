const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { event_schema } = require('./user_events_model');

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
    email: { type: String, required: true ,unique: true},
    password: { type: String, required: false },
    office_code: { type: String, required: false },
    college_name: { type: String, required: false },
    temporary_key: { type: String, required: false },
    google_id: {type: String, sparse: true},
    google_refresh_token: { type: String, default: null},
    google_access_token: { type: String,default: null},
    calendar_connected: {type: Boolean,default: false},
    last_token_refresh: {type: Date,default: null},
    authority_to_travel: [authorityToTravelSchema], 
    events:[event_schema],
}, 
 
{ timestamps: true }); 

const User = mongoose.model('user_data', user_schema);

module.exports = User;

