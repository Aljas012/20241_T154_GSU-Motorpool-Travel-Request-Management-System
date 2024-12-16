// import fetch from 'node-fetch';

// const verifyCaptcha = async (req, res) => {
//   const { recaptchaToken } = req.body;

//   try {
//     const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
//       body: `secret=YOUR_SECRET_KEY&response=${recaptchaToken}`,
//     });

//     const data = await response.json();
//     if (data.success) {
//       res.json({ success: true });
//     } else {
//       res.status(400).json({ success: false, error: 'CAPTCHA verification failed' });
//     }
//   } catch (error) {
//     console.error('Error verifying CAPTCHA:', error);
//     res.status(500).json({ success: false, error: 'Server error' });
//   }
// };

// export { verifyCaptcha };
