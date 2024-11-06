const mongoose = require('mongoose')
const Schema = mongoose.Schema
const form_model = new Schema({
    user_id:  {},
    name: { type: String, unique: true, required: true },
    position: { type: String, unique: false, required: true },
    office_code: { type: Number, unique: false, required: true },
    purpose_travel: { type: String, unique: false, required: true },
    department: { type: String, unique: false, required: true },
    destination: { type: String, unique: false, required: true },
    fundSource: {type: String, unique: false,required: false},
    travel_time_period: { type: String, unique: false, required: true },
    auth_travel_number: { type: Number, unique: true, required: true },
    use_vehicle: { type: String, unique: false, required: true },
    chair_person_name: { type: String, unique: false, required: true },
    dean_name: { type: String, unique: false, required: true },
    vpaa_name: { type: String, unique: false, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'user_data', required: true } //link to user
}, { timestamps: true });

module.exports = mongoose.model('travel_form', form_model)