const user_data = require('../MODELS/user_model')
const travel_form_data = require('../MODELS/att_form_model')
const request_form_data = require('../MODELS/request_form_model')
const bcrypt = require('bcrypt');
const generateToken = require('../MIDDLEWARES/token_generator')
const jwt = require('jsonwebtoken');    
const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');
require('dotenv').config();
 



const create_account = async (req, res) => {  // Create user function (for signup)
    const { name, email, password,office_code,college_name } = req.body;
    
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
        if (!office_code || office_code.trim() === '') {
            emptyFields.push('and Office Code');
        }
        if (!college_name || college_name.trim() === '') {
            emptyFields.push('and College Name');
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
        const existingUser = await user_data.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already in use' });
        }

        // Hash the password before saving to the database
        const hashedPassword = await bcrypt.hash(password, 12);

        // Save the new user to the database
        const userInfo = await user_data.create({ name, email, password: hashedPassword ,office_code,college_name});
        
        // Return success response
        res.status(201).json({ 
            message: 'User created successfully', 
            user: { name: userInfo.name, email: userInfo.email,office_code,college_name } // Return a subset of the user info to avoid exposing the password
        });

    } catch (error) {
        console.error(error); // It's a good practice to log the error to the server console
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
        console.log('Password match:', isMatch); // Check if the passwords match
        if (!isMatch) { return res.status(401).json({ error: 'Invalid email or password' }); }
        console.log(email)
        console.log(password)
        // Generate a JWT token  expires in 1 day
        const token = generateToken(user._id, user.office_code,user.college_name, user.name, user.email);

console.log(token)
         res.status(200).json({ message: 'Welcome user', token,user: {user_id:user._id, email: user.email, name: user.name ,office_code:user.office_code,college_name:user.college_name},}); 
        
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


const updateProfile = async (req, res) => {
    const { inputName, inputEmail, inputOffice, newCode } = req.body; // Retrieve new fields from the request body
    const { id } = req.params; // Get user ID from the request parameters

    try {
        // Find the user by ID
        const user = await user_data.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Update user information only if new data is provided
        if (inputName && inputName.trim() !== "") {
            user.name = inputName; // Update name if provided
        }
        if (inputEmail && inputEmail.trim() !== "") {
            user.email = inputEmail; // Update email if provided
        }
        if (inputOffice && inputOffice.trim() !== "") {
            user.college_name = inputOffice; // Update college name if provided
        }
        if (newCode && newCode.trim() !== "") {
            user.office_code = newCode; // Update office code if provided
        }

        // Save the updated user
        await user.save();
        res.status(200).json({ message: 'User information updated successfully!' });

    } catch (error) {
        console.error('Error updating user:', error); // Log the error for debugging
        return res.status(500).json({ message: 'An error occurred while updating user information.' });
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
        console.log(location);
        res.json(filteredData);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        res.status(500).json({ message: 'Error fetching weather data' });
    }
}
const generatePdf = async (req, res) => {
    const buksuLogoPath = path.join(__dirname, '..', 'word needed images', 'Screenshot 2024-10-31 003315.png'); // Check if this path is correct
    const checkedBoxPath = path.join(__dirname, '..', 'word needed images', 'checked box.png');
    const nullcheckedBoxPath = path.join(__dirname, '..', 'word needed images', 'null box.png');

    const {
        name,
        position,
        purpose_travel,
        department,
        station,
        dateDay,
        dateYear,
        dateMonth,
        destination,
        fundSource,
        travel_time_period,
        auth_travel_number,
        checkedWithVehicle,
        checkedWithoutVehicle,
        chairperson_name,
        dean_name,
        vpaa_name,
    } = req.body;
    let requestDate = dateMonth +" "+ dateDay +" "+ dateYear;

    const font = 'Helvetica';

    

    const pdfPath = path.join(__dirname, '..', 'generated_pdfs', 'Authority to travel.pdf');

    // Create a writable stream to save the PDF

    const doc = new PDFDocument({ size: 'A4' });


    // Set headers for the response before piping the document
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="AuthorityToTravel.pdf"'); 

    // Pipe the document to the response
    doc.pipe(res);
    doc.font(font);

    // Get the width and height after the page is added
    const { width, height } = doc.page;
    let yPosition = 25;
    let xPosition = 55;

    const dateWidth = doc.widthOfString(`Date: `);
    const authTravelNumberWidth = doc.widthOfString(`Authority Travel No. ${auth_travel_number}`);
    const leftX = 30;  // Position of Date text
    const rightX = width - authTravelNumberWidth - 50;  // Position of Authority Travel No. text (right-aligned)

    // Check if the logo file exists and add it to the PDF
    if (fs.existsSync(buksuLogoPath)) {
        doc.image(buksuLogoPath, xPosition, yPosition, { width: 60, height: 60 });
    } else {
        console.warn("Logo image not found at path:", buksuLogoPath);
    }

  
   
    // Draw University Name and contact info (center-aligned)
    xPosition += 28
    doc.font('Helvetica-Bold').fontSize(25); 
    doc.text('BUKIDNON STATE UNIVERSITY', xPosition,yPosition ,{ align: 'center'});


    yPosition += 33
    doc.font('Helvetica').fontSize(7)
    doc.text(
        'Fortich St. Malaybalay City   Tel (088) 813-5681 to 5663     www.buksu.edu.ph     buksupreoffice@buksu.edu.ph', 
        50, // Starting X position
        yPosition, // Starting Y position
        { width: width - 100, align: 'center'}  // Wrap text if it's too wide
    );

    yPosition += 10
    xPosition += 55
    doc.font('Helvetica').fontSize(7)
    doc.text(
        '8700 Bukidnon                      Tel Fax (088) 813-2717', 
        xPosition, // Starting X position
        yPosition, // Starting Y position
        { width: width - 100}  // Wrap text if it's too wide
    );

    doc.moveTo(50, yPosition+30)  // Starting point (x = 50, y = yPosition)
    .lineTo(width - 50, yPosition+30)  // Ending point (x = width - 50, y = yPosition)
    .stroke();  // This draws the line
    
    // Title "AUTHORITY TO TRAVEL"
    yPosition += 50
    xPosition -= 30


    doc.font('Helvetica-Bold').fontSize(17); 
    doc.text('AUTHORITY TO TRAVEL',50,yPosition, { align: 'center'});


    doc.image(nullcheckedBoxPath,328,590,{ width: 14, height: 14})
    doc.image(nullcheckedBoxPath,328,610,{ width: 14, height: 14})
    doc.image(nullcheckedBoxPath,328,630,{ width: 14, height: 14})
    doc.image(nullcheckedBoxPath,328,650,{ width: 14, height: 14})
    
    // Add Travel Info
    const travelInfoY = 200;  // Vertical position for travel info

    yPosition += 60;
    xPosition = 50
    doc.font('Helvetica').fontSize(12)
    doc.text(`Date:          ${requestDate}` ,xPosition,yPosition);  // Date aligned to the left
    xPosition  += 300
    doc.text(`Authority Travel No.       ${auth_travel_number}`,xPosition,yPosition);  // Auth Travel No. aligned to the right
    
    // Other travel information
    yPosition += 70;
    xPosition = 50
    doc.text(`Name:                                      ${name}`,xPosition,yPosition);
    yPosition += 20
    doc.text(`Position/Designation:              ${position}`,xPosition ,yPosition);
    yPosition += 20
    doc.text(`Official Station:                         ${station}`,xPosition,yPosition);
    yPosition += 20
    doc.text(`Purpose:                                  ${purpose_travel}`, xPosition, yPosition);
    yPosition += 20 
    doc.text(`Destination:                              ${destination}`, xPosition,yPosition);
    yPosition += 20  
    doc.text(`Period Covered:                        ${travel_time_period}`, xPosition, yPosition);
    yPosition += 20 
    doc.text(`Fund Source:                              ${fundSource}`, xPosition, yPosition);

  

    if (checkedWithVehicle) {
        console.log('with vehicle');
        doc.image(checkedBoxPath, xPosition + 80, yPosition + 17, { width: 15, height: 15 });
        doc.image(nullcheckedBoxPath, xPosition + 225, yPosition + 17, { width: 15, height: 15 });
    } else if (checkedWithoutVehicle) {
        console.log('without vehicle');
        doc.image(nullcheckedBoxPath, xPosition + 80, yPosition + 17, { width: 15, height: 15 });
        doc.image(checkedBoxPath, xPosition + 225, yPosition + 17, { width: 15, height: 15 });
    } 
    else {
         console.log('no checkbox selected');
         doc.image(nullcheckedBoxPath, xPosition + 225, yPosition + 17, { width: 15, height: 15 });
         doc.image(nullcheckedBoxPath, xPosition + 80, yPosition + 17, { width: 15, height: 15 });
     }

    yPosition += 20
    doc.text('Use of Vehicle:     with government vehicle     without government vehicle', xPosition, yPosition);

    // Signature lines
    yPosition += 45
    doc.text(`${chairperson_name}`,xPosition, yPosition);
    yPosition += 20
    doc.font('Helvetica-Oblique').text('Full designation: ', xPosition, yPosition);
    yPosition += 25
    doc.text(`${dean_name}`,xPosition,yPosition);
    yPosition += 20
    doc.font('Helvetica-Oblique').text('DEAN', xPosition, yPosition);
    yPosition += 25
    doc.text(`${vpaa_name}`,xPosition, yPosition);
    yPosition += 20
    doc.font('Helvetica-Oblique').text('VPAA', xPosition, yPosition);

    // Approval section
    yPosition += 30
    xPosition += 230
    doc.font('Helvetica').text('APPROVED:', xPosition,yPosition);
    yPosition += 20
    xPosition += 60
    doc.fontSize(10)
    doc.text(` Official Business`, xPosition, yPosition);
    yPosition += 20
    doc.text(` Official Time Only`, xPosition, yPosition);
    yPosition += 20
    doc.text(` Reimbursement of Actual Transportation`, xPosition, yPosition);
    yPosition += 20
    doc.text(` Travel expenses Maybe Allowed Subject  to Availability of Funds`, xPosition, yPosition);

    doc.fontSize(11)
    yPosition += 80
    doc.font('Helvetica').text('JOY M. MIRASOL PhD', 50, yPosition, {align:'center'});
    yPosition += 15
    doc.text('University President', 50, yPosition,{align:'center'});

    // Finalize the PDF document
    doc.end();

    // Log message after the PDF is generated
    doc.on('finish', () => {
        console.log('PDF generated successfully!');
    });

    doc.on('error', (err) => {
        console.error('PDF generation error:', err);
        res.status(500).json({ message: 'PDF generation unsuccessful!' });
    });
};








module.exports = {weatherAPI ,create_account, login_user,createTravelForm, createRequestForm,changePassword, updateProfile ,generatePdf}