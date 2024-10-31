const express = require('express')
const router = express.Router();
const { create_user, login_user, createTravelForm, createRequestForm } = require('../CONTROLLERS/user_controller')



router.post('/signup', create_user) //create a data for signup
router.post('/login',login_user) // route for login
router.post('/authority_to_travel', createTravelForm); //route for creating authority to travel
router.post('/request_to_travel', createRequestForm); //route for creating travel request

module.exports = router

