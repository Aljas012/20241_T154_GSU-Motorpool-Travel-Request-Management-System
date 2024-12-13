const admin_request_model = require('../../MODELS/admin_request_model');
const request_model = require('../../MODELS/request_form_model');


const fetchPendingRequestForApproval = async (req, res) => {
    try {

        console.log('backend reached -')
        const pendingRequests = await admin_request_model.find({status: "Pending"})
        
        if (!pendingRequests || pendingRequests.length === 0) {
            return res.status(404).json({ error: 'No pending requests found' })
        }
        const referenceIds = pendingRequests.map(request => request.reference_id)
        console.log('-Homepage fetching for pending request The reference ids is ',referenceIds)
        const fetchRtt = await request_model.find({ _id:  referenceIds  })
        
        if (!fetchRtt || fetchRtt.length === 0) {
            console.log('Cannot find the author of the RTT')
            return res.status(400).json({ error: 'Cannot find the author of the RTT' })
        }
console.log('The fetch rtt is ',fetchRtt)
        return res.status(200).json({
            message: 'Successfully fetched pending requests',
            adminRequests: pendingRequests,
            requestDetails: fetchRtt
        })

    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ error: 'Something went wrong in the backend pending request' })
    }
}
    
    module.exports = {fetchPendingRequestForApproval};