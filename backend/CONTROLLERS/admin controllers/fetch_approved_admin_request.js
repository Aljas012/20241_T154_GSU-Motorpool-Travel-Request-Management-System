const admin_request_data = require('../../MODELS/admin_request_model');
const request_data = require('../../MODELS/request_form_model');

const fetchingApprovedRequest = async (req, res) => {
  try {

    const requestData = await admin_request_data.findOne({ status: 'Approved' });

    if (!requestData) {
      console.log('There are no currently approved requests.');
      return res.status(404).json({ message: 'No approved requests found' });
    }

    const reference_id = requestData.reference_id;

    const fetchUserRequestData = await request_data.findById(reference_id);
    if (!fetchUserRequestData) {
      console.log(`The user who made the request with reference ID ${reference_id} cannot be found in the database.`);
      return res.status(404).json({ message: 'No user found that match to the reference_id' });
    }

    return res.status(200).json({
      message: 'Successfully fetched approved request',
      requestData,
      fetchUserRequestData,
    });
  } catch (error) {
    console.error('Error fetching approved request:', error.message);
    return res.status(500).json({
      message: 'Something went wrong in the backend',
      error: error.message,
    });
  }
};

module.exports = { fetchingApprovedRequest };
