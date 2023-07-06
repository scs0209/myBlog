const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;
const User = require('../models/user');

module.exports = () => {
  passport.use(
    'github',
    new GitHubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: 'http://localhost:3000/api/auth/github/callback',
      },
      async function (accessToken, refreshToken, profile, done) {
        try {
          const user = await User.findOne({ where: { githubId: profile.id } });
          if (user) {
            return done(null, user);
          } else {
            console.log(profile);
            const newUser = await User.create({
              githubId: profile.id,
              email: profile.username,
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
