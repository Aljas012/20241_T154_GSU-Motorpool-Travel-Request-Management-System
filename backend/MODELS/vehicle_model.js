const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const vehicleSchema = new Schema (
    {
       vehicleName: {type:String,required:true},
       plateNumber: {type:String,required:true},
       status:{type:String,required:true}
    }
)
const vehicle = mongoose.model('vehicle_data', vehicleSchema);

module.exports = vehicle;
