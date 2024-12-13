const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const approved_event_schema = new Schema({
    reference_id: { type: String, required: true },
    event_name: { type: String, required: true },
    event_date: { type: String, required: true },
    event_time: { type: String, required: true },
    event_details: { type: String, required: true },
}, { timestamps: true });

const approved_event_data = mongoose.model('approved_event_data', approved_event_schema); 

module.exports = mongoose.model('approved_event_data', approved_event_schema);
