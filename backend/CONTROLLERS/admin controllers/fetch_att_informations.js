const request_data = require('../../MODELS/request_form_model');

const fetchAttInformation = async (req, res) => {

    const { reference } = req.body;

    try {
        // Find the document by _id
        const attInfo = await request_data.findById(reference);

    

        console.log('Sending successful response');
        res.status(200).json({
            success: true,
            data: attInfo
        });
        
    } catch(error) {
        console.error('Error in fetchAttInformation:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

module.exports = { fetchAttInformation };