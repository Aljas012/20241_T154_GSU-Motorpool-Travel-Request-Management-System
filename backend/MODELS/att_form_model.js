const { Schema } = require('mongoose'); // Make sure Schema is imported

const authorityToTravelSchema = new Schema({
    name: { type: String, required: true },
    position: { type: String, required: true },
    office_code: { type: String, required: true },
    purpose_travel: { type: String, required: true },
    department: { type: String, required: true },
    auth_travel_number: { type: String, required: true },
    use_vehicle: { type: Boolean, required: true }, // Assuming use_vehicle is a boolean (yes/no)
    chair_person_name: { type: String, required: true },
    dean_name: { type: String, required: true },
    vpaa_name: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the User model
    created_at: { type: Date, default: Date.now }, // Automatically sets the timestamp
}, { _id: false }); // _id: false ensures that each item in the array doesn't have its own _id field

module.exports = authorityToTravelSchema;
