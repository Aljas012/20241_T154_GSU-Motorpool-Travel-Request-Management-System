const admin_data = require ('../../MODELS/admin_model')

const pinTimeout = async (req,res) => // i remove niya ang pin sa database if ma human ang timer
    {
        const {forgotEmail} =req.body;
        console.log('the forgot email received in the backend is ', forgotEmail)
        try{
                const existingUser = await admin_data.findOne({email: forgotEmail})

                existingUser.temporary_key = ""
                await existingUser.save();
                return res.status(200).json({mssg:'successfully removed the pin in the database'})
        }catch(error)
         {
            console.log('unable to run the try statement in the backend -pin timer')
            return;s
        }
}
module.exports = {pinTimeout};