const passport = require('passport'); 
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../models/user')

passport.use(
    new GoogleStrategy(
        // configuration object
        {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK  
        }, 
        // verify callback function
        // marking a function as an async function 
        //allows us to consume promises await 
        async function(accessToken, refreshToken, profile, cb){
            // a user has logged in with OAuth
            // the await keyword is followed by a promise 
            // then when that promise is fulfilled, it will then 
            // return whatever the resolved value is.   
            let user = await User.findOne({ googleId: profile.id });
            if (user) return cb(null, user); 
            // We have a new user via OAuth (call this method, if you want to provide  a welome message)
            try {
                user = await User.create({
                    name: profile.displayName,
                    googleId: profile.id, 
                    email: profile.emails[0].value, 
                    avatar: profile.photos[0].value 
                }); 
                return cb(null, user); 
            } catch (err) { 
                // an error occured. 
                return cb(err); 
            }
        }
    ) 
); 

passport.serializeUser(function (user, cb) {
    // return a nugget of info that passport will 
    // give us each time a request is made by 
    //this logged user. 
    cb(null, user._id); 
}); 

// called with every request by a logged in user. 
passport.deserializeUser(async function(userId, cb) {
    // return the user's doc so that passport can assign it to req.user
    const user = await User.findById(userId); 
    cb(null, user); 
});