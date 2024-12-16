const admin_request_data = require('../../MODELS/admin_request_model')
const request_data = require('../../MODELS/request_form_model')

const findAllHeadApprovedRequest = async (req,res) =>{
    try{
        const findApprovedRequests = await admin_request_data.find({ status: 'Approved' });
        const referenceIds = findApprovedRequests.map(request => request.reference_id);
        const users = await request_data.find({ _id: { $in: referenceIds } });
        
        const joinedData = findApprovedRequests.map((request) => {
          const user = users.find((user) => user._id.toString() === request.reference_id.toString());
          
          return {
            ...request.toObject(), 
            user: user ? user : null, 
          };
        });
        return res.status(200).json(joinedData);
    }catch(errror){
        return res.status(500).json({error:'something went wrong in the server.'})
    }
}
module.exports = findAllHeadApprovedRequest;