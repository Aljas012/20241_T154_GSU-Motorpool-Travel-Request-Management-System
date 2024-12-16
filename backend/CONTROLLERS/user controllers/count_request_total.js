const user_data = require("../../MODELS/user_model");

const countUserRequests = async (req, res) => {

    const {userId} = req.body;  
    try {
        const user = await user_data.findById(userId);
  
        if (!user) {
            console.log('user not found! -countTotalRequest')
            return res.status(404).json({ error: "User not found." });
        }   
        console.log('user found! -countTotalRequest')
        const today = new Date().toISOString().split('T')[0];
        const todaysRequests = user.authority_to_travel.filter(request => {
        const createdAtDate = new Date(request.createdAt).toISOString().split('T')[0];
        return createdAtDate === today;
        });

        let totalToday = todaysRequests.length; 
        let requestCount = user.authority_to_travel.length;
        const data = {requestCount,totalToday};
        res.status(200).json(data);
    } catch (error) { 
        console.error("Error in countUserRequests:", error); // This should log details of the error
        res.status(500).json({ error: "Failed to count user requests: " + error.message });
    }
};
  
module.exports = { countUserRequests };
