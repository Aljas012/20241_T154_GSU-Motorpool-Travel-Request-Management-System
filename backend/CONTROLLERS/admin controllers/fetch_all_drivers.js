const driver_data = require ('../../MODELS/driver_model')

const fetchAllDrivers = async (req, res) => {
    console.log('Fetching all drivers...');
  try {


    const allDrivers = await driver_data.find();

    if (!allDrivers || allDrivers.length === 0) {
      console.log('No drivers found');
    
    }else{

    return res.status(200).json(allDrivers);}
  } catch (error) {
    console.log('Error fetching drivers:', error);  // Log the error
    return res.status(500).json({ message: 'Something went wrong in the backend' });
  }
};


module.exports = {fetchAllDrivers}