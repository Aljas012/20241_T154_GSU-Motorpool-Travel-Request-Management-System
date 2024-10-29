const express = require('express');
const router = express.Router();

router.get('/home', (req, res) => {
    res.send('welcome to home admin!');
});

router.post('/signin', (req, res) => {
    res.send('welcome to signup');
});

router.get('/profile', (req, res) => {
    res.send('welcome to profile');
})

router.patch('/profile/updateProfile', (req, res) => { //update profile
    res.send('profile updated');
})

module.exports = router;
