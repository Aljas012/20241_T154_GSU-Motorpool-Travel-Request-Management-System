const captchaKey = '6LeNWpMqAAAAAPmsT8MYDeymsEbmN_VIdqsk2SNB';

const verifyCaptcha = async (req, res) => {
    console.log('captcha backend reached')
    try {
        const { token } = req.body;

        if (!token) {
            return res.status(400).json({ message: 'Captcha token is required' });
        }

        const response = await fetch(
            'https://www.google.com/recaptcha/api/siteverify',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `secret=${captchaKey}&response=${token}`
            }
        );

        const data = await response.json();
        console.log('reCAPTCHA API Response:', data);
        if (!data.success) {
            console.log('fetch response from Google reCAPTCHA is unsuccessful');
            return res.status(400).json({ 
                message: 'Invalid captcha',
                errors: data['error-codes'],  
            });
        }
        console.log('successful capctha')
        return res.status(200).json({ message: 'Captcha verified successfully' });
        
    } catch(error) {
        console.error('reCAPTCHA verification error:', error);
        return res.status(500).json({message: 'Something went wrong in the backend'});
    }
};

module.exports = { verifyCaptcha };