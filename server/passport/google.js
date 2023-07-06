const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/user');

module.exports = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: 'http://localhost:3000/api/auth/google/callback',
      },
      async function (accessToken, refreshToken, profile, done) {
        try {
          const user = await User.findOne({ where: { googleId: profile.id } });
          if (user) {
            return done(null, user);
          } else {
            const newUser = await User.create({
              googleId: profile.id,
              email: profile.emails[0].value,
              name: profile.displayName,
            });
            return done(null, newUser);
          }
        } catch (error) {
          console.log(error);
          return done(error);
        }
      },
    ),
  );
};
