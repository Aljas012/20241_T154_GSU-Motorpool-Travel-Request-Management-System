const signupVerification = (name, pin) => {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Email Verification</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f4f7f6;
    }
    .email-container {
      width: 100%;
      max-width: 600px;
      margin: 30px auto;
      background-color: #ffffff;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
    .email-header {
      text-align: center;
      margin-bottom: 20px;
    }
    .email-header h2 {
      color: #2c8f2e;
      font-size: 24px;
    }
    .email-body {
      font-size: 16px;
      line-height: 1.5;
      color: #333;
    }
    .verification-code {
      display: inline-block;
      font-size: 20px;
      font-weight: bold;
      color: #ffffff;
      background-color: #2c8f2e;
      padding: 10px 20px;
      border-radius: 4px;
      margin-top: 20px;
    }
    .footer {
      text-align: center;
      margin-top: 30px;
      font-size: 12px;
      color: #888;
    }
    .footer a {
      color: #2c8f2e;
      text-decoration: none;
    }
  </style>
  </head>
  <body>
  <div class="email-container">
    <div class="email-header">
      <h2>Welcome to GSU MOTORPOOL</h2>
      <p>Almost there! Please verify your email to complete your registration.</p>
    </div>
    <div class="email-body">
      <p>Dear ${name},</p>
      <p>Thank you for registering with us. To complete your registration, please verify your email address by entering the code below:</p>
      <div class="verification-code">
        ${pin}
      </div>
      <p>If you did not request this, please ignore this message. Your account will remain inactive until you complete the verification process.</p>
    </div>
    <div class="footer">
      <p>Best regards,</p>
      <p>The GSU MOTORPOOL Support Team</p>
      <p><a href="http://localhost:5173">Visit our website</a></p>
    </div>
  </div>
  </body>
  </html>`;
}

const forgotPassword = (changePassword) => {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Forgot Password</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f4f4f4;
        color: #333;
        margin: 0;
        padding: 0;
      }
      .email-container {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        background-color: #ffffff;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }
      h2 {
        color: #333;
      }
      p {
        font-size: 16px;
        line-height: 1.5;
      }
      .pin {
        font-size: 24px;
        font-weight: bold;
        color: #007bff;
        margin: 20px 0;
        padding: 10px;
        background-color: #f0f8ff;
        border-radius: 5px;
        display: inline-block;
      }
      .footer {
        text-align: center;
        font-size: 12px;
        color: #888;
        margin-top: 30px;
      }
      .footer a {
        color: #007bff;
        text-decoration: none;
      }
      .button {
        display: inline-block;
        padding: 10px 20px;
        background-color: #007bff;
        color: white;
        text-decoration: none;
        font-weight: bold;
        border-radius: 5px;
        text-align: center;
        margin-top: 20px;
      }
      .button:hover {
        background-color: #0056b3;
      }
    </style>
  </head>
  <body>
    <div class="email-container">
      <h2>Hello User,</h2>
      <p>We received a request to reset your password. To complete this process, please use the PIN code below to verify your identity:</p>
      <div class="pin">${changePassword}</div>
      <p>If you did not request this, please ignore this email.</p>
      <p>Thank you,<br>GSU Motorpool Support Team</p>
      <div class="footer">
        <p>For any inquiries, <a href="mailto:support@example.com">contact support</a>.</p>
      </div>
    </div>
  </body>
  </html>`;
}


const passwordGeneratorForGoogleSignup = (name,generatedPassword) =>
{return`
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your New Password</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
    }
    .email-container {
      max-width: 650px;
      margin: 0 auto;
      background-color: #ffffff;
      border: 1px solid #e1e1e1;
      border-radius: 8px;
      padding: 30px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
    .header {
      text-align: center;
      margin-bottom: 30px;
    }
    .header h2 {
      color: #003366; /* Dark blue for header */
      font-size: 24px;
      font-weight: bold;
      margin: 0;
    }
    .greeting {
      font-size: 18px;
      color: #333;
      margin: 0 0 20px;
    }
    .password {
      display: block;
      font-weight: bold;
      font-size: 20px;
      color: white; /* Blue color for password */
      background-color: #007bff;
      padding: 10px;
      border-radius: 5px;
      margin: 20px 0;
      text-align: center;
    }
    .instructions {
      font-size: 16px;
      color: red;
      margin-bottom: 30px;
    }
    .footer {
      font-size: 14px;
      color: #888;
      text-align: center;
      border-top: 1px solid #e1e1e1;
      padding-top: 20px;
      margin-top: 30px;
    }
    .footer a {
      color: #007bff; /* Blue color for links */
      text-decoration: none;
    }
    .footer p {
      margin: 5px 0;
    }
    hr {
      border: 0;
      border-top: 1px solid #e1e1e1;
      margin-top: 30px;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">
      <h2>Your New Password for GSU MOTORPOOL</h2>
    </div>
    <div class="greeting">
      <p>Dear ${name},</p>
      <p>We have generated a new password for your account. You can use this password to log in to <strong>GSU MOTORPOOL</strong>.</p>
    </div>
    <div class="password">
      <p>Your New Password: <code>${generatedPassword}</code></p>
    </div>
    <div class="instructions">
      <p><strong>Important Note:</strong> For your security, we recommend changing your password after logging in for the first time. You can do so by going to the "Account Settings" section and selecting "Change Password."</p>
      <p>If you did not request this change or have concerns about your account’s security, please contact our support team immediately at <a href="mailto:support@example.com">support@example.com</a> or call [Support Phone Number].</p>
    </div>
    <div class="footer">
      <p>Thank you,<br><a href = "http://localhost:5173">The GSU MOTORPOOL Team</a></p>
      <hr>
      <p>This email contains confidential information intended only for the individual named above. If you are not the intended recipient, please notify us and delete this message.</p>
    </div>
  </div>
</body>
</html>
`
}


const adminPinEmailTemplate = (verificationCode) =>
  { return `
 <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password Verification</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      margin: 0;
      padding: 0;
      background-color: #f4f4f4;
    }
    .container {
      max-width: 600px;
      margin: 20px auto;
      padding: 30px;
      border: 1px solid #ddd;
      border-radius: 8px;
      background-color: #fff;
    }
    .header {
      text-align: center;
      margin-bottom: 20px;
    }
    .header h2 {
      font-size: 24px;
      color: #007BFF; /* Blue color for header */
    }
    .code {
      font-size: 28px;
      font-weight: bold;
      color: #007BFF; /* Blue color for the code */
      text-align: center;
      margin: 20px 0;
      padding: 10px;
      border: 2px solid #007BFF;
      border-radius: 5px;
      background-color: #e8f4fd; /* Light blue background for code */
    }
    p {
      font-size: 16px;
      color: #555;
    }
    .footer {
      font-size: 12px;
      color: #888;
      text-align: center;
      margin-top: 20px;
    }
    a {
      color: #007BFF; /* Blue color for links */
      text-decoration: none;
    }
    .footer a {
      color: #007BFF;
      font-weight: bold;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>Password Reset Verification</h2>
    </div>
    <p>Hello Admin,</p>
    <p>We received a request to reset your password. To verify your identity, please use the 6-digit code below:</p>
    <div class="code">${verificationCode}</div>
    <p>This code will expire in <strong>2 minutes</strong>. Please enter it on the password reset page to proceed.</p>
    <p>If you didn’t request this code, please ignore this email or contact our support team immediately for assistance.</p>
    <p>Thank you,<br><strong>GSU Motorpool Support Team</strong></p>
    <div class="footer">
      <p>Need help? Contact us at <a href="mailto:gsumotorpools@gmail.com">GSU Motorpool</a></p>
    </div>
  </div>
</body>
</html>
    `
}

const approvedAdminRTT = (requestor_name,request_date,departure_time,passenger_names) =>
{ return `
  <!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Request Approved</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f9f9f9;
            margin: 0;
            padding: 0;
        }
        .email-container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border: 1px solid #dddddd;
            border-radius: 8px;
            overflow: hidden;
        }
        .header {
            background-color: #6EC207;
            color: #ffffff;
            text-align: center;
            padding: 20px;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
        }
        .content {
            padding: 20px;
            color: #333333;
            line-height: 1.6;
        }
        .content p {
            margin: 0 0 20px;
        }
        .footer {
            background-color: #f1f1f1;
            text-align: center;
            padding: 10px;
            font-size: 12px;
            color: #666666;
        }
        .footer a {
            color: #ffa500;
            text-decoration: none;
        }
        .button {
            display: inline-block;
            padding: 10px 20px;
            color: #ffffff;
            background-color: #ffa500;
            text-decoration: none;
            border-radius: 5px;
            font-size: 16px;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <h1>Request Approved</h1>
        </div>
        <div class="content">
            <p>Dear ${requestor_name},</p>
            <p>We are pleased to inform you that your request to travel has been approved. Here are the details of your request:</p>
            <ul>
                <li><strong>Date:</strong> ${request_date}</li>
                <li><strong>Time:</strong> ${departure_time}</li>
                <li><strong>Details:</strong> ${passenger_names}</li>
            </ul>
            <p>Please ensure to follow the instructions provided and be on time for the scheduled date.</p>
            <p>If you have any questions or need further assistance, feel free to contact us.</p>
            <p><a href="mailto:gsumotorpools@gmail.com"> Contact Support</a></p>
        </div>
        <div class="footer">
            <p>Thank you for using our services!</p>
            <p>&copy; 2024 GSU MOTORPOOL. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
`
}

const declinedAdminRTT = (requestor_name, request_date, departure_time, passenger_names) => 
  { 
    return `
    <!DOCTYPE html>
  <html>
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Request Declined</title>
      <style>
          body {
              font-family: Arial, sans-serif;
              background-color: #f9f9f9;
              margin: 0;
              padding: 0;
          }
          .email-container {
              max-width: 600px;
              margin: 20px auto;
              background-color: #ffffff;
              border: 1px solid #dddddd;
              border-radius: 8px;
              overflow: hidden;
          }
          .header {
              background-color: #FF0000;
              color: #ffffff;
              text-align: center;
              padding: 20px;
          }
          .header h1 {
              margin: 0;
              font-size: 24px;
          }
          .content {
              padding: 20px;
              color: #333333;
              line-height: 1.6;
          }
          .content p {
              margin: 0 0 20px;
          }
          .footer {
              background-color: #f1f1f1;
              text-align: center;
              padding: 10px;
              font-size: 12px;
              color: #666666;
          }
          .footer a {
              color: #ffa500;
              text-decoration: none;
          }
          .button {
              display: inline-block;
              padding: 10px 20px;
              color: #ffffff;
              background-color: #ffa500;
              text-decoration: none;
              border-radius: 5px;
              font-size: 16px;
          }
      </style>
  </head>
  <body>
      <div class="email-container">
          <div class="header">
              <h1>Request Declined</h1>
          </div>
          <div class="content">
              <p>Dear ${requestor_name},</p>
              <p>We regret to inform you that your request to travel has been declined. Below are the details of your request:</p>
              <ul>
                  <li><strong>Date:</strong> ${request_date}</li>
                  <li><strong>Time:</strong> ${departure_time}</li>
                  <li><strong>Details:</strong> ${passenger_names}</li>
              </ul>
              <p>We understand this may be disappointing, and we apologize for any inconvenience caused. If you have any questions or need clarification, feel free to contact us.</p>
              <p><a href="mailto:gsumotorpools@gmail.com">Contact Support</a></p>
          </div>
          <div class="footer">
              <p>Thank you for your understanding.</p>
              <p>&copy; 2024 GSU MOTORPOOL. All rights reserved.</p>
          </div>
      </div>
  </body>
  </html>
  `;
  }
  

module.exports = { signupVerification, forgotPassword,passwordGeneratorForGoogleSignup,adminPinEmailTemplate,approvedAdminRTT,declinedAdminRTT };
