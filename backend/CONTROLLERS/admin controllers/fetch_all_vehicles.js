const vehicle_data = require('../../MODELS/vehicle_model')


const fetchAllVehicle = async (req, res) => {
    try {
        const vehicles = await vehicle_data.find();

        const totalVehicles = vehicles.map(request => ({
            requestor: request.requestor_name,
            collegeOffice: request.collegeName,
            officeCode: request.officeCode,
            time: request.request_time,
            status: request.status,
            vehicleName: request.vehicleName,
            plateNumber: request.plateNumber,
        }));

        return res.status(200).json({
            message: 'Data fetched successfully',
            data: totalVehicles,
        });

    } catch (error) {
        
        return res.status(500).json({
            message: 'Internal server error while fetching vehicles'
        });
    }
};

module.exports = {fetchAllVehicle};