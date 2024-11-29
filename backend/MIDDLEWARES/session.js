const session = require('express-session');
require('dotenv').config();
const MongoStore = require('connect-mongo');

const sessionConfig = {
  secret: process.env.SESSION_KEY,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false ,   maxAge: 24 * 60 * 60 * 1000} ,
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI, // Use the MongoDB URI from .env
    collectionName: 'sessions', // Optional: Set custom collection name for sessions
}),
};

module.exports = sessionConfig;



