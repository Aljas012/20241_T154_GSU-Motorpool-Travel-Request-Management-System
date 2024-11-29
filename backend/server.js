require('dotenv').config();
const express = require('express');
const userRoutes = require('./ROUTES/user_routes');
const adminRoutes = require('./ROUTES/admin_routes');
const sessionConfig = require('./MIDDLEWARES/session');  // Make sure to set the correct path to sessionConfig
const session = require('express-session');
const app = express();  // express app
const mongoose = require('mongoose');
const cors = require('cors');

// Middleware
app.use(express.json());  // To parse JSON request bodies

// Use session middleware
app.use(session(sessionConfig)); 

// Logger middleware (for debugging)
app.use((req, res, next) => {
 
    next();
});


app.use(cors({
    origin: 'http://localhost:5173',  // Allow your frontend origin
    credentials: true  // Allow cookies and credentials to be included in the request
}));

app.use('/user', userRoutes); // User routes
app.use('/admin', adminRoutes); // Admin routes

// Connect to the MongoDB database
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('Connected to the database & listening on port ' + process.env.PORT);
        });
    })
    .catch((err) => {
        console.log(err);
    });
