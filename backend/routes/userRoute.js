const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {  //user homepage
    res.send('welcome to home user!');
    console.log('welcome to homepage');
});


router.post('/signin', (req, res) => {  //sign in or add user
    // const { email, password } = req.body;
    res.send('User signed up successfully');
    console.log('signup successfully');
});

router.post('/login', (req, res) => { //user login
    res.send('logged user');
    console.log('welcome to login page');
});

router.patch('/profile/updateProfile', (req, res) => { //end point for updating user profile
    res.send('user updated successfully');
    console.log('user updated successfully');
});

module.exports = router;
