const user_data = require('../MODELS/user_model')
const travel_form_data = require('../MODELS/att_form_model')
const request_form_data = require('../MODELS/request_form_model')
const bcrypt = require('bcrypt');


const getAllUsers = async (req, res) => {
    try {
        const users = await user_data.find(); // Fetch all users
        res.status(200).json(users); // Return the users in the response
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve users: ' + error.message });
    }
};



const create_user = async (req, res) => {  // Create user function (for signup)
    const { email, password, name } = req.body;
    try {

        if (!password || password.trim() === '') { //i check if ang input field is null
            return res.status(400).json({ error: 'Password is required' });
        }

        // Check if the email already exists
        const existingUser = await user_data.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already in use' });
        }
        
        // Hash the password before storing it
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const userInfo = await user_data.create({ email, password: hashedPassword, name });
        res.status(201).json({ message: 'User created successfully', user: userInfo });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create user: ' + error.message });
    }
};





const login_user = async (req, res) => {  // User login function
    const { email, password } = req.body;

    try {
        // Check if the email exists
        const user = await user_data.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'Invalid email' });
        }

        // Compare the password with the hashed password in the database
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(404).json({ error: 'Invalid password' });
        }

        res.status(200).json({ message: 'Welcome user', user });
    } catch (error) {
        res.status(500).json({ error: 'Login failed: ' + error.message });
    }
};


const createTravelForm = async (req, res) => { // AUTHORITY TO TRAVEL FORM
    const { name, position, office_code, purpose_travel, department, destination, travel_time_period, auth_travel_number, use_vehicle, chair_person_name, dean_name, vpaa_name } = req.body
    try {
        const existingRequestor = await travel_form_data.findOne({ name });
        const authtravelNumber = await travel_form_data.findOne({ auth_travel_number });
        if (existingRequestor) { return res.status(400).json({ error: 'Requestor name already exists.' }); } //return warning if the requestor is duplicate
        if (authtravelNumber) { return res.status(400).json({ error: 'Authentication travel number already exists.' }); } //return warning if the authentication number is duplicate

        const formInfo = await travel_form_data.create({ name, position, office_code, purpose_travel, department, destination, travel_time_period, auth_travel_number, use_vehicle, chair_person_name, dean_name, vpaa_name });
        res.status(200).json(formInfo)
    } catch (error) {
        res.status(400).json({ error: 'Failed to add data to the database: ' + error.message });
    }
};

const createRequestForm = async (req, res) => {
    const { college_name, requestor_name, contact_number, request_date, request_time, travel_details, att_file } = req.body
    try {
        // Check for existing requestor_name
        const existingRequestor = await request_form_data.findOne({ requestor_name });
        if (existingRequestor) {
            return res.status(400).json({ error: 'Requestor name already exists.' });
        }
        const formInfo = await request_form_data.create({ college_name, requestor_name, contact_number, request_date, request_time, travel_details, att_file });
        res.status(200).json(formInfo);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Failed to add data to the database: ' + error.message });
    }
};


module.exports = { getAllUsers  ,create_user, login_user,createTravelForm, createRequestForm }