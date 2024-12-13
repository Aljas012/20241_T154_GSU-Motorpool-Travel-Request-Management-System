const request_data = require ('../../MODELS/request_form_model')
const admin_request_data = require('../../MODELS/admin_request_model')
const vehicle_data = require('../../MODELS/vehicle_model')
const driver_data = require('../../MODELS/driver_model');



    const declineRequest = async (req,res) =>
           {
                const {requestId} = req.body
                console.log('Decline request reached!');
                console.log('userId from request:', requestId);  // Add this log
            try{
                        const adminRequest = await admin_request_data.findOne({ 
                            reference_id: requestId 
                        });
                        console.log('Query criteria:', { reference_id: requestId });  
                       console.log('Found admin request:', adminRequest);  
                    if(!adminRequest)
                        {
                            console.log('admin request not found')
                            return res.status(404).json({ success: false, message: 'Resource not found!' });
                    }

                    const updateVehicle = await vehicle_data.findOneAndUpdate(
                        { vehicleName: adminRequest.assigned_vehicle},
                                { 
                                    $set: {   status: 'Available',updated_at: new Date()  }
                                },
                                { new: true }
                    );
                        if(!updateVehicle)
                                { 
                                    console.log('vehicle not found')
                                    return res.status(404).json({ success: false, message: 'vehicle resource not found!' });
                                }
                            const updateDriver = await driver_data.findOneAndUpdate({driverName: adminRequest.driver_name},
                                {
                                    $set: {   status: 'Available',updated_at: new Date()  }
                                },
                                { new: true }
                            );
                                    if(!updateDriver) 
                                         {
                                            console.log('driver not found')
                                            return res.status(404).json({ success: false, message: 'driver resource not found!' });
                                    }
                    const updateStatus = await request_data.findOneAndUpdate(
                        { _id: requestId },
                        { 
                            $set: {  status: 'Declined', updated_at: new Date() } 
                        },
                        { new: true }
                    );

                    if(!updateStatus) 
                        {
                            console.log(' request datas not found')
                           return res.status(404).json({ success: false, message: 'request resource not found!' });
                   }

                    const deleteAdminRequest = await admin_request_data.findOneAndDelete({
                        reference_id: requestId
                    });


                    return res.status(200).json({ success: true,message: 'Successfully updated and deleted resource' });
            }catch(error) 
                {
                    console.error('Error in declineRequest:', error);
                    return res.status(500).json({  success: false, message: 'Something went wrong on the server' });
            }
     }

     module.exports = {declineRequest};