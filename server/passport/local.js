const passport = require("passport");
const { Strategy: LocalStrategy } = require("passport-local");
const bcrypt = require("bcrypt");

const db = require("../models");

module.exports = () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      (email, password, done) => {
        console.log("LocalStrategy", email, password);
        // try {
        //   const user = await db.User.findOne({
        //     where: { email },
        //   });
        //   if (!user) {
        //     return done(null, false, { reason: "존재하지 않는 email 입니다!" });
        //   }
        //   if (!user.validPassword(password)) {
        //     return done(null, false, { reason: "비밀번호가 틀렸습니다." }); 
        //   }
        //   return done(null, user);
        // } catch (error) {
        //   console.error(error);
        //   return done(error);
        // }
      }
    )
  );
};
