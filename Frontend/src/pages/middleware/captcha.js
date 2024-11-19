import React, { useState } from 'react';
import { Container } from 'react-bootstrap'; // Make sure to import Container from react-bootstrap



  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  // Google reCAPTCHA Site Key (replace this with your actual site key)
  const siteKey = '6LfKIXsqAAAAABQzfWWmEnNZxRj-KOZRpV3XqIny';

  // Callback when reCAPTCHA is successfully verified
  const verifyCallback = (response) => {
    if (response) {
      setIsCaptchaVerified(true);
      setIsVerified(true); // Can be used to enable the submit button or perform other actions
    }
  };

  // Callback if the reCAPTCHA expires or fails
  const expiredCallback = () => {
    setIsCaptchaVerified(false);
  };

  module.exports = Captcha;