const vehicle_data = require('../../MODELS/vehicle_model');

const fetchAvailableVehicles = async (req, res) => {
  try {

    const vehicles = await vehicle_data.find({ status: 'Available' });
    
    const totalVehicles = vehicles.map(vehicle => ({
      vehicleName: vehicle.vehicleName,
      plateNumber: vehicle.plateNumber,
    }));

    return res.status(200).json({
      message: 'Successfully fetched available vehicles',
      data: totalVehicles,
    });

  } catch (error) {
    console.error('Error fetching available vehicles:', error); 
    return res.status(500).json({
      error: 'Something went wrong while fetching available vehicles',
    });
  }
};
module.exports = { fetchAvailableVehicles };
