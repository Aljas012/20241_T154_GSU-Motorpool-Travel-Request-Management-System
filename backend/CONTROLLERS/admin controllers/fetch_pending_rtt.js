const request_model = require('../../MODELS/request_form_model')

const fetchPendingRtt = async(req,res) => {
    console.log('Full request params:', req.params); // Debug all params
    const {requestId} = req.params;
    
    try{
        console.log('fetch pending rtt -The reference id is ',requestId)
        const pendingRtt = await request_model.findOne({_id: requestId})
        if(!pendingRtt)
            {
                console.log('No pending RTT found')
                return res.status(404).json({error: 'No pending RTT found'})
            }
            console.log('The pending RTT is ',pendingRtt)
        return res.status(200).json({message: 'Successfully fetched pending RTT', data: pendingRtt})
   
    }
    catch(error){
        return res.status(500).json({error: 'Something went wrong in the backend fetch pending rtt'})
    }
}

module.exports = {fetchPendingRtt}