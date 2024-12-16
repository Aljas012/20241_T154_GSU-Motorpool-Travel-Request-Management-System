const request_model = require('../../MODELS/request_form_model');
const admin_request_data = require('../../MODELS/admin_request_model')

const countTodaysRequest = async (req,res) =>{
    try{
            const getData = await request_model.find({status: 'Submitted'})
            const countApprovedRequest = await admin_request_data.find({status: 'Approved'})
         
            const totalApproved = countApprovedRequest.length;
            const count = getData.length;
            console.log('fetched todays total request')
            return res.status(200).json({count,totalApproved})
    }catch(error){
        return res.status(500).json({message: 'Something went wrong. Please check you internet connection.',error})
    }

}
module.exports = {countTodaysRequest}