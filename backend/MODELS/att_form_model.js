const mongoose = require('mongoose')
const Schema = mongoose.Schema
const form_model = new Schema({
    name: { type: String, unique: true, required: true },
    position: { type: String, unique: false, required: true },
    office_code: { type: Number, unique: false, required: true },
    purpose_travel: { type: String, unique: false, required: true },
    department: { type: String, unique: false, required: true },
    destination: { type: String, unique: false, required: true },
    travel_time_period: { type: String, unique: false, required: true },
    auth_travel_number: { type: Number, unique: true, required: true },
    use_vehicle: { type: String, unique: false, required: true },
    chair_person_name: { type: String, unique: false, required: true },
    dean_name: { type: String, unique: false, required: true },
    vpaa_name: { type: String, unique: false, required: true }
}, { timestamps: true });

module.exports = mongoose.model('travel_form', form_model)