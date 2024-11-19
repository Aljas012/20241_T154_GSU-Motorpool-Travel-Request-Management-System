const express = require('express')
const router = express.Router();
const authenticateToken = require('../MIDDLEWARES/tokenChecker').adminAuthenticateToken;
const {getAllUsers,getAllAdmin,login_admin,create_account} = require('../CONTROLLERS/admin_controller');


router.get('/user-accounts',authenticateToken,getAllUsers); //get all users 
router.get('/admin-accounts',getAllAdmin); //get all users 
router.post('/login',login_admin) //login route
router.post('/signup',create_account)
module.exports = router