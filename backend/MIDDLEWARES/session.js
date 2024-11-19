const session = require('express-session');
require('dotenv').config();

const sessionConfig = {
  secret: process.env.SESSION_KEY,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // set to true if using HTTPS
};

module.exports = sessionConfig;



