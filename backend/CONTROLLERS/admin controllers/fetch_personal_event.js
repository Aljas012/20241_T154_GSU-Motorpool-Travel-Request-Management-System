const admin_data = require('../../MODELS/admin_model')

const fetchPersonalEvent = async (req,res) =>{
        const {adminId} = req.params; 

        try{
            const fetchData = await admin_data.find({_id:adminId})
            if(!fetchData || fetchData.length === 0){
                console.log('Unsuccessfully fetch personal events')
                return res.status(404).json({message: 'Admin not found.', adminId})
            }

            const eventData = fetchData[0].events;
            console.log('Successfully fetch personal events')
            return res.status(200).json({message: 'Successfully fetched personal events', data: eventData})

        }catch(error){
                console.log("Something went wrong in the backend",error)
                return res.status(500).json({message: 'Something went wrong in the backend'})
        }
}
module.exports = {fetchPersonalEvent}