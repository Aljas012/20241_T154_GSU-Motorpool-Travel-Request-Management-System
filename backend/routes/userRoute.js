const express = require('express');
const router = express.Router();
const data = require('./db/db_samples');

router.get('/', (req, res) => {  //user homepage
    res.send(data);
})


router.get('/:user_id', (req, res) => {  //get specific user
    res.send()
})

// Sign In using Office Code
router.post('/userLogin/:office_code', (req, res) => {
    res.json("this is the user login");
});


router.

    module.exports = router