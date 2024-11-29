const vehicle_data = require('../../MODELS/vehicle_model');

const addVehicle = async (req, res) => {
    const { vehicleName, plateNumber } = req.body;

    try {
        // Check if the vehicle already exists
        const existingVehicle = await vehicle_data.findOne({ plateNumber });

        if (existingVehicle) {
            return res.status(409).json({ message: 'Vehicle already exists with this plate number.' });
        }

        // Create a new vehicle
        const newVehicle = await vehicle_data.create({
            vehicleName,
            plateNumber,
            status: "Available"
        });

        // Log the successful addition
        console.log('Successfully added vehicle:', newVehicle);

        // Return the new vehicle data
        return res.status(200).json({
            message: 'Successfully added the vehicle',
            vehicle: newVehicle // Send back the newly created vehicle object
        });

    } catch (error) {
        console.error('Error adding vehicle:', error);
        return res.status(500).json({ message: 'Something went wrong in the backend.' });
    }
};

module.exports = { addVehicle };
