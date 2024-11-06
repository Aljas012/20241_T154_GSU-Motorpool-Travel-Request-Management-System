const express = require('express')
const router = express.Router();
const {getAllUsers,getAllAdmin,login_admin} = require('../CONTROLLERS/admin_controller');


router.get('/user-accounts',getAllUsers); //get all users 
router.get('/admin-accounts',getAllAdmin); //get all users 
router.post('/login',login_admin) //login route
module.exports = router