
const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const passport = require('passport');
const path = require('path');
const { isNotLoggedIn, isLoggedIn } = require('./middlewares');
const User = require('../models/user');
const Post = require('../models/post');
const Category = require('../models/category');


router.get("/", (req, res, next) => {
  res.sendFile(path.join(__dirname, "..", "public"));
});

// 카테고리 목록 가져오기
router.get("/categories", async (req, res, next) => {
  try {
    const categories = await Category.findAll();
    res.json(categories);
  } catch (err) {
    next(err);
  }
});


//개시글 가져오기
router.get("/main/posts", async (req, res) => {
  const { page } = req.query;
  const limit = 10; // 한 페이지에 보여줄 게시글 수
  const offset = (page - 1) * limit;

  try {
    const { rows:posts, count} = await Post.findAndCountAll({
      order: [["createdAt", "DESC"]],
      limit,
      offset,
    });
    res.json({
      posts,
      count
    });
    console.log(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "서버 에러가 발생했습니다.",
    });
  }
});

//게시글 상세 조회
router.get('/main/posts/:id', async(req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findOne({ where: { id }});
    if(!post){
      return res.status(404).send('해당 게시글이 존재하지 않습니다.');
    }
    console.log(post);
    res.json(post);
  } catch(error) {
    console.error(error);
    res.status(500).send('서버 에러');
  }
});

// 글 입력
router.post("/posts", async (req, res) => {
  try{
    const post = await Post.create({
      title: req.body.title,
      content: req.body.content, // content 필드에 값을 설정
      UserId: req.body.UserId,
    });
    res.json(post);
  } catch(err) {
    console.error(err);
    res.status(500).send("서버 오류");
  }
});

//주소와 get, post 등 메서드가 있는 것을 라우터라고 부른다.
router.get('/users', (req, res, next) => {
  console.log(req.user);
  return res.json(req.user || false);
});

router.post('/users', isNotLoggedIn, async(req, res, next) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    if(user) {
      return res.status(409).json({
        message: "이미 존재하는 이메일입니다."
      });
    }
    //비빌번호 암호화
    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    //사용자 생성
    await User.create({
      email: req.body.email,
      name: req.body.name,
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

router.post("/login", isNotLoggedIn, (req, res, next) => {
// passport.authenticate => 미들웨어
  passport.authenticate('local', (err, user, info) => {
    console.log(info);
    if(err) {
      console.log(err);
      return next(err);
    }
    if(info) {
      return res.status(401).json(info.reason);
    }
    return req.login(user, async(loginErr) => {
      try{
        if(loginErr) {
          return next(loginErr);
        }
        const fullUser = await User.findOne({
          where: {id: user.id },
          attributes: ['id', 'name', 'email'],
        });
        return res.status(200).json(fullUser);
      } catch(e) {
        console.error(e);
        next(e);
      }
    })
  })(req, res, next);
});

// 로그아웃
router.post("/logout", isLoggedIn, (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.session.destroy();
    res.redirect("/");
  });
});

module.exports = router;