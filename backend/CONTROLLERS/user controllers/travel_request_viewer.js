const request_form = require("../../MODELS/request_form_model");

const viewTravelRequest = async (req,res) =>
        {
            const {reference_id} = req.body;
            
            try{
                const availableData = await request_form.find({ reference_id });

                console.log('successfully getting account')
                return res.status(200).json(availableData);
            
            }catch(error)
                 {
                return res.status(500).json({error:'unable to run the try statement  --catch statment backend'})
            }

}
module.exports = {viewTravelRequest};