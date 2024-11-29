const admin_data = require('../MODELS/admin_model')
const bcrypt = require('bcrypt');

const adminGenerateToken = require('../MIDDLEWARES/token_generator').adminGenerateToken

const getAllAdmin = async (req, res) => {
    try {
        const admin = await admin_data.find(); // Fetch all users
        res.status(200).json(admin); // Return the users in the response
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve users: ' + error.message });
    }
}; 


const getAllUsers = async (req, res) => {
    try {
        const users = await admin_data.find(); // Fetch all users
        res.status(200).json(users); // Return the users in the response
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve users: ' + error.message });
    }
}; 






const create_account = async (req, res) => {  // Create user function (for signup)
    const { name, email, password,role } = req.body;
    
    try {
        
        const existingUser = await admin_data.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already in use' });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const adminInfo = await admin_data.create({ name, email, password: hashedPassword ,role});
        
        // Return success response
        res.status(201).json({ 
            message: 'admin created successfully', 
            admin: { name: adminInfo.name, email: adminInfo.email} 
        });

    } catch (error) {
        console.error(error); // It's a good practice to log the error to the server console
        res.status(500).json({ error: 'Failed to create user: ' + error.message });
    }
};


module.exports = { getAllUsers,getAllAdmin ,create_account};