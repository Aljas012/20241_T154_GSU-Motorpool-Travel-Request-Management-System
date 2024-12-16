const admin_request_data = require('../../MODELS/admin_request_model')
const request_data = require('../../MODELS/request_form_model')
const vehicle_data  = require('../../MODELS/vehicle_model')
const driver_data  = require('../../MODELS/driver_model')



const updateDriverStatus = async (driver_name) => {
    try {
        console.log('driver that need to be found : ',driver_name)
        const updatedDriver = await driver_data.findOneAndUpdate(
            { driverName: driver_name },  
            { $set: { status: 'On Duty' } }, 
            { new: true } 
        );

        if (!updatedDriver) {
            throw new Error(`Driver ${driver_name} not found`);
        }
        return updatedDriver;
    } catch (error) {
        console.error('Error updating driver status:', error);
        throw error;
    }
};
const updateVehicleStatus = async (plate_number) =>
    {   
        try
        {
            const updatedVehicle = await vehicle_data.findOneAndUpdate(
                { plateNumber: plate_number},  
                { $set: { status: 'On Service' } }, 
                { new: true } 
            );
            if(!updatedVehicle)
             {
                throw new Error(`Plate number ${plate_number} not found`);
            }
        }catch(error)
              {
               
        }
}
        const updateRequestStatus = async (reference_id) =>
         {
            try{
                const updateRequest  = await request_data.findOneAndUpdate(
                        {_id: reference_id},
                         {status: 'Pending'},
                         {new:true}
                )
                   if(!updateRequest)
                          {
                            throw new Error(`User request ${reference_id} not found`);
                        }
                    }catch(error)
                    {
                        console.error('Error updating vehicle status:', error);
                        throw error;
                    }
        }


const forwardToGsu = async (req, res) => {
    try {
        const { reference_id, assigned_vehicle,   plate_number, driver_name,
            gas_amount, verified_gas_amount,   process_confirmed_personnel,
            verified_by, verified_date, travel_expense, travel_type,date_of_travel,
            pre_departure_time, pre_arrival_time,  post_departure_date_time, post_arrival_time
        } = req.body;

        if (!reference_id || !assigned_vehicle || !driver_name) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields'
            });
        }

        const newRequest = {
            status:  "Pending",
            reference_id,
            assigned_vehicle,
            plate_number,
            driver_name,
            gas_amount,
            verified_gas_amount,
            process_confirmed_personnel,
            verified_by,
            verified_date,
            travel_expense,
            travel_type,
            date_of_travel: date_of_travel || '',
            pre_departure_time,
            pre_arrival_time,
            post_departure_date_time,
            post_arrival_time
        };

        await updateDriverStatus(newRequest.driver_name);
        await updateVehicleStatus(newRequest.plate_number);
        await updateRequestStatus(newRequest.reference_id);
        const saveAdminRequest = await admin_request_data.create(newRequest);


        return res.status(200).json({
            success: true,
            message: 'Request forwarded successfully',
            data: saveAdminRequest
        });

    } catch (error) {
        console.error('Error in forwardToGsu:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = { forwardToGsu };