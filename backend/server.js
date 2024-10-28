require("dotenv").config()
const express = require("express");
const adminRoutes = require('./routes/adminRoute');
const userRoutes = require('./routes/userRoute')
const mongoose = require('mongoose');
const app = express(); //express app
require('dotenv').config();



mongoose.connect(process.env.mongodb_url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("MongoDB connection error:", err));



//app.use('/', webRoutes) //landing page routes
app.use('/userLogin', userRoutes) //user login routes
app.use('/adminLogin', adminRoutes) //admin login routes



app.listen(process.env.PORT, () => {
    console.log("Listening on port " + process.env.PORT);
});
