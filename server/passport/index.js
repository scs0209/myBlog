const passport = require('passport');
const local = require('./local');
const google = require('./google');
const github = require('./github');
const User = require('../models/user');

module.exports = () => {
  passport.serializeUser((user, done) => {
    // 서버쪽에 [{ id: 1, cookie: 'clhxy' }]
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findOne({
        where: { id },
        attributes: ['id', 'email', 'role', 'name'],
      });
      done(null, user); //req.user
    } catch (error) {
      console.log(error);
      done(error);
    }
  });

  local();
  google();
  github();
};
