const request_model = require('../../MODELS/request_form_model');

const fetchApprovedRequest = async (req,res) => {
    try{
        console.log('backend reached -fetched approved')
        const approvedRequest = await request_model.find({status: 'Approved'})

        if(!approvedRequest)
        {
            console.log('No approved requests found')
            return res.status(404).json({error: 'No approved requests found'})
        }

        return res.status(200).json({
            message: 'Successfully fetched approved requests',
            data: approvedRequest
        })



    }catch(error)
    {
        return res.status(500).json({error: 'Something went wrong in the backend fetch approved request'})
    }
}

module.exports = {fetchApprovedRequest}
