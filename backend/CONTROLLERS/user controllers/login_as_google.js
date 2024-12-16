const { OAuth2Client} = require ('google-auth-library')

const loginAsGoogle = async (req,res) =>
{
    try {
        const oauth2Client = new google.auth.OAuth2(
            process.env.GOOGLE_AUTH_CLIENT_ID,
            process.env.GOOGLE_AUTH_CLIENT_SECRET,
            'http://localhost:8000/user/googleCallback'
        );

        const scopes = [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email',
            'https://www.googleapis.com/auth/calendar'
        ];

        const authUrl = oauth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: scopes,
            prompt: 'consent'
        });

        // Send HTML that will handle the redirect and message passing
        res.send(`
            <!DOCTYPE html>
            <html>
            <body>
                <script>
                    window.location.href = "${authUrl}";
                </script>
            </body>
            </html>
        `);

    } catch (error) {
        console.error('Error in login_as_google:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}





module.exports = {loginAsGoogle}