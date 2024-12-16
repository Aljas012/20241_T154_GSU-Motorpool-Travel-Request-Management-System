const { google } = require('googleapis');
require('dotenv').config();
const user_data = require('../../MODELS/user_model')

const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_AUTH_CLIENT_ID,
    process.env.GOOGLE_AUTH_CLIENT_SECRET,
    'http://localhost:8000/user/googleCallback'
);

const getUserInfo = async (accessToken) => {
    try {
        const oauth2 = google.oauth2({ version: 'v2', auth: oauth2Client });
        oauth2Client.setCredentials({ access_token: accessToken });

        const response = await oauth2.userinfo.get();
        return response.data.email; // Return the user's email
    } catch (error) {
        console.error("Error fetching user info:", error);
        throw error;
    }
};



const calendarEvents = async (req, res) => {
    try {
        const userId = req.headers.user_id;
        console.log('Received request for user:', userId);
        
        // Find user and check Google credentials
        const user = await user_data.findById(userId);
        if (!user) {
            console.log('User not found');
            return res.status(404).json({
                error: "User not found"
            });
        }

        console.log('User found:', user.email);
        console.log('Google refresh token exists:', !!user.google_refresh_token);

        // Check if user has Google credentials
        if (!user.google_refresh_token) {
            console.log('No refresh token found');
            return res.status(401).json({
                error: "Google Calendar not connected",
                message: "Please reconnect your Google account"
            });
        }

        // Set up Google OAuth client
        oauth2Client.setCredentials({
            refresh_token: user.google_refresh_token
        });

        // Initialize Google Calendar API
        const calendar = google.calendar({ 
            version: 'v3', 
            auth: oauth2Client 
        });

        console.log('Fetching calendar events...');

        // Fetch calendar events
        const calendarResponse = await calendar.events.list({
            calendarId: 'primary',
            timeMin: (new Date()).toISOString(),
            maxResults: 10,
            singleEvents: true,
            orderBy: 'startTime',
        });

        console.log('Events received:', calendarResponse.data.items.length);

        // Format events
        const events = calendarResponse.data.items.map(event => ({
            id: event.id,
            summary: event.summary || 'Untitled Event',
            description: event.description || '',
            start: event.start.dateTime || event.start.date,
            end: event.end.dateTime || event.end.date,
            location: event.location || ''
        }));

        console.log('Sending formatted events to frontend');
        res.json(events);

    } catch (error) {
        console.error('Calendar API Error:', error);
        
        // Handle specific Google API errors
        if (error.code === 401) {
            // Token expired or invalid
            try {
                // Clear invalid token
                await user_data.findByIdAndUpdate(userId, {
                    $unset: { google_refresh_token: "" }
                });
            } catch (dbError) {
                console.error('Error clearing token:', dbError);
            }
            
            return res.status(401).json({
                error: "Authentication failed",
                message: "Please reconnect your Google account"
            });
        }

        res.status(500).json({
            error: "Failed to fetch calendar events",
            message: error.message,
            details: error.stack
        });
    }
};


module.exports = { calendarEvents };