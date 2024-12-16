const express = require('express')
const router = express.Router();
const authenticateToken = require('../MIDDLEWARES/tokenChecker').userAuthenticateToken;
const {create_account, login_user, createTravelForm, createRequestForm ,changePassword,generatePdf, 
    pinGmailSender,verifyPin, verifyEmailSignup,verifyPinAndCreateUser,signupAsGoogle} = require('../CONTROLLERS/user_controller');
const { verify } = require('crypto');
const {validateAuthCode} = require('../MIDDLEWARES/googleAuthenthicator')
const {countUserRequests} = require('../CONTROLLERS/user controllers/count_request_total')
const {requestToTravelForm} = require('../CONTROLLERS/user controllers/request_to_travel')
const weatherApiRoute =require('../API/weather_api')
const {viewTravelRequest} = require('../CONTROLLERS/user controllers/travel_request_viewer')
const {totalCompletedServices} = require('../CONTROLLERS/user controllers/profile_completed_services')
const {verifyCaptcha} = require('../MIDDLEWARES/captcha_handler')
const {handleGoogleCallback} = require('../CONTROLLERS/user controllers/continue_with_google')
const {calendarEvents} = require('../CONTROLLERS/user controllers/calendar_events')
const {calendarRedirect} = require('../CONTROLLERS/user controllers/calendar_redirect')
const {fetchCalendar} = require('../CONTROLLERS/user controllers/fetch_calendar')
const {redirectCalendar} = require('../CONTROLLERS/user controllers/fetch_calendar')
const {updateProfile} = require('../CONTROLLERS/user controllers/update_profile')
const {checkProfileUpdates} = require('../CONTROLLERS/user controllers/check_profile_updates')
const {saveEvent} = require('../CONTROLLERS/user controllers/save_event')
const {fetchEvents} = require('../CONTROLLERS/user controllers/fetched_events')
const {deleteEvent} = require('../CONTROLLERS/user controllers/delete_event')
const fetchApprovedEvents = require('../CONTROLLERS/user controllers/fetch_approved_events')

router.post('/signup/code_sender',verifyEmailSignup); //MAG SEND UG PIN SA EMAIL
router.post('/signup/verify_pin',verifyPinAndCreateUser)    
router.post('/email_verification',pinGmailSender) //changepassword
router.post('/signup_google', create_account) // route for creating an account (signup)
router.post('/login',login_user) // route for login
router.post('/:id/request_to_travel',authenticateToken, createRequestForm); //route for creating travel request
router.post('/:userId/authority_to_travel/generate_pdf', authenticateToken,generatePdf);
router.patch('/:id/update_profile',authenticateToken,updateProfile);
router.patch('/change_password',changePassword);
router.post('/signup_as_google', signupAsGoogle);
router.post('/save_data',authenticateToken,createTravelForm)
router.get('/googleCallback', handleGoogleCallback);
router.get('/signup_as_google', validateAuthCode);
router.post('/total_request',authenticateToken,countUserRequests)
router.post('/api/weather',authenticateToken,weatherApiRoute)
router.post('/travel_request',authenticateToken,requestToTravelForm)
router.post('/pending_request',authenticateToken,viewTravelRequest)
router.post('/completed_services',authenticateToken,totalCompletedServices)
router.post('/verify_code',verifyPin)
router.post('/verify_captcha',verifyCaptcha)
router.get('/calendar_redirect',calendarRedirect)
router.get('/calendar_events',calendarEvents)
router.get('/fetch_calendar',fetchCalendar)
router.get('/googleCalendar',redirectCalendar)
router.get('/:userId/check_updates', authenticateToken,checkProfileUpdates)
router.post('/save_event',authenticateToken,saveEvent)
router.get('/fetch_events',authenticateToken,fetchEvents)
router.delete('/delete_event',authenticateToken,deleteEvent)
router.post('/fetch_approved_events',authenticateToken,fetchApprovedEvents)
module.exports = router

