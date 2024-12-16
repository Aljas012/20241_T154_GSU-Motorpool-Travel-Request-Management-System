const {google} = require('googleapis');
require('dotenv').config();
const {OAuth2Client} = require('google-auth-library');
const User = require('../../MODELS/user_model');

// Initialize OAuth2Client
const oauth2Client = new OAuth2Client(
    process.env.CALENDAR_ID,
    process.env.CALENDAR_API_KEY,
    process.env.REDIRECT_CALENDAR_URL
);

const calendarRedirect = async (req, res) => {
    try {
        // Get the authorization code from query parameters
        const { code } = req.query;
        if (!code) {
            throw new Error('No authorization code received');
        }

        // Exchange the code for tokens
        const { tokens } = await oauth2Client.getToken(code);
        console.log('Received tokens:', {
            access_token: tokens.access_token ? 'Present' : 'Missing',
            refresh_token: tokens.refresh_token ? 'Present' : 'Missing'
        });

        // Set the credentials
        oauth2Client.setCredentials(tokens);

        // Get user ID from request (assuming you have authentication middleware)
        const userId = req.user?.id;

        if (userId) {
            // Save the refresh token to the user's record
            await User.findByIdAndUpdate(userId, {
                googleCalendarRefreshToken: tokens.refresh_token
            });
        }

        // Initialize calendar
        const calendar = google.calendar({ version: 'v3', auth: oauth2Client });
        
        // Fetch calendar list
        const response = await calendar.calendarList.list({});
        const calendars = response.data.items;

        // Send success response
        res.send(`
            <html>
                <body>
                    <h1>Calendar Connected Successfully!</h1>
                    <p>You can close this window now.</p>
                    <script>
                        window.opener.postMessage('calendar-connected', '*');
                        setTimeout(() => window.close(), 2000);
                    </script>
                </body>
            </html>
        `);

    } catch (err) {
        console.error('Calendar redirect error:', err);
        res.status(500).send(`
            <html>
                <body>
                    <h1>Error Connecting Calendar</h1>
                    <p>${err.message}</p>
                    <script>
                        setTimeout(() => window.close(), 3000);
                    </script>
                </body>
            </html>
        `);
    }
};

module.exports = { calendarRedirect };