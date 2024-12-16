const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
    YOUR_CLIENT_ID,
    YOUR_CLIENT_SECRET,
    YOUR_REDIRECT_URL
);

oauth2Client.setCredentials({
    refresh_token: YOUR_REFRESH_TOKEN,
});

const sendVerificationEmail = async (recipientEmail, verificationCode) => {
    const gmail = google.gmail({ version: 'v1', auth: oauth2Client });

    const email = `
        From: "Your Service" <your_email@gmail.com>
        To: ${recipientEmail}
        Subject: Verification Code
        Content-Type: text/plain; charset="UTF-8"
        
        Your verification code is: ${verificationCode}
    `;

    const encodedEmail = Buffer.from(email).toString('base64').replace(/\+/g, '-').replace(/\//g, '_');
    
    try {
        await gmail.users.messages.send({
            userId: 'me',
            requestBody: {
                raw: encodedEmail,
            },
        });
        console.log('Verification email sent successfully.');
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

// Call the function
sendVerificationEmail('user@example.com', '123456');
