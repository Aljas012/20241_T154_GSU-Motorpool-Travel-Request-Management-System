const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const user_data = require('../MODELS/user_model'); 

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_AUTH_CLIENT_ID,
    clientSecret: process.env.GOOGLE_AUTH_CLIENT_SECRET,
    callbackURL: 'http://localhost:8000/user/home_page'
}, async (accessToken, refreshToken, profile, done) => {

    // Check if user already exists in the database
    const existingUser = await user_data.findOne({ googleId: profile.id });
    if (existingUser) {
        // User already exists
        return done(null, existingUser);
    }
    
    // If not, create a new user
    const newUser = await user_data.create({
        googleId: profile.id,
        name: profile.displayName,
        email: profile.emails[0].value,
    });
    
    done(null, newUser);
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    user_data.findById(id).then((user) => {
        done(null, user);
    });
});

//this api is currently on development