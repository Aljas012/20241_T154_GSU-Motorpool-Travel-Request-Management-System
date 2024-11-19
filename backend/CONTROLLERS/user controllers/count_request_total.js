const user_data = require("../../MODELS/user_model");

const countUserRequests = async (req, res) => {

    const { userId } = req.body;  // Extract userId from the body
    
    try {
  
        // Find the user in the database
        const user = await user_data.findById(userId);
  
        if (!user) {
            console.log('user not found!')
            return res.status(404).json({ error: "User not found." });
        }   

        
        const today = new Date().toISOString().split('T')[0];
        const todaysRequests = user.authority_to_travel.filter(request => {
        // Extract the date part of the createdAt field and compare it with today
        const createdAtDate = new Date(request.createdAt).toISOString().split('T')[0];
        return createdAtDate === today;
        });

        let totalToday = todaysRequests.length; 
        let requestCount = user.authority_to_travel.length;

        res.setHeader('Content-Type', 'application/json');  
        res.status(200).json({ requestCount,totalToday });
        
    } catch (error) { 
        console.error("Error in countUserRequests:", error); // This should log details of the error
        res.status(500).json({ error: "Failed to count user requests: " + error.message });
    }
};
  
module.exports = { countUserRequests };
