const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const event_schema = new Schema({
    reference_id: { type: String, required: true },
    event_name: { type: String, required: true },
    event_date: { type: String, required: true },
    event_time: { type: String, required: true },
    event_details: { type: String, required: true },
}, { timestamps: true });

const Event = mongoose.model('Event', event_schema); 

module.exports = { event_schema, Event }; 