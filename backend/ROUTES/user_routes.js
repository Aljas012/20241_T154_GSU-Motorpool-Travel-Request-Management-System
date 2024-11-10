const express = require('express')
const router = express.Router();
const jwt = require('jsonwebtoken');
const authenticateToken = require('../MIDDLEWARES/tokenChecker').authenticateToken;
const {weatherAPI ,create_account, login_user, createTravelForm, createRequestForm ,changePassword,generatePdf,updateProfile} = require('../CONTROLLERS/user_controller')

router.post('/signup', create_account) // route for creating an account (signup)
router.post('/login',login_user) // route for login
router.post('/:id/authority_to_travel',authenticateToken, createTravelForm); //route for creating authority to travel
router.post('/:id/request_to_travel',authenticateToken, createRequestForm); //route for creating travel request
router.post('/:userId/authority_to_travel/generate_pdf', authenticateToken, generatePdf);
router.patch('/:id/update_profile',authenticateToken,updateProfile);
router.patch('/:id/change_password',authenticateToken,changePassword);
router.get('/api/weather',weatherAPI)
module.exports = router

