const admin_data = require ('../../MODELS/admin_model')
const {emailSender } = require('./email_message_sender')
const crypto = require('crypto');

    function generatePin(length = 6) {  //para sa recover password
        const randomBytes = crypto.randomBytes(length);
        const pin = randomBytes.readUIntBE(0, length) % (10 ** length);
        return pin.toString().padStart(length, '0');
    }   

   const emailVerifier = async (req,res) => //para ni sa change password email verifier
        {             
                const {forgotEmail} = req.body;
                console.log('email sent to backend is ',forgotEmail)
                const verificationCode = generatePin();
             
                try {

                    const found = await admin_data.findOne({email: forgotEmail});
                    
                    if(!found)
                        {
                      console.log('user not found in the database')
                      return res.status(401).json({mssg:'Not registered!'})
                    }

                    emailSender(forgotEmail,verificationCode)

                    console.log('email sent')
                    found.temporary_key = verificationCode;
                    await found.save();
                    
                 return res.status(200).json({message:'successfully sent the verification code to ',forgotEmail})
                }catch(error)
                        {
                            console.log('unable to run the try statement -backend')
                    }
        }        

module.exports = {emailVerifier};