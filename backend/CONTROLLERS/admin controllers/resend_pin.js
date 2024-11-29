const admin_data = require ('../../MODELS/admin_model')
const {emailSender} = require('./email_message_sender')
const crypto = require('crypto');


function generatePin(length = 6) {  //para sa recover password
    const randomBytes = crypto.randomBytes(length);
    const pin = randomBytes.readUIntBE(0, length) % (10 ** length);
    return pin.toString().padStart(length, '0');
}   

const resendPin = async (req,res) =>
{   
    const {forgotEmail} = req.body;
    console.log('the email received in the resend pin backend is ',forgotEmail)
    try
        {       
        const existingUser = await admin_data.findOne({email: forgotEmail})
        if(!existingUser)
            {
                console.log('unable to find user in the dsatabase -pin resend')
                return res.status(401).json({error: 'cannot find the user in the database. may be due to not properly passing down the email to the backend -resend pin'}

                )}
      
        const verificationCode = generatePin();
        emailSender(forgotEmail,verificationCode)

         existingUser.temporary_key = verificationCode;
        await existingUser.save();
        return res.status(200).json({message: 'resend pin successfully'})
    }catch(error)
      {  return res.status(500).json({ error: 'Internal server error. Please try again later.' }); }
    
}

module.exports = {resendPin};