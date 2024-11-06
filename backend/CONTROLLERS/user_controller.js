const user_data = require('../MODELS/user_model')
const travel_form_data = require('../MODELS/att_form_model')
const request_form_data = require('../MODELS/request_form_model')
const bcrypt = require('bcrypt');
const generateToken = require('../MIDDLEWARES/token_generator')
const jwt = require('jsonwebtoken');    
require('dotenv').config();
const { Document, Packer, Paragraph, TextRun, Header,ImageRun} = require('docx'); 



const create_account = async (req, res) => {  // Create user function (for signup)
    const { email, password, name } = req.body;
    try {

        let emptyFields = []

        if(!email)
        {
            emptyFields.push('email')
        }
         
        if(!password)
            {
                emptyFields.push('password')
            }
         
        if(!name)
            {
                    emptyFields.push('name')
            }
        
        if (!password || password.trim() === '') { //i check if ang input field is null
            return res.status(400).json({ error: 'Password is required' });
        }
        if (!email || email.trim() === '') { //i check if ang input field is null
            return res.status(400).json({ error: 'Email is required' });
        }
        if (!name || name.trim() === '') { //i check if ang input field is null
            return res.status(400).json({ error: 'Name is required' });
        }

        // Check if the email already exists
        const existingUser = await user_data.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already in use' });
        }
        
        // Hash the password before storing it
        const hashedPassword = await bcrypt.hash(password, 12);

        // add to database
        const userInfo = await user_data.create({ email, password: hashedPassword, name });
        res.status(201).json({ message: 'User created successfully', user: userInfo });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create user: ' + error.message });
    }
};


const login_user = async (req, res) => {  
    const { email, password } = req.body; 
    console.log('Received email:', email);
    console.log('Received password:', password);
    try {
        // Check if the email exists
        const user = await user_data.findOne({ email });

        if (!user) {return res.status(401).json({ error: 'Invalid email or password' }); }

        // Compare the password with the hashed password in the database
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) { return res.status(401).json({ error: 'Invalid email or password' }); }

        // Generate a JWT token  expires in 1 day
        const token = generateToken(user._id);

        console.log('welcome user')
        res.status(200).json({ message: 'Welcome user', token,user: { email: user.email, name: user.name },});

    } catch (error) {res.status(500).json({ error: 'Login failed: ' + error.message });}
};





const changePassword = async (req, res) => {
    const { password } = req.body; // Retrieve new password from the request body or input field
    const { id } = req.params;     // Get user ID from the request parameters

    try {
        // Find the user by ID
        const user = await user_data.findOne({ _id: id });
        
        if (!user) {
            // User not found
            return res.status(404).json({ mssg: 'Unable to change password! User not found.' });
        }
        console.log('The new Password is '+password)
        // Hash the new password
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword; // Update the user's password
      
        // Save the updated user
        await user.save();
        console.log('The new Password is '+hashedPassword)
        res.status(200).json({ mssg: 'Password updated successfully!' });
    } catch (error) {
        console.error(error); // Log the error for debugging
        return res.status(404).json({ mssg: 'Unable to change password! User not found.' });
    }
};


const createTravelForm = async (req, res) => { // AUTHORITY TO TRAVEL FORM
    const { name, position, office_code, purpose_travel, department,destination, travel_time_period, auth_travel_number,use_vehicle, chair_person_name, dean_name, vpaa_name,userId  } = req.body;

    try {
        // Check if the user exists
        const user = await user_data.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }

        // Check for duplicate requestor name and travel number
        const existingRequestor = await travel_form_data.findOne({ name });
        const authtravelNumber = await travel_form_data.findOne({ auth_travel_number });
        if (existingRequestor) {
            return res.status(400).json({ error: 'Requestor name already exists.' });
        }
        if (authtravelNumber) {
            return res.status(400).json({ error: 'Authentication travel number already exists.' });
        }

        // Create the travel form with a reference to the user
        const formInfo = await travel_form_data.create({
            name, position, office_code, purpose_travel, department,
            destination, travel_time_period, auth_travel_number,
            use_vehicle, chair_person_name, dean_name, vpaa_name,
            user: userId // Reference the user in the form
        });

        // Add the form's ID to the user's travel_forms array
        user.travel_forms = user.travel_forms || [];
        user.travel_forms.push(formInfo._id);
        await user.save();

        res.status(200).json(formInfo);
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


// const requestFormPreview = async (req,res) =>  // 
// {
//     const {id} = req.params
//     try
//     {
//         if(!mongoose.Types.ObjectId.isValid(id))
//         {
//             return res.status(404).json({error: 'You did not fill up the form yet'})
//         }
//         const requestForm = await user_data.findById(id)    
//         res.status(200).json(user); //change this into viewing the pdf
//     }catch(error)
//     {
//         res.status(404).json({error:'no data available yet'});
//         console.log('no data available yet');
//     }
// }

const weatherAPI = async (req,res) =>
{
    try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`);
        
        // Extract only the needed data
        const weatherData = response.data;
        const filteredData = {
            location: `${weatherData.name}, ${weatherData.sys.country}`,
            temperature: (weatherData.main.temp - 273.15).toFixed(2),  // Convert from Kelvin to Celsius
            description: weatherData.weather[0].description,
            humidity: weatherData.main.humidity,
            windSpeed: weatherData.wind.speed,
        };

        res.json(filteredData);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        res.status(500).json({ message: 'Error fetching weather data' });
    }
}




const wordGenerator = async (req, res) => {
    const fs = require('fs');
    const buksuLogo = fs.readFileSync('backend/word needed images/Screenshot 2024-10-31 003315.png');
    const nullCheckBox = '☐';
    const checkedCheckBox = '☑';
    const withVehicle = isNull; // Replace `isNull` with the actual check

    let textContent;
    if (withVehicle) {
        textContent = 'Use of Vehicle: ' + checkedCheckBox + ' with government vehicle  ' + nullCheckBox + ' without government vehicle';
    } else {
        textContent = 'Use of Vehicle: ' + nullCheckBox + ' with government vehicle  ' + checkedCheckBox + ' without government vehicle';
    }

    const letterContent = new Document({
        headers: {
            default: new Header({
                children: [
                    new Paragraph({
                        children: [
                                    new ImageRun({data: buksuLogo, transformation: {width: 100,height: 100,},}),
                                    new TextRun({ text: 'BUKIDNON STATE UNIVERSITY', bold: true,size: 24,})
                                   ], alignment: 'center',
                                 }),
                    new Paragraph({ text: 'Fortich St. Malaybalay City', alignment: 'center', size: 12 }),
                    new Paragraph({ text: 'Tel (088) 813-5681 to 5663', alignment: 'center', size: 12 }),
                    new Paragraph({ text: 'www.buksu.edu.ph', alignment: 'center', size: 12 }),
                    new Paragraph({ text: 'buksupreoffice@buksu.edu.ph', alignment: 'center', size: 12 })
                ]
            })
        },
        children: [
            new Paragraph({ text: 'AUTHORITY TO TRAVEL', alignment: 'center', size: 15 }),
            new Paragraph({ text: `Authority Travel No. ${auth_travel_number}`, alignment: 'right', size: 12 }),
            new Paragraph({ text: `Date: ${date}`, alignment: 'left', size: 12 }),
            new Paragraph({ text: `NAME: ${name}`, alignment: 'left', size: 12 }),
            new Paragraph({ text: `Position/Designation: ${position}`, alignment: 'left', size: 12 }),
            new Paragraph({ text: `Official Station: ${department}`, alignment: 'left', size: 12 }),
            new Paragraph({ text: `Purpose: ${purpose_travel}`, alignment: 'left', size: 12 }),
            new Paragraph({ text: `Destination: ${destination}`, alignment: 'left', size: 15 }),
            new Paragraph({ text: `Period Covered (Inclusive of travel time): ${travel_time_period}`, alignment: 'left', size: 15 }),
            new Paragraph({ text: `Estimated Expenses: `, alignment: 'left', size: 15 }),
            new Paragraph({ text: `Fund Source: ${fundSource}`, alignment: 'left', size: 15 }),
            new Paragraph({ text: textContent, alignment: 'left', size: 15 }),
            new Paragraph({ text: '\nFull designation', alignment: 'left', size: 15 }),
            new Paragraph({ text: '\nDEAN', alignment: 'left', size: 15 }),
            new Paragraph({ text: '\nVPAA', alignment: 'left', size: 15 }),
            new Paragraph({ text: 'APPROVED: ', alignment: 'justify', size: 15 }),
            new Paragraph({ text: `${nullCheckBox} Official Business`, alignment: 'left', size: 12 }),
            new Paragraph({ text: `${nullCheckBox} Official Time Only`, alignment: 'left', size: 12 }),
            new Paragraph({ text: `${nullCheckBox} Reimbursement of Actual Transportation`, alignment: 'left', size: 12 }),
            new Paragraph({ text: `${nullCheckBox} Travel expenses Maybe Allowed Subject to Availability of Funds`, alignment: 'left', size: 12 }),
            new Paragraph({ text: 'JOY M. MIRASOL PhD', alignment: 'justify', size: 20 }),
            new Paragraph({ text: 'University President', alignment: 'justify', size: 12 })
        ]
    });

    // Return or save the document as needed
};




module.exports = {weatherAPI ,create_account, login_user,createTravelForm, createRequestForm,wordGenerator,changePassword }