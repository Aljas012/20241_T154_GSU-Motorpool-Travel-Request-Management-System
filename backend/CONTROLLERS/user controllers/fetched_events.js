 
 const user_data = require('../../MODELS/user_model');

  const fetchEvents = async (req,res) => {
      const user_id = req.headers['user_id'];
  try{
      const user = await user_data.findById(user_id);
      if(!user){
          return res.status(404).json({error: 'User not found'});
      }
    return res.json(user.events);
  }catch(error){
    return res.status(500).json({error: 'Failed to fetch events'});
  }
  }

  module.exports = {fetchEvents};