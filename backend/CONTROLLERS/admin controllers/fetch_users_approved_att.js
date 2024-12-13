const request_model = require('../../MODELS/request_form_model')

const fetchUsersATT = async (req,res) =>
    {
        const {requestId} = req.params
        console.log('the reference for fetching approved att ',requestId)
    try{
        const fetchAtt = await request_model.findOne({_id: requestId})
        if(!fetchAtt)  {
            return res.status(404).json({message: 'Unable to find user who submit att'})
        }
        const data  = fetchAtt.imgUrl;
        console.log(data)
        return res.status(200).json({message: 'successfuly fetched the approved att', data: data})

    }catch(error)
       {
        return res.status(500).json({message:'Somethoing went wrong in the backend', error:error })
    }

} 
module.exports = {fetchUsersATT};