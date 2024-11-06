const admin_data = require('../MODELS/admin_model')
const users_data = require('../MODELS/user_model')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');  


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
        const users = await users_data.find(); // Fetch all users
        res.status(200).json(users); // Return the users in the response
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve users: ' + error.message });
    }
}; 


const login_admin = async (req, res) => {  
    const { email, password } = req.body;

    try {
        // Check if the email exists
        const admin = await admin_data.findOne({ email });

        if (!admin) {return res.status(401).json({ error: 'Invalid email or password' }); }

        // Compare the password with the hashed password in the database
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) { return res.status(401).json({ error: 'Invalid email or password' }); }

        // Generate a JWT token  expires in 1 day
        const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });

        // Send the token and user data (excluding password) in response
        res.status(200).json({ message: 'Welcome admin', token,admin: { email: admin.email, name: admin.name },});

    } catch (error) {res.status(500).json({ error: 'Login failed: ' + error.message });}
};



const adminForgotPassword = async (req,res) =>
{
    const { password } = req.body; // Retrieve new password from the request body or input field
    const { id } = req.params;     // Get user ID from the request parameters

    try {
        // Find the user by ID
        const admin = await admin_data.findOne({ _id: id });
        
        if (!admin) {
            // User not found
            return res.status(404).json({ mssg: 'Unable to change password! User not found.' });
        }
        console.log('The new Password is '+password)
        // Hash the new password
        const hashedPassword = await bcrypt.hash(password, 10);
        admin.password = hashedPassword; // Update the user's password
      
        // Save the updated user
        await admin.save();
        console.log('The new Password is '+hashedPassword)
        res.status(200).json({ mssg: 'Password updated successfully!' });
    } catch (error) {
        console.error(error); // Log the error for debugging
        return res.status(404).json({ mssg: 'Unable to change password! User not found.' });
    }
}


module.exports = { getAllUsers,getAllAdmin ,login_admin};