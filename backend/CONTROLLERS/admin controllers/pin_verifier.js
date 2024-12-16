const admin_data = require ('../../MODELS/admin_model')

const pinVerifier = async (req, res) => {
    const { forgotEmail, completePin } = req.body;
    if (!forgotEmail || !completePin) {
        return res.status(400).json({ error: 'Missing required fields: forgotEmail or completePin' });
    }
    try {
        const existingUser = await admin_data.findOne({ email: forgotEmail });
        if (!existingUser) {
            console.error(`User not found for email: ${forgotEmail}`);
            return res.status(401).json({ error: 'User not found - pin verifier' });
        }
        if (completePin === existingUser.temporary_key) {
            console.log(`Verification successful for email: ${forgotEmail}`);
            return res.status(200).json({ message: 'You are successfully verified' });
        }
        return res.status(403).json({ error: 'Inputted PIN does not match' });
    } catch (error) {
        console.error('Error in pinVerifier:', error);
        return res.status(500).json({ error: 'Internal server error - unable to verify PIN' });
    }
};
module.exports = { pinVerifier };