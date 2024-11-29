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

router.get('/user-accounts',authenticateToken,getAllUsers); //get all users 
router.get('/admin-accounts',getAllAdmin); //get all users 
router.post('/login',login_admin) 
router.post('/signup',create_account)
router.post('/forgot_password_verify',emailVerifier)
router.post('/verify_pin',pinVerifier);
router.patch('/change_password',changePassword);
router.post('/resend_pin',resendPin);
router.post('/pin_timeout',pinTimeout);
router.post('/add_driver',addDriver);
router.get('/get_all_drivers',fetchAllDrivers)
router.delete(`/delete_driver/:_id`,deleteDriver)
router.patch('/update_driver',updateDriver)
router.get('/fetch_pending_request',fetchPendingRequest)
router.post('/fetch_att_information', fetchAttInformation);
router.post('/add_vehicle',addVehicle)
router.get('/get_all_vehicle',fetchAllVehicle)
router.delete('/delete_vehicle',deleteVehicle);
router.get('/fetch_available_drivers',availableDrivers)
router.get('/fetch_available_vehicles',fetchAvailableVehicles);


module.exports = router