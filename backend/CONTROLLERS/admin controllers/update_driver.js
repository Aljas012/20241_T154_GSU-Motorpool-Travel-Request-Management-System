const driver_data = require('../../MODELS/driver_model');

const updateDriver = async (req, res) => {
  const { driverId, driverName, status, contactInformation } = req.body;
  const name = driverName ? driverName.toUpperCase() : undefined;
  try {
    const existingDriver = await driver_data.findById(driverId);
    if (!existingDriver) {
      return res.status(404).json({ message: 'Driver not found.' });
    }
    if (name) {
      const duplicateDriver = await driver_data.findOne({
        driverName: name,
        _id: { $ne: driverId }
      });

      if (duplicateDriver) {
        return res.status(400).json({ message: 'A driver with this name already exists.' });
      }
    }
    const updateData = {};
    if (name) updateData.driverName = name;
    if (status) updateData.status = status;
    if (contactInformation) updateData.contactInformation = contactInformation;

    const updatedDriver = await driver_data.findByIdAndUpdate(driverId, updateData, { new: true });
    return res.status(200).json({
      message: 'Driver updated successfully',
      driver: updatedDriver,
    });
  } catch (error) {
    console.error(error); 
    return res.status(500).json({ message: 'Something went wrong while updating the driver.' });
  }
};

module.exports = { updateDriver };
