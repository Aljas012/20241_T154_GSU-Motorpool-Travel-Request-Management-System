const express = require('express')
const router = express.Router();
const authenticateToken = require('../MIDDLEWARES/tokenChecker').adminAuthenticateToken;
const {getAllUsers,getAllAdmin,create_account} = require('../CONTROLLERS/admin_controller');
const {login_admin} = require ('../CONTROLLERS/admin controllers/admin_login')
const {emailVerifier} = require ('../CONTROLLERS/admin controllers/forgot_password_email')
const {pinVerifier} = require ('../CONTROLLERS/admin controllers/pin_verifier')
const {changePassword} = require('../CONTROLLERS/admin controllers/change_password')
const {resendPin} = require('../CONTROLLERS/admin controllers/resend_pin')
const {pinTimeout} = require('../CONTROLLERS/admin controllers/pin_timeout_timer')
const {addDriver} = require('../CONTROLLERS/admin controllers/add_driver')
const {fetchAllDrivers} = require('../CONTROLLERS/admin controllers/fetch_all_drivers')
const {deleteDriver} = require('../CONTROLLERS/admin controllers/delete_driver')
const {updateDriver} = require('../CONTROLLERS/admin controllers/update_driver')
const {fetchPendingRequest} = require('../CONTROLLERS/admin controllers/fetch_pending_request')
const {addVehicle} = require('../CONTROLLERS/admin controllers/add_vehicle')
const {fetchAllVehicle} = require('../CONTROLLERS/admin controllers/fetch_all_vehicles')
const {deleteVehicle} = require('../CONTROLLERS/admin controllers/delete_vehicle')
const {availableDrivers} = require('../CONTROLLERS/admin controllers/fetch_available_driver')
const { fetchAvailableVehicles } = require('../CONTROLLERS/admin controllers/fetch_available_vehicles')
const { fetchAttInformation } = require('../CONTROLLERS/admin controllers/fetch_att_informations');
const  {forwardToGsu} = require ('../CONTROLLERS/admin controllers/forward_admin_request');
const { fetch_onduty_drivers } = require('../CONTROLLERS/admin controllers/fetch_onduty_drivers');
const {generatePostInspectionPdf} = require('../CONTROLLERS/admin controllers/post_inspection_pdf');
const {fetchPendingRequestForApproval} = require('../CONTROLLERS/admin controllers/fetch_pending_for_approval_rtt')
const {fetchApprovedRequest} = require('../CONTROLLERS/admin controllers/fetch_approved_request_data')
const {fetchPendingRtt} = require('../CONTROLLERS/admin controllers/fetch_pending_rtt')
const {fetchDriversTripTicket} = require('../CONTROLLERS/admin controllers/fetch_drivers_trip_ticket')
const {declineRequest} = require('../CONTROLLERS/admin controllers/admin_decline_request')
const {approvedRequestData} = require('../CONTROLLERS/admin controllers/head_approve_admin_request')
const  {fetchingApprovedRequest} = require('../CONTROLLERS/admin controllers/fetch_approved_admin_request')
const {fetchUsersATT} = require ('../CONTROLLERS/admin controllers/fetch_users_approved_att')
const {generatePdf} = require('../CONTROLLERS/admin controllers/download_dtt')
const {fetchAllApprovedEvents} = require('../CONTROLLERS/admin controllers/approved_travel_events')
const {deleteApprovedEvents} = require('../CONTROLLERS/admin controllers/delete_approved_events')
const {createPersonalEvent} = require('../CONTROLLERS/admin controllers/admin_personal_event')
const {fetchPersonalEvent} = require('../CONTROLLERS/admin controllers/fetch_personal_event')
const {countTodaysRequest} = require('../CONTROLLERS/admin controllers/count_todays_request')
const {vehicleTotal} = require('../CONTROLLERS/admin controllers/count_available_vehicle')
const {sendDeclinedEmail} = require('../CONTROLLERS/admin controllers/send_declined_email');
const { authenticate } = require('passport');


router.post('/login',login_admin)  //admin login
router.post('/signup',create_account) //admin signup - only use in thunder client
router.post('/forgot_password_verify',emailVerifier) // verify email
router.post('/verify_pin',pinVerifier); //verify pin
router.patch('/change_password',changePassword); 
router.post('/resend_pin',resendPin); //resend pin (para sa pin verification sa forgot password)
router.post('/pin_timeout',pinTimeout); // 
router.post('/add_driver',authenticateToken,addDriver);
router.get('/get_all_drivers',authenticateToken,fetchAllDrivers)
router.delete(`/delete_driver/:_id`,authenticateToken,deleteDriver)
router.patch('/update_driver',authenticateToken,updateDriver)
router.get('/fetch_pending_request',authenticateToken,fetchPendingRequest)
router.post('/fetch_att_information',authenticateToken, fetchAttInformation);
router.post('/add_vehicle',authenticateToken,addVehicle)
router.get('/get_all_vehicle',authenticateToken,fetchAllVehicle)
router.delete('/delete_vehicle',authenticateToken,deleteVehicle);
router.get('/fetch_available_drivers',authenticateToken,availableDrivers)
router.get('/fetch_available_vehicles',authenticateToken,fetchAvailableVehicles);
router.post('/forward_admin_request',authenticateToken,forwardToGsu);
router.get('/fetch_onduty_drivers',authenticateToken,fetch_onduty_drivers);
router.post('/inspection_list_generate_pdf',authenticateToken,generatePostInspectionPdf);
router.get('/fetch_pending_request_approval',authenticateToken,fetchPendingRequestForApproval) //
router.get('/fetched_approved_request',authenticateToken,fetchApprovedRequest)
router.get(`/fetch_approved_rtt/:requestId`,authenticateToken,fetchPendingRtt) // view approved rtt -admin side
router.get(`/fetch_drivers_trip_ticket/:requestId`,authenticateToken,fetchDriversTripTicket)
router.post('/decline_request',authenticateToken,declineRequest);
router.post('/head_approve_admin_request',authenticateToken,approvedRequestData)
router.get('/fetch_approved_request',authenticateToken,fetchingApprovedRequest)
router.get('/fetch_users_approved_att/:requestId',authenticateToken,fetchUsersATT)
router.post('/generate_dtt',authenticateToken,generatePdf)
router.get('/approved_travel_events',authenticateToken,fetchAllApprovedEvents) //
router.delete('/delete_event',authenticateToken,deleteApprovedEvents) //motorpool delete event
router.patch('/save_event',authenticateToken,createPersonalEvent) // motorpool mag create ug personal na event
router.get('/fetch_personal_event/:adminId',authenticateToken,fetchPersonalEvent) //sa motorpool na calendar
router.get('/todays_total_request',authenticateToken,countTodaysRequest)
router.get('/available_vehicle',authenticateToken,vehicleTotal)
router.post('/decline_email',authenticateToken,sendDeclinedEmail)
module.exports = router