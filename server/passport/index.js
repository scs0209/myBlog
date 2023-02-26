const passport = require("passport");
const local = require("./local");
const db = require("../models");

module.exports = () => {
  passport.serializeUser((user, done) => {
    console.log("serializeUser", user);
    // 서버쪽에 [{ id: 1, cookie: 'clhxy' }]
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    db.User.findByPk(id)
    .then(user => done(null, user))
    .catch(err => done(err));
  });

  local();
};
