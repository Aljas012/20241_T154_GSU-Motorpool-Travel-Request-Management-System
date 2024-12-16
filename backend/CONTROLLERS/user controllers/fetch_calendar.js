
const {OAuth2Client} = require('google-auth-library'); 

// Use the correct environment variables
const clientId = process.env.GOOGLE_CLIENT_ID;        // Changed from calendarId
const clientSecret = process.env.GOOGLE_CLIENT_SECRET; // Changed from apiKey
const redirectUrl = process.env.REDIRECT_CALENDAR_URL;

// Initialize OAuth2Client with correct parameters
const oauth2Client = new OAuth2Client(
    clientId,
    clientSecret,
    redirectUrl
);

const fetchCalendar = async (req, res) => {
    try {
        console.log('Generating auth URL with credentials:', {
            clientId: clientId,  // Updated variable name
            redirectUrl: redirectUrl
        });

        const url = oauth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: [
                'https://www.googleapis.com/auth/calendar',
                'https://www.googleapis.com/auth/calendar.events'  // Added events scope
            ],
            prompt: 'consent',
            redirect_uri: redirectUrl,
            include_granted_scopes: true
        });

        console.log('Generated Auth URL:', url);
        res.redirect(url);
    } catch (error) {
        console.error("Error generating auth URL:", error);
        res.status(500).json({ 
            error: "Failed to generate auth URL",
            details: error.message 
        });
    }
};

const redirectCalendar = async (req, res) => {
    try {
        const { code } = req.query;
        console.log('Received auth code:', code);

        const { tokens } = await oauth2Client.getToken(code);
        console.log('Received tokens:', {
            access_token: tokens.access_token ? 'Present' : 'Missing',
            refresh_token: tokens.refresh_token ? 'Present' : 'Missing',
            expiry_date: tokens.expiry_date
        });
        
        // Save the refresh token
        if (tokens.refresh_token) {
            console.log('=== SAVE THIS REFRESH TOKEN TO YOUR .ENV FILE ===');
            console.log('GOOGLE_CALENDAR_REFRESH_TOKEN=' + tokens.refresh_token);
            console.log('===============================================');
        } else {
            console.log('No refresh token received. Try revoking access and authenticating again.');
        }
        
        oauth2Client.setCredentials(tokens);
        
        // Store tokens securely (consider adding to database)
        // You might want to store these tokens in your database associated with the user
        
        res.send(`
            <html>
                <body>
                    <h1>Authentication Successful!</h1>
                    <p>Check your server console for the refresh token.</p>
                    <p>After saving the token to your .env file, restart the server.</p>
                    <script>
                        setTimeout(() => {
                            window.close();
                        }, 5000);
                    </script>
                </body>
            </html>
        `);
    } catch (error) {
        console.error('Error getting tokens:', error);
        res.status(500).json({ 
            error: error.message,
            stack: error.stack
        });
    }
};

module.exports = { fetchCalendar, redirectCalendar };