require('dotenv').config()
const express = require('express')
const userRoutes = require('./ROUTES/user_routes');
const adminRoutes = require('./ROUTES/admin_routes');
const app = express() // express app
app.use(express.json())// middleware
const mongoose = require('mongoose')
const cors = require('cors');
//middle ware
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})


// routes
app.use(cors());
app.use('/user', userRoutes); // User routes
app.use('/admin', adminRoutes); // User routes


// connect to db
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('connected to the database & listening on port ' + process.env.PORT)
        })
    })
    .catch((err) => {
        console.log(err)
    })




