const user_data = require("../MODELS/user_model");
const travel_form_data = require("../MODELS/att_form_model");
const request_form_data = require("../MODELS/request_form_model");
const bcrypt = require("bcrypt");
const userGenerateToken =require("../MIDDLEWARES/token_generator").userGenerateToken;
const  { signupVerification, forgotPassword ,passwordGeneratorForGoogleSignup} = require('../MIDDLEWARES/email messages');
const {getUserData} =require ('../MIDDLEWARES/fetch_userdata_signup')
const { OAuth2Client} = require ('google-auth-library')
const fs = require("fs");
const path = require("path");
const PDFDocument = require("pdfkit");
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const { register } = require("module");
require('dotenv').config();


function generatePin(length = 6) {  //para sa recover password
  const randomBytes = crypto.randomBytes(length);
  const pin = randomBytes.readUIntBE(0, length) % (10 ** length);
  return pin.toString().padStart(length, '0');
}



const gsu_email = process.env.EMAIL_NODE;
const gsu_password =process.env.PASSWORD_NODE;




//============== PARA NI SA CHANGEPASSWORD================
const pinGmailSender = async (req, res) => {
        
        let temporaryPin  = generatePin();
        
        const  changePasswordPin = temporaryPin ;
        const emailMessage = forgotPassword(changePasswordPin)

        const emailData = req.body.email;  // Get the email from req.body.email
        console.log('the data sent to backend is ',emailData)


        const existingUser = await user_data.findOne({ email:emailData });
          if (!existingUser) {
            return res.status(400).json({error:'email address is not yet registered'});
          }

          existingUser.temporary_key = changePasswordPin; // Save the PIN in the database temporaryPin field
          await existingUser.save(); 
        
        // Create the transporter object using Gmail's SMTP settings
        const transporter = nodemailer.createTransport(
          {
                host: 'smtp.gmail.com',
                port: 465,
                secure: true,
                auth: {
                  user: gsu_email,
                  pass: gsu_password,
                },
          });


        const mailOptions = {
          from: gsu_email,
          to: emailData,
          subject: 'Password Reset PIN',
          html:  emailMessage,  // Use the dynamically generated HTML with the PIN
        };

     
      try {
        const info = await transporter.sendMail(mailOptions);
        console.log('email successfully sent')
        res.status(200).json({ message: 'Email sent successfully' }); // Return success response
      } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Error sending email' }); // Return error response if email fails
      }
    };


    //================================================================

    const verifyPin = async (req, res) => {
     
      const { forgotPin, forgotEmail } = req.body;
      console.log('received email ',forgotEmail)
      console.log('received pin ',forgotPin)


      try {
        const existingUser = await user_data.findOne({ email: forgotEmail });
        
        if (!existingUser) {
          console.log('Error: User not found');
          return res.status(400).json({ message: 'User not found' });
        }

        const storedKey = existingUser.temporary_key;

        console.log('Pin received in the backend is ' + forgotPin);
        console.log('Key stored in the database is ' + storedKey);
    
        
        if (String(forgotPin.trim()) === storedKey) {
          console.log('Success');
          return res.status(200).json({ message: 'Pin verified successfully' }); 
        }

        console.log('Invalid pin!');
        return res.status(400).json({ message: 'Invalid pin' });
      

      } catch (error) {
        console.error('Something went wrong in processing the pin:', error);
        return res.status(500).json({ message: 'Internal server error' }); // Respond for server errors
      }
    };
    

/**============================  CREATE ACCOUNT CONTROLLER  ========================= */

const create_account = async (req, res) => {
  // Create user function (for signup)
  const { name, email, password, office_code, college_name } = req.body;
  // Add this for debugging

  try {    



        // Check if the email already exists in the database
        const existingUser = await user_data.findOne({ email });
        if (existingUser) {
          return res.status(400).json({ error: "Email already in use" });
        }

        // Hash the password before saving to the database
        const hashedPassword = await bcrypt.hash(password, 12);

        // Save the new user to the database
        const userInfo = await user_data.create({
          name,
          email,
          password: hashedPassword,
          office_code,
          college_name,
        });

    // Return success response
    res.status(201).json({
      message: "User created successfully",
      user: {
        name: userInfo.name,
        email: userInfo.email,
        office_code,
        college_name,
      }, // Return a subset of the user info to avoid exposing the password
    });
  } catch (error) {
    console.error(error); // It's a good practice to log the error to the server console
    res.status(500).json({ error: "Failed to create user: " + error.message });
  }
};


/**============================  LOGIN AS USER CONTROLLER  ========================= */

const login_user = async (req, res) => {
  const { email, password } = req.body;
  console.log("Received email:", email);
  console.log("Received password:", password);
  try {
    // Check if the email exists
    const user = await user_data.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });   }

    // Compare the password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password match:", isMatch); // Check if the passwords match
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

  
    const token = userGenerateToken(
      user._id,
      user.office_code,
      user.college_name,
      user.name,
      user.email
    );

    res .status(200) .json({
                            message: "Welcome user",
                            token,
                            user: {
                              user_id: user._id,
                              email: user.email,
                              name: user.name,
                              office_code: user.office_code,
                              college_name: user.college_name,
                            },
                          });
  } catch (error) {
    res.status(500).json({ error: "Login failed: " + error.message });
  }
};



/**========================== MANUAL EMAIL AUTHENTICATOR AND ACCOUNT CREATION ====================== */
const tempPins = {};

function pinGenerator(length = 6) {
  const pin = crypto.randomInt(0, 10 ** length);
  return pin.toString().padStart(length, '0');
}


const verifyEmailSignup = async (req, res) => {
  const { name, email } = req.body;
  console.log('received name: ',name)
  console.log('received email', email)

  const existingUser = await user_data.findOne({ email });
  if (existingUser) {
    console.log('user attempting to signup is already registered!')
    return res.status(400).json({ error: "Email already in use" });
  }

  const pin = pinGenerator();
  tempPins[email] = pin;
  console.log('Generated PIN:', pin);
  const signupEmailTemplate = signupVerification(name, pin);

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: gsu_email,
      pass: gsu_password,
    },
  });

  const mailOptions = {
    from: process.env.GSU_EMAIL,
    to: email,
    subject: 'Email verification',
    html: signupEmailTemplate,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent to:', email);
    return res.status(200).json({ message: "Verification email sent successfully" });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ error: 'Error sending email' });
  }
};




const verifyPinAndCreateUser = async (req, res) => {
  const { inputtedCode, name, email, password, office_code, college_name } = req.body;

  try {
    // Check if a verification code exists for this email
    if (!tempPins[email]) {
      return res.status(400).json({ error: 'No verification code found for this email' });
    }

    // Check if the inputted PIN matches the stored PIN
    const storedPin = tempPins[email];
    
    if (storedPin.pin === inputtedCode) {
      // Successfully verified PIN, remove it from the temporary storage
      delete tempPins[email];
      
      // Hash the password before storing it in the database
      const hashedPassword = await bcrypt.hash(password, 12);

      // Create a new user in the database
      const newUser = await user_data.create({
        name,
        email,
        password: hashedPassword,
        office_code,
        college_name
      });

      // Return a success message along with the user data (excluding password)
      const { password: _, ...userWithoutPassword } = newUser.toObject();
      return res.status(201).json({
        message: 'User created successfully! Please log in.',
        user: userWithoutPassword
      });
    } else {
      // Invalid PIN, return an error response
      return res.status(400).json({ error: "Invalid PIN, please try again" });
    }
  } catch (error) {
    console.error('Error in verifyPinAndCreateUser:', error);
    return res.status(500).json({ error: 'An error occurred while creating the user. Please try again later.' });
  }
};
    







/**============================  CHANGE PASSWORD CONTROLLER  ========================= */

const changePassword = async (req, res) => {
  
  const {  newPassword, forgotEmail } = req.body;

  try {
    console.log("Password update process started..."); 

    console.log(''+forgotEmail)
    const existingUser = await user_data.findOne({ email: forgotEmail });

    if (!existingUser) {
      console.log("User not found."); // Additional console message
      return res.status(404).json({ mssg: "Unable to change password! User not found." });
    }

    console.log("The new Password is " + newPassword);

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the password field and save
    existingUser.password = hashedPassword;
    await existingUser.save();

    console.log("The new hashed Password is " + hashedPassword); // Log hashed password for debugging
    console.log("Password updated successfully!"); // Added success console message
    existingUser.temporary_key = ""; 
    await existingUser.save(); 
    // Respond with success message
    res.status(200).json({ mssg: "Password updated successfully!" });
  } catch (error) {
    console.error(error); // Log the error for debugging
    return res.status(500).json({ mssg: "Unable to change password. An error occurred." });
  }
};


/**=============================== GOOGLE SIGNUP API =============================== */
      

const signupAsGoogle = async (req, res) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
        res.header('Referrer-Policy', 'no-referrer-when-downgrade');

  const redirectUrl = 'http://localhost:8000/user/googleCallback';

  const oAuth2Client = new OAuth2Client(
      process.env.GOOGLE_AUTH_CLIENT_ID,
      process.env.GOOGLE_AUTH_CLIENT_SECRET,
      redirectUrl
  );

  const authorizedUrl = oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: [
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/calendar'
      ],
      prompt: 'consent',
  });
  res.json({ url: authorizedUrl });
};



/**============================  PROFILE UPDATE CONTROLLER  ========================= */




const createTravelForm = async (req, res) => {
  // AUTHORITY TO TRAVEL FORM
  const {name, position, purpose_travel,  station, destination,
    fundSource,request_date,travel_time_period,auth_travel_number, use_vehicle, chair_person_name,
    dean_name, vpaa_name,userId} = req.body;
    
    
    console.log("Received userId in createTravelForm:", userId);
  try {
    // Check if the user exists
    
    const user = await user_data.findById(userId);

    if (!user) {
      console.log('user is notregistered and cannot be search on the database!')
      return res.status(404).json({ error: "User not found." });
    }
      console.log('user is registered and can be search on the database')
        //i store sa database
      const authorityData = { name, position, purpose_travel,  station, destination,
        fundSource,request_date,travel_time_period,auth_travel_number, use_vehicle, chair_person_name,
        dean_name, vpaa_name,userId};

        user.authority_to_travel.push(authorityData);
        await user.save();  
        console.log('data has been successfully saved!')

    res.status(200).json({
      message: "Authority to travel form added successfully",
      data: authorityData
    });
  } catch (error) {
    res
      .status(400)
      .json({ error: "Failed to add data to the database: " + error.message });
  }
};



//================ CREATE RRT FORM =======================

const createRequestForm = async (req, res) => {
  const {  college_name, requestor_name, contact_number, request_date,
    request_time,travel_details,  } = req.body;

  try {
        const existingRequestor = await request_form_data.findOne({ requestor_name, });

        if (existingRequestor) {
                return res.status(400).json({ error: "Requestor name already exists." });
              }

    const formInfo = await request_form_data.create(
      { college_name, requestor_name, contact_number,
      request_date, request_time,
      travel_details,
      att_file,
    });
    res.status(200).json(formInfo);
  } catch (error) {
    console.error(error);
    res .status(400).json({ error: "Failed to add data to the database: " + error.message });
  }
};








const generatePdf = async (req, res) => {  // function for pdf generation

  const buksuLogoPath = path.join(
    __dirname,
    "..",
    "word needed images",
    "Screenshot 2024-10-31 003315.png"
  ); // Check if this path is correct
  const checkedBoxPath = path.join(
    __dirname,
    "..",
    "word needed images",
    "checked box.png"
  );
  const nullcheckedBoxPath = path.join(
    __dirname,
    "..",
    "word needed images",
    "null box.png"
  );

  const {
    name,
    position,
    purpose_travel,
    station,
   request_date,
    destination,
    fundSource,
    travel_time_period,
    auth_travel_number,
    checkedWithVehicle,
    checkedWithoutVehicle,
    chair_person_name,
    dean_name,
    vpaa_name,
  } = req.body;



  const font = "Helvetica";

  const pdfPath = path.join(
    __dirname,
    "..",
    "generated_pdfs",
    "Authority to travel.pdf"
  );

 

  const doc = new PDFDocument({ size: "A4" });

  
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    'attachment; filename="AuthorityToTravel.pdf"'
  );

  // Pipe the document to the response
  doc.pipe(res);
  doc.font(font);

  // Get the width and height after the page is added
  const { width, height } = doc.page;
  let yPosition = 25;
  let xPosition = 55;

  const dateWidth = doc.widthOfString(`Date: `);
  const authTravelNumberWidth = doc.widthOfString(
    `Authority Travel No. ${auth_travel_number}`
  );
  const leftX = 30; // Position of Date text
  const rightX = width - authTravelNumberWidth - 50; // Position of Authority Travel No. text (right-aligned)

  // Check if the logo file exists and add it to the PDF
  if (fs.existsSync(buksuLogoPath)) {
    doc.image(buksuLogoPath, xPosition, yPosition, { width: 60, height: 60 });
  } else {
    console.warn("Logo image not found at path:", buksuLogoPath);
  }

  // Draw University Name and contact info (center-aligned)
  xPosition += 28;
  doc.font("Helvetica-Bold").fontSize(25);
  doc.text("BUKIDNON STATE UNIVERSITY", xPosition, yPosition, {
    align: "center",
  });

  yPosition += 33;
  doc.font("Helvetica").fontSize(7);
  doc.text(
    "Fortich St. Malaybalay City   Tel (088) 813-5681 to 5663     www.buksu.edu.ph     buksupreoffice@buksu.edu.ph",
    50, // Starting X position
    yPosition, // Starting Y position
    { width: width - 100, align: "center" } // Wrap text if it's too wide
  );

  yPosition += 10;
  xPosition += 55;
  doc.font("Helvetica").fontSize(7);
  doc.text(
    "8700 Bukidnon                      Tel Fax (088) 813-2717",
    xPosition, // Starting X position
    yPosition, // Starting Y position
    { width: width - 100 } // Wrap text if it's too wide
  );

  doc
    .moveTo(50, yPosition + 30) // Starting point (x = 50, y = yPosition)
    .lineTo(width - 50, yPosition + 30) // Ending point (x = width - 50, y = yPosition)
    .stroke(); // This draws the line

  // Title "AUTHORITY TO TRAVEL"
  yPosition += 50;
  xPosition -= 30;

  doc.font("Helvetica-Bold").fontSize(17);
  doc.text("AUTHORITY TO TRAVEL", 50, yPosition, { align: "center" });

  doc.image(nullcheckedBoxPath, 328, 590, { width: 14, height: 14 });
  doc.image(nullcheckedBoxPath, 328, 610, { width: 14, height: 14 });
  doc.image(nullcheckedBoxPath, 328, 630, { width: 14, height: 14 });
  doc.image(nullcheckedBoxPath, 328, 650, { width: 14, height: 14 });

  // Add Travel Info
  const travelInfoY = 200; // Vertical position for travel info

  yPosition += 60;
  xPosition = 50;
  doc.font("Helvetica").fontSize(12);
  doc.text(`Date:          ${request_date}`, xPosition, yPosition); // Date aligned to the left
  xPosition += 300;
  doc.text(
    `Authority Travel No.       ${auth_travel_number}`,
    xPosition,
    yPosition
  ); // Auth Travel No. aligned to the right

  // Other travel information
  yPosition += 70;
  xPosition = 50;
  doc.text(
    `Name:                                      ${name}`,
    xPosition,
    yPosition
  );
  yPosition += 20;
  doc.text(
    `Position/Designation:              ${position}`,
    xPosition,
    yPosition
  );
  yPosition += 20;
  doc.text(
    `Official Station:                         ${station}`,
    xPosition,
    yPosition
  );
  yPosition += 20;
  doc.text(
    `Purpose:                                  ${purpose_travel}`,
    xPosition,
    yPosition
  );
  yPosition += 20;
  doc.text(
    `Destination:                              ${destination}`,
    xPosition,
    yPosition
  );
  yPosition += 20;
  doc.text(
    `Period Covered:                        ${travel_time_period}`,
    xPosition,
    yPosition
  );
  yPosition += 20;
  doc.text(
    `Fund Source:                              ${fundSource}`,
    xPosition,
    yPosition
  );

  if (checkedWithVehicle) {
    console.log("with vehicle");
    doc.image(checkedBoxPath, xPosition + 80, yPosition + 17, {
      width: 15,
      height: 15,
    });
    doc.image(nullcheckedBoxPath, xPosition + 225, yPosition + 17, {
      width: 15,
      height: 15,
    });
  } else if (checkedWithoutVehicle) {
    console.log("without vehicle");
    doc.image(nullcheckedBoxPath, xPosition + 80, yPosition + 17, {
      width: 15,
      height: 15,
    });
    doc.image(checkedBoxPath, xPosition + 225, yPosition + 17, {
      width: 15,
      height: 15,
    });
  } else {
    console.log("no checkbox selected");
    doc.image(nullcheckedBoxPath, xPosition + 225, yPosition + 17, {
      width: 15,
      height: 15,
    });
    doc.image(nullcheckedBoxPath, xPosition + 80, yPosition + 17, {
      width: 15,
      height: 15,
    });
  }

  yPosition += 20;
  doc.text(
    "Use of Vehicle:     with government vehicle     without government vehicle",
    xPosition,
    yPosition
  );

  // Signature lines
  yPosition += 45;
  doc.text(`${chair_person_name}`, xPosition, yPosition);
  yPosition += 20;
  doc
    .font("Helvetica-Oblique")
    .text("Full designation: ", xPosition, yPosition);
  yPosition += 25;
  doc.text(`${dean_name}`, xPosition, yPosition);
  yPosition += 20;
  doc.font("Helvetica-Oblique").text("DEAN", xPosition, yPosition);
  yPosition += 25;
  doc.text(`${vpaa_name}`, xPosition, yPosition);
  yPosition += 20;
  doc.font("Helvetica-Oblique").text("VPAA", xPosition, yPosition);

  // Approval section
  yPosition += 30;
  xPosition += 230;
  doc.font("Helvetica").text("APPROVED:", xPosition, yPosition);
  yPosition += 20;
  xPosition += 60;
  doc.fontSize(10);
  doc.text(` Official Business`, xPosition, yPosition);
  yPosition += 20;
  doc.text(` Official Time Only`, xPosition, yPosition);
  yPosition += 20;
  doc.text(` Reimbursement of Actual Transportation`, xPosition, yPosition);
  yPosition += 20;
  doc.text(
    ` Travel expenses Maybe Allowed Subject  to Availability of Funds`,
    xPosition,
    yPosition
  );

  doc.fontSize(11);
  yPosition += 80;
  doc
    .font("Helvetica")
    .text("JOY M. MIRASOL PhD", 50, yPosition, { align: "center" });
  yPosition += 15;
  doc.text("University President", 50, yPosition, { align: "center" });

  // Finalize the PDF document
  doc.end();

  // Log message after the PDF is generated
  doc.on("finish", () => {
    console.log("PDF generated successfully!");
  });

  doc.on("error", (err) => {
    console.error("PDF generation error:", err);
    res.status(500).json({ message: "PDF generation unsuccessful!" });
  });
};

module.exports = {
  create_account,
  login_user,
  createTravelForm,
  createRequestForm,
  changePassword,
  generatePdf,
  pinGmailSender,
  verifyPin,
  verifyEmailSignup,
  verifyPinAndCreateUser,
  signupAsGoogle
};
