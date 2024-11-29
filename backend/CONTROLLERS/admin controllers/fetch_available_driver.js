const driver_data = require('../../MODELS/driver_model');   

async function availableDrivers(req, res) {
    try {
        const availableDriversData = await driver_data.find({ status: "Available" });
        
        console.log('Available Drivers Data:', availableDriversData);

        const availableDrivers = availableDriversData.map(driver => ({
            driverName: driver.driverName, 
        }));

        return res.status(200).json({
            message: 'Successfully fetched available drivers',
            data: availableDrivers,
        });
        
    } catch (error) {
        console.error('Error in availableDrivers:', error);
        
        return res.status(500).json({
            error: 'Something went wrong while fetching available drivers',
            details: error.message
        });
    }
}

module.exports = { availableDrivers };
