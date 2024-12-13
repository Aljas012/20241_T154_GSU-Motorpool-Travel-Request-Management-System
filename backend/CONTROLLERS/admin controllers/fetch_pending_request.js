const request_model = require('../../MODELS/request_form_model');


const fetchPendingRequest = async (req,res) =>
{
        try
        {
        const pendingRequest = await request_model.find({status: "Submitted"})
        const formattedRequests = pendingRequest.map(request => ({
            request_identifier: request._id,
            reference_id: request.reference_id,
            requestor: request.requestor_name,
            collegeOffice: request.collegeName,
            officeCode: request.officeCode,
            time: request.request_time,
            status: request.status,
          }));

        return res.status(200).json({
            message: 'Successfully fetched pending requests',
            data:formattedRequests
          });

        }catch(error)
                 {
                return res.status(500).json({error: 'somthing went wrong in the backend pending request'})
            }
}
    
    module.exports = {fetchPendingRequest};