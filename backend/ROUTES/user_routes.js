const express = require('express')
const router = express.Router();
const authenticateToken = require('../MIDDLEWARES/tokenChecker').userAuthenticateToken;
const {create_account, login_user, createTravelForm, createRequestForm ,changePassword,generatePdf,updateProfile, 
    pinGmailSender,verifyPin, verifyEmailSignup,verifyPinAndCreateUser,signupAsGoogle, handleGoogleCallback } = require('../CONTROLLERS/user_controller');
const { verify } = require('crypto');
const {validateAuthCode} = require('../MIDDLEWARES/googleAuthenthicator')
const {countUserRequests} = require('../CONTROLLERS/user controllers/count_request_total')
const {requestToTravelForm} = require('../CONTROLLERS/user controllers/request_to_travel')
const weatherApiRoute =require('../API/weather_api')
//const {getIpAddress,currentLocation} = require('../MIDDLEWARES/get_ip_address')


router.post('/signup/code_sender',verifyEmailSignup); //MAG SEND UG PIN SA EMAIL
router.post('/signup/verify_pin',verifyPinAndCreateUser) // for signup
router.post('/email_verification',pinGmailSender)
router.post('/signup_google', create_account) // route for creating an account (signup)
router.post('/login',login_user) // route for login
//router.post('/:id/authority_to_travel',authenticateToken, createTravelForm); //route for creating authority to travel
router.post('/:id/request_to_travel',authenticateToken, createRequestForm); //route for creating travel request
router.post('/:userId/authority_to_travel/generate_pdf', authenticateToken,generatePdf);
router.patch('/:id/update_profile',authenticateToken,updateProfile);
router.patch('/change_password',changePassword);
router.post('/signup_as_google', signupAsGoogle);
router.post('/save_data',createTravelForm)
router.get('/googleCallback', handleGoogleCallback);
router.get('/signup_as_google', validateAuthCode);
router.post('/total_request',countUserRequests)
router.get('/api/weather',weatherApiRoute)
router.post('/api/weather',weatherApiRoute)
router.post('/travel_request',requestToTravelForm)
// router.get('/getLocation', getIpAddress, currentLocation)
module.exports = router

