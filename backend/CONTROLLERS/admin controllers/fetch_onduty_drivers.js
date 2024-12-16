const admin_request = require('../../MODELS/admin_request_model');

const fetch_onduty_drivers = async (req, res) => {
    try {
        const { driverName } = req.query;
        
        let query = {};
        if (driverName) {
            query.driver_name = driverName;
        }

        const onduty_drivers = await admin_request.find(query)
            .select('driver_name assigned_vehicle plate_number reference_id verified_by verified_date date_of_travel');

        const uniqueDrivers = onduty_drivers.reduce((acc, curr) => {
            if (!acc[curr.driver_name]) {
                acc[curr.driver_name] = curr;
            }
            return acc;
        }, {});

        res.status(200).json({
            success: true,
            data: Object.values(uniqueDrivers)
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

module.exports = { fetch_onduty_drivers }
