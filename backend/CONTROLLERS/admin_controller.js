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
        const users = await users_data.find(); // Fetch all users
        res.status(200).json(users); // Return the users in the response
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve users: ' + error.message });
    }
}; 



const login_admin = async (req, res) => {  

    const { email, password } = req.body; 
    console.log('Received email:', email);
    console.log('Received password:', password);
    try {
        // Check if the email exists
        const admin = await admin_data.findOne({ email });
        if (!admin) {return res.status(401).json({ error: 'Invalid email or password' }); }
        const emailIsMatch = await email.compare(email, admin.email);
        console.log('Email matched:' ,emailIsMatch)
        // Compare the password with the hashed password in the database
        const isMatch = await bcrypt.compare(password, admin.password);
        console.log('Password match:', isMatch); // Check if the passwords match
        if (!isMatch) { return res.status(401).json({ error: 'Invalid email or password' }); }
        console.log(email)
        console.log(password)
        // Generate a JWT token  expires in 1 day
        const token = adminGenerateToken(admin._id, admin.name, admin.email);
        console.log(token)
         res.status(200).json({ message: 'Welcome admin', token,admin: {admin_id:admin._id, email: admin.email}}); 
        
    } catch (error) {res.status(500).json({ error: 'Login failed: ' + error.message });}
};





const create_account = async (req, res) => {  // Create user function (for signup)
    const { name, email, password } = req.body;
    
    try {
        // Check for missing fields
        let emptyFields = [];
        
        if (!name || name.trim() === '') {
            emptyFields.push('Name');
        }
        
        if (!email || email.trim() === '') {
            emptyFields.push('Email');
        }
        
        if (!password || password.trim() === '') {
            emptyFields.push('Password');
        }
       
        //return an error with the list of missing fields
        if (emptyFields.length > 0) {
            return res.status(400).json({ 
                error: `Please fill in all required fields: ( ${emptyFields.join(' , ')} )` 
            });
        }

        // Validate email format using regex (simplified example)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: 'Invalid email format' });
        }

        // Check if the email already exists in the database
        const existingUser = await admin_data.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already in use' });
        }

        // Hash the password before saving to the database
        const hashedPassword = await bcrypt.hash(password, 12);

        // Save the new user to the database
        const adminInfo = await admin_data.create({ name, email, password: hashedPassword });
        
        // Return success response
        res.status(201).json({ 
            message: 'admin created successfully', 
            admin: { name: adminInfo.name, email: adminInfo.email} // Return a subset of the user info to avoid exposing the password
        });

    } catch (error) {
        console.error(error); // It's a good practice to log the error to the server console
        res.status(500).json({ error: 'Failed to create user: ' + error.message });
    }
};


module.exports = { getAllUsers,getAllAdmin ,login_admin,create_account};