const vehicle_data = require('../../MODELS/vehicle_model')


const deleteVehicle = async (req, res) => {
  const { plateNumber } = req.body;

  try {

    const deletedVehicle = await vehicle_data.findOneAndDelete({ plateNumber:plateNumber });

    if (!deletedVehicle) {
        console.log('plateNumber to delete', plateNumber)
      return res.status(400).json({ message: 'Unable to find the vehicle with the provided plate number.' });
    }

    return res.status(200).json({ message: 'Vehicle successfully deleted.', vehicle: deletedVehicle });
  } catch (error) {
    console.error('Error deleting vehicle:', error);
    return res.status(500).json({ message: 'An error occurred while deleting the vehicle.', error: error.message });
  }
};

module.exports = { deleteVehicle };
