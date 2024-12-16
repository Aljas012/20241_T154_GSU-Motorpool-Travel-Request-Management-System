const vehicle_data = require('../../MODELS/vehicle_model');

const vehicleTotal = async (req, res) => {
    console.log('fetching vehicle');
    try {
        const vehicleTotal = await vehicle_data.find({ status: 'Available' });

        // Fetch the total count of all vehicles
        const allvehicleTotal = await vehicle_data.find();

        const total = allvehicleTotal.length;  // Total number of vehicles
        const count = vehicleTotal.length;     // Number of available vehicles

        console.log('Total number of vehicles: ', total);
        console.log('Number of available vehicles: ', count);

        // Always return both total and count
        return res.status(200).json({ count, total });

    } catch (error) {
        return res.status(500).json({ message: 'Something went wrong. Please check your internet connection.', error });
    }
};

module.exports = { vehicleTotal };
