const driver_data = require ('../../MODELS/driver_model')

const addDriver = async (req,res) =>
{   
        const {driverName,contactInformation} = req.body;
        const name = driverName.toUpperCase()
        try{
            const existingDriver  = await driver_data.findOne({ driverName:name })

            if (existingDriver) {
                console.log('Driver already exists!');
                return res.status(409).json({ message: 'Driver already exists!' });
            }
          
            const newDriver = new driver_data({
                driverName: name,
                status: "Available",
                contactInformation: contactInformation
            });
    
            await newDriver.save(); // Save the new driver
            return res.status(200).json({ message: 'Successfully added the driver' });

        }catch(error)
         {
            return res.status(500).json({message:'Something went wrong!  -catch statement backend'})
         }

}
module.exports = {addDriver}