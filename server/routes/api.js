
const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const passport = require('passport');
const { isNotLoggedIn, isLoggedIn } = require("./middlewares");
const User = require('../models/User');


router.post('/users', async(req, res) => {
  try {
    const { email, password } = req.body;

    //비빌번호 암호화
    const hashedPassword = await bcrypt.hash(password, 10);

    //사용자 생성
    const user = await User.create({
      email,
      password: hashedPassword,
    });

    res.json(user);
  } catch(error) {
    console.log(error);
    res.status(500).json({message: "회원가입에 실패했습니다."})
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