
const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const passport = require('passport');
const { isNotLoggedIn, isLoggedIn } = require("./middlewares");
const User = require('../models/User');


router.post('/users', async(req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: {email} });
    if(user) {
      return res.status(409).json({
        message: "이미 존재하는 이메일입니다."
      });
    }
    //비빌번호 암호화
    const hashedPassword = await bcrypt.hash(password, 10);
    //사용자 생성
    await User.create({
      email,
      password: hashedPassword,
    });
    return res.status(201).json({
      message: "회원가입이 완료되었습니다."
    });
  } catch(error) {
    console.log(error);
    return next(error);
  }
})

router.get('/users/login', (req, res) => {
  return res.json(req.user || false);
});

router.post("/users/login", 
// passport.authenticate => 미들웨어
  passport.authenticate('local', {
    successRedirect: '/welcome',//로그인에 성공했다면
    failureRedirect: '/users/login', //로그인에 실패했다면?
    failureFlash: false
  })
);

module.exports = router;