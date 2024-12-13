const approved_events = require('../../MODELS/approved_events_model')


const fetchAllApprovedEvents = async (req,res) =>{
    console.log('Fetching events')
            try{
                const fetchAllRequest = await approved_events.find()
                console.log('successfull fetched')
            return res.status(200).json(fetchAllRequest)
        }catch(error)
        {
            return res.status(500).json({message: 'Something went wrong in the backend',error})
        }
}

module.exports  = {fetchAllApprovedEvents};