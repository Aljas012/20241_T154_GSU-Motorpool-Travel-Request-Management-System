const user_data = require("../../MODELS/user_model");
const bcrypt = require("bcrypt");
const userGenerateToken =require("../../MIDDLEWARES/token_generator").userGenerateToken;
const  {passwordGeneratorForGoogleSignup} = require('../../MIDDLEWARES/email messages');
const {getUserData} =require ('../../MIDDLEWARES/fetch_userdata_signup')
const { OAuth2Client} = require ('google-auth-library')
const nodemailer = require('nodemailer');
const crypto = require('crypto');
require('dotenv').config();

const gsu_email = process.env.EMAIL_NODE;
const gsu_password =process.env.PASSWORD_NODE;

const handleGoogleCallback = async (req, res) => {
    const code = req.query.code;
  
    try {
        const redirectUrl = 'http://localhost:8000/user/googleCallback';
        const oAuth2Client = new OAuth2Client(
            process.env.GOOGLE_AUTH_CLIENT_ID,
            process.env.GOOGLE_AUTH_CLIENT_SECRET,
            redirectUrl
        );
        const response = await oAuth2Client.getToken(code);
        oAuth2Client.setCredentials(response.tokens); 
  
      
        const accessToken = response.tokens.access_token;
        const userData = await getUserData(accessToken); 
        const refresh_token = response.tokens.refresh_token;
  
        const { id, email, name } = userData;
        let user = await user_data.findOne({ email: email });
        if(user)
            { 
              await user_data.findOneAndUpdate(
                { email },
                { 
                    $set: { 
                        google_refresh_token: refresh_token,
                        last_token_refresh: new Date()
                    }
                },
                { new: true }
            );
              const token = userGenerateToken(user.id, user.college_name, user.name, user.email, user.office_code);
              res.redirect(`http://localhost:5173/redirect?redirectedFrom=googleCallback&token=${token}&id=${user.id}&name=${user.name}&email=${user.email}&college_name=${user.college_name}&office_code=${user.office_code}`);
              return;
            } 
  
        function generateRandomPassword(length = 12) {
          return crypto.randomBytes(length).toString('base64').slice(0, length);
        } 
        generatedPassword = generateRandomPassword();
        
        const hashedPassword = await bcrypt.hash(generatedPassword, 12);  
        if (!user) {
      
            user = new user_data({
                name,
                email,
                password:hashedPassword,
                office_code: '', 
                college_name: '', 
                temporary_key: '', 
                google_id: id, 
                google_refresh_token: refresh_token
            });
            await user.save();
        }
   
      const token = userGenerateToken(user.id, user.college_name, user.name, user.email, user.office_code);
  
        
       let emailHtmlContent = passwordGeneratorForGoogleSignup(name,generatedPassword);  
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
          subject: 'Password Generator',
          html:   emailHtmlContent,
        };
      
        try {
          await transporter.sendMail(mailOptions);
          console.log('Email sent to:', email);
          res.redirect(`http://localhost:5173/redirect?redirectedFrom=googleCallback&token=${token}&id=${user.id}&name=${user.name}`);
  
        } catch (error) {
          console.error('Error sending email:', error);
          return res.status(500).json({ error: 'Error sending email' });
        }
      
    } catch (err) {
        console.error('Error with signing in as Google:', err);
        res.status(500).json({ error: 'Failed to sign in with Google' });
    }
  };

  module.exports = {handleGoogleCallback}