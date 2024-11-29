const admin_data = require('../../MODELS/admin_model');
const bcrypt = require('bcrypt');

const changePassword = async (req, res) => {
    const { forgotEmail, newPassword } = req.body;

    try {
       
        const found = await admin_data.findOne({ email: forgotEmail });
        if (!found) {
            return res.status(404).json({ message: 'User not found' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);


        found.password = hashedPassword;
        await found.save();

        return res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        console.error('Error updating password:', error);
        return res.status(500).json({ error: 'Something went wrong on the backend!' });
    }
};

module.exports = { changePassword };
