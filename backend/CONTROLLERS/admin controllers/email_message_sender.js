const nodemailer = require('nodemailer');
const {adminPinEmailTemplate} = require('../../MIDDLEWARES/email messages')
require('dotenv').config();


const gsu_email = process.env.EMAIL_NODE;
const gsu_password =process.env.PASSWORD_NODE;


const emailSender = async (forgotEmail,verificationCode) =>
          {
        const emailTemplate = adminPinEmailTemplate(verificationCode);
        
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
            to: forgotEmail,
            subject: 'Email verification',
            html: emailTemplate,
        };
        
        try {
            await transporter.sendMail(mailOptions);
            console.log('pin code is sent to:', forgotEmail);
        } catch (error) {
            console.error('Error sending email:', error);
            return res.status(500).json({ error: 'Error sending email' });
        }
    }

    module.exports = {emailSender};