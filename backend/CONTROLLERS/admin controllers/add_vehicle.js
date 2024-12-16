const vehicle_data = require('../../MODELS/vehicle_model');

const addVehicle = async (req, res) => {
    const { vehicleName, plateNumber } = req.body;

    try {
        const existingVehicle = await vehicle_data.findOne({ plateNumber });

        if (existingVehicle) {
            return res.status(409).json({ message: 'Vehicle already exists with this plate number.' });
        }

        const newVehicle = await vehicle_data.create({
            vehicleName,
            plateNumber,
            status: "Available"
        });

        console.log('Successfully added vehicle:', newVehicle);

        // Return the new vehicle data
        return res.status(200).json({
            message: 'Successfully added the vehicle',
            vehicle: newVehicle 
        });

    } catch (error) {
        console.error('Error adding vehicle:', error);
        return res.status(500).json({ message: 'Something went wrong in the backend.' });
    }
};

module.exports = { addVehicle };
