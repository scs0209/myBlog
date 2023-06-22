const passport = require("passport");
const { Strategy: LocalStrategy } = require("passport-local");
const bcrypt = require("bcrypt");

module.exports = () => {
  passport.use(
    "change-password",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      async (email, password, done) => {
        try {
          const user = await User.findOne({ where: { email: email } });
          if (!user) {
            return done(null, false, {
              message: "존재하지 않는 이메일입니다.",
            });
          }

          const isMatch = await bcrypt.compare(password, user.password);
          if (!isMatch) {
            return done(null, false, {
              message: "현재 비밀번호가 일치하지 않습니다.",
            });
          }

          const hashedPassword = await bcrypt.hash(req.body.newPassword, 12);
          console.log("hashedPassword", hashedPassword);
          await User.update(
            { password: hashedPassword },
            { where: { id: req.user.id } }
          );

          return done(null, user, {
            message: "비밀번호가 성공적으로 변경되었습니다.",
          });
        } catch (error) {
          console.error(error);
          return done(error);
        }
      }
    )
  );
};
