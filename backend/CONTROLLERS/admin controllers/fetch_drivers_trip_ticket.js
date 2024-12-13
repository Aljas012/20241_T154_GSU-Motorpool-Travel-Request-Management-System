const admin_form_data = require('../../MODELS/admin_request_model')
//para ni sa view approved rtt modal tapos drivers ticket

const fetchDriversTripTicket = async (req,res) => {
    const {requestId} = req.params
    console.log('fetch drivers trip ticket -The reference id is ',requestId)
    try{
        const driversTripTicket = await admin_form_data.findOne({reference_id: requestId})

        if(!driversTripTicket)
            {
                return res.status(404).json({error: 'No drivers trip ticket found'})
            }
            console.log('The drivers trip ticket is ',driversTripTicket)
        return res.status(200).json({message: 'Successfully fetched drivers trip ticket', data: driversTripTicket})
    }
    catch(error){
        return res.status(500).json({error: 'Something went wrong in the backend fetch drivers trip ticket'})
    }
}

module.exports = {fetchDriversTripTicket}
