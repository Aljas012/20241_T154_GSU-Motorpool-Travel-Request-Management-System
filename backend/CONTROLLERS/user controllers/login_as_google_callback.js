const {getUserData} = require('../MIDDLEWARES/fetch_userdata_signup')
const {OAuth2Client} = require('google-auth-library')
const user_data = require('../MODELS/user_model')

const loginAsGoogleCallback = async (req, res) => {
    const code = req.query.code;
    
    const redirectUrl = 'http://localhost:8000/user/googleCallback';
    const oAuth2Client = new OAuth2Client(
        process.env.GOOGLE_AUTH_CLIENT_ID,
        process.env.GOOGLE_AUTH_CLIENT_SECRET,
        redirectUrl
    );
      
    try {
        // Get tokens from Google with calendar scope
        const response = await oAuth2Client.getToken(code);
        const { tokens } = response;
        oAuth2Client.setCredentials(tokens);
  
        const userData = await getUserData(tokens.access_token);
        const { id, email, name } = userData;

        // Find or create user
        let user = await user_data.findOne({ google_id: id });
        
        if (!user) { 
            return res.redirect(`http://localhost:5173/user/signup_google`);
        }

        // Update user with tokens and calendar access
        await user_data.findOneAndUpdate(
            { google_id: id },
            { 
                $set: { 
                    google_refresh_token: tokens.refresh_token,
                    google_access_token: tokens.access_token,
                    calendar_connected: true,
                    last_token_refresh: new Date()
                }
            },
            { new: true }
        );

        // Redirect to home page
        res.redirect(`http://localhost:5173/user/home`);

    } catch(error) {
        console.error('Error during Google login callback:', error);
        res.status(500).json({ error: 'Failed to process Google login' });
    }
}

// Update the OAuth2Client initialization to include calendar scope
const getGoogleAuthURL = () => {
    const oAuth2Client = new OAuth2Client(
        process.env.GOOGLE_AUTH_CLIENT_ID,
        process.env.GOOGLE_AUTH_CLIENT_SECRET,
        'http://localhost:8000/user/googleCallback'
    );

    return oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email',
            'https://www.googleapis.com/auth/calendar.readonly'
        ],
        prompt: 'consent'  // Force consent screen to get refresh token
    });
};

module.exports = { loginAsGoogleCallback, getGoogleAuthURL }