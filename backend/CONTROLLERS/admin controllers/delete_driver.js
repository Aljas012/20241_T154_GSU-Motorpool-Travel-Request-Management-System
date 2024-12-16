const driver_data = require ('../../MODELS/driver_model')

const deleteDriver = async (req,res) =>   
    {
        const {_id} = req.params;

try
{
        const existingDriver = await driver_data.findByIdAndDelete(_id);
        if(!existingDriver)
          {
            return res.status(401).json({message: 'Driver is currently not available in the database'})
        }
        return  res.status(200).json({message:'driver deletion successful!'})
    }catch(error)
    {
        return res.status(500).json({message:'something went wrong in the backend -delete driver'})
    }
}

module.exports = {deleteDriver}