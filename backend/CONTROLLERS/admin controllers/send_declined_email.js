const request_data = require('../../MODELS/request_form_model')
const user_data = require('../../MODELS/user_model')
const {declinedAdminRTT} = require('../../MIDDLEWARES/email messages');
const nodemailer = require('nodemailer');
require('dotenv').config();

const gsu_email = process.env.EMAIL_NODE;
const gsu_password =process.env.PASSWORD_NODE;


async function sendEmail (user_email,requestor_name,request_date,departure_time,passenger_names)
{
 const emailTemplate = declinedAdminRTT(requestor_name,request_date,departure_time,passenger_names);

  const transporter = nodemailer.createTransport({ 
        host: 'smtp.gmail.com',  port: 465, secure: true,
        auth: {  user: gsu_email, pass: gsu_password,},}
         );

  const mailOptions = {
        from: gsu_email,
        to: user_email, subject: 'Approved Travel Request',
        html: emailTemplate,
        };
        try{
                  await transporter.sendMail(mailOptions);
                  console.log('successful sending email to',user_email)
        }catch(error)
             {
                 console.error('Error sending email:', error);
                 throw error;
        }
}   

module.exports = sendEmail;




const sendDeclinedEmail = async (req,res)=>{
    const {requestId} = req.body;
    console.log("Declined email's request id is ",requestId)
    try{
            const findEmail = await request_data.findOne({_id:requestId})

            if(!findEmail){
                console.log('request unsuccessful')
                return res.status(404).json({success:false,message: "Cannot find the request's publisher"})
            }
            const reference_id = findEmail.reference_id;
            const request_date = findEmail.travel_details.date_travel;
            const departure_time = findEmail.travel_details.departure_time;
            const requestor_name = findEmail.requestor_name;
            const passenger_names = findEmail.travel_details.passenger_names;

            const findUser = await user_data.findOne({_id:reference_id})
            if(!findUser){
                console.log('request unsuccessful')
                return res.status(404).json({success:false,message: "Cannot find the user"})
            }
            const user_email = findUser.email;
            console.log('user email is ',user_email)
            await sendEmail(user_email,requestor_name,request_date,departure_time,passenger_names)
            console.log('Successful sending email ')
            return res.status(200).json({ message: 'Request approved successfully'});
    }catch(error){
        return res.status(500).json({success:false,message: 'Something went wrong in the backend'})
    }



}
module.exports = {sendDeclinedEmail}