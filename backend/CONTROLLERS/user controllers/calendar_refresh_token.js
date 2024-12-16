const { google } = require('googleapis');
const { requiredPaths } = require('../../MODELS/att_form_model');
require('dotenv').config();
const user_data  = require("../../MODELS/user_model");
// Initialize OAuth2Client
const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_AUTH_CLIENT_ID,
    process.env.GOOGLE_AUTH_CLIENT_SECRET,
    process.env.REDIRECT_CALENDAR_URL
);

if (process.env.GOOGLE_CALENDAR_REFRESH_TOKEN) {
    oauth2Client.setCredentials({
        refresh_token: user_data.google_refresh_token
    });
}

const refreshTokens = async () => {
    try {
        const { credentials } = await oauth2Client.refreshAccessToken();
        oauth2Client.setCredentials(credentials);
        return credentials;
    } catch (error) {
        console.error('Error refreshing tokens:', error);
        throw error;
    }
};

module.exports = { refreshTokens, oauth2Client }; // Export oauth2Client if needed elsewhere