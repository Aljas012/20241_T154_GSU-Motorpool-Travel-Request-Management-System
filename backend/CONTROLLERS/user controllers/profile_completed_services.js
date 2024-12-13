const request_data = require("../../MODELS/request_form_model");


const totalCompletedServices = async (req,res) =>
    {
        const  {userId} = req.body;
        
        try{
            const completedData = await request_data.find({ reference_id: userId, status: 'Completed' });
            return res.status(200).json({ completedCount: completedData.length });
        }catch(error)
        {
           return res.status(500).json({error:'catch statement is run in the backend!'})
        }
}
module.exports = {totalCompletedServices}