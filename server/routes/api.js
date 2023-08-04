const dotenv = require('dotenv');
dotenv.config();
const { Op } = require('sequelize');
const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const passport = require('passport');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const multerGoogleStorage = require('multer-google-storage');

const { isNotLoggedIn, isLoggedIn } = require('./middlewares');
const transporter = require('../config/emailConfig');
const User = require('../models/user');
const Post = require('../models/post');
const Category = require('../models/category');
const Comment = require('../models/comment');
const Like = require('../models/like');
const Replies = require('../models/reply');
const Visitor = require('../models/visitor');

// 인기 있는 라우트 처리 및 방문자 수 늘리기
router.get('/visitors', async (req, res) => {
  const today = new Date().toISOString().slice(0, 10);

  try {
    const visitor = await Visitor.findOne({ where: { date: today } });

    if (!visitor) {
      await Visitor.create({ date: today });
      res.cookie('visited', true, { maxAge: 24 * 60 * 60 * 1000 }); // 쿠키 만료 기간을 하루로 설정
    } else {
      if (!req.cookies.visited) {
        visitor.count += 1;
        await visitor.save();
        res.cookie('visited', true, { maxAge: 24 * 60 * 60 * 1000 }); // 쿠키 만료 기간을 하루로 설정
      }
    }
    res.json(visitor.count);
  } catch (err) {
    res.status(500).json({ message: '서버 오류' });
  }
});

// 총 방문자 수 가져오기
router.get('/total-visitors', async (req, res) => {
  try {
    const totalVisitors = await Visitor.sum('count');
    res.json({ totalVisitors });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '방문자 수를 가져오는 도중에 에러가 발생했습니다.' });
  }
});

// 카테고리 목록 가져오기
router.get('/categories', async (req, res, next) => {
  try {
    const categories = await Category.findAll();
    res.json(categories);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: '서버 오류' });
    next(err);
  }
});

//카테고리 목록 추가하기
router.post('/categories', isLoggedIn, async (req, res, next) => {
  const { name } = req.body;
  try {
    const newCategory = await Category.create({ name });
    res.json(newCategory);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '서버 오류' });
    next(err);
  }
});

// 카테고리 삭제
router.delete('/categories/:id', isLoggedIn, async (req, res) => {
  try {
    const { id } = req.params;
    await Post.destroy({
      where: {
        categoryId: id,
      },
    });
    await Category.destroy({
      where: {
        id,
      },
    });
    console.log(`카테고리 ${id}와 연결된 포스트 삭제 완료`);
    res.json({ message: '삭제가 완료되었습니다!' });
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
});

// 카테고리 수정
router.put('/categories/:id', isLoggedIn, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, hidden } = req.body;

    const updatedCategory = await Category.update(
      {
        name,
        hidden,
      },
      {
        where: {
          id,
        },
        returning: true,
      },
    );
    res.json(updatedCategory);
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
});

//카테고리 상세 조회
router.get('/categories/:categoryId', async (req, res) => {
  const { categoryId } = req.params;

  try {
    const category = await Category.findByPk(categoryId);

    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    res.json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// 특정 카테고리에 해당하는 게시글 목록을 가져오는 API
router.get('/categories/:categoryId/posts', async (req, res, next) => {
  const { categoryId } = req.params; //categoryId를 가져온다.
  const { page } = req.query;
  const limit = 10;
  const offset = (page - 1) * limit;

  try {
    const { rows: posts, count } = await Post.findAndCountAll({
      where: {
        categoryId, // categoryId가 일치하는 게시글을 조회한다.
      },
      include: [
        {
          model: Category,
          where: {
            hidden: false, // 숨겨진 카테고리는 조회되지 않도록 조건 추가
          },
          as: 'category',
        },
      ],
      offset,
      limit,
      order: [['createdAt', 'DESC']],
    });
    console.log(posts.length);
    res.json({ posts, count }); // 조회 결과를 JSON 형태로 반환한다.
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '서버 오류' });
    next(error);
  }
});

//댓글 조회하기
router.get('/posts/:postId/comments', async (req, res) => {
  try {
    const postId = req.params.postId;
    const comments = await Comment.findAll({
      where: { PostId: postId },
      include: [
        {
          model: User,
          attributes: ['id', 'name'],
        },
        {
          model: Replies,
          include: {
            model: User,
            attributes: ['id', 'name'],
          },
          order: [['createdAt', 'ASC']],
        },
      ],
      order: [['createdAt', 'ASC']],
    });
    res.json(comments);
  } catch (err) {
    console.error(err);
    res.status(500).send('서버 오류');
  }
});

//댓글 작성하기
router.post('/posts/:postId/comments', isLoggedIn, async (req, res) => {
  try {
    const comment = await Comment.create({
      content: req.body.content,
      PostId: req.body.postId,
      UserId: req.user.id,
    });
    // fullComment는 작성 후애 작성자의 정보까지 함께 보내주기 위해 사용
    // User의 id와 name을 가져와 함께 보내주면 클라이언트 측에서 댓글을 작성한 사용자의 정보를 확인할 수 있다. 또한 attributes를 통해 불필요한 정보는 빼고 필요한 컬럼 정보만 가져올 수 있다.
    const fullComment = await Comment.findOne({
      where: { id: comment.id },
      include: {
        model: User,
        attributes: ['id', 'name'],
      },
    });
    res.status(201).json(fullComment);
  } catch (err) {
    console.error(err);
    res.status(500).send('서버 오류');
  }
});

//댓글 수정하기
router.put('/posts/comments/:commentId', isLoggedIn, async (req, res) => {
  try {
    const commentId = req.params.commentId;
    const comment = await Comment.findOne({ where: { id: commentId } });
    if (comment.UserId !== req.user.id) {
      //댓글 작성자와 로그인한 유저의 id가 일치하지 않으면 에러메세지와 함께 Forbidden 상태 코드를 응답
      return res.status(403).send('댓글 작성자가 아니므로 수정할 수 없습니다.');
    }
    const editedComment = await Comment.update(
      { content: req.body.content },
      {
        where: { id: commentId, UserId: req.user.id },
      },
    );
    res.status(200).json(editedComment);
    console.log(editedComment);
  } catch (err) {
    console.error(err);
    res.status(500).send('서버 오류');
  }
});

//댓글 삭제하기
router.delete('/posts/comments/:commentId', isLoggedIn, async (req, res) => {
  try {
    const commentId = req.params.commentId;
    const deletedComment = await Comment.destroy({
      where: { id: commentId, UserId: req.user.id },
    });
    if (!deletedComment) {
      return res.status(403).send('댓글 작성자만 댓글을 삭제할 수 있습니다');
    }
    res.status(204).json(deletedComment);
  } catch (err) {
    console.error(err);
    res.status(500).send('서버 오류');
  }
});

// 답글 조회
router.get('/posts/:postId/replies', async (req, res) => {
  try {
    const comments = await Comment.findAll({
      where: { PostId: req.params.postId },
      include: [
        {
          model: Replies,
          include: {
            model: User,
            attributes: ['id', 'name'],
          },
          order: [['createdAt', 'ASC']],
        },
      ],
    });

    const replies = comments.reduce((acc, comment) => {
      return acc.concat(comment.Replies);
    }, []);

    res.status(200).json(replies);
  } catch (err) {
    console.error(err);
    res.status(500).send('서버 오류');
  }
});

// 답글 작성하기
router.post('/posts/comments/:commentId/replies', isLoggedIn, async (req, res) => {
  try {
    const reply = await Replies.create({
      content: req.body.content,
      CommentId: req.params.commentId,
      UserId: req.user.id,
    });

    const fullReply = await Replies.findOne({
      where: { id: reply.id },
      include: {
        model: User,
        attributes: ['id', 'name'],
      },
    });
    res.status(201).json(fullReply);
  } catch (err) {
    console.error(err);
    res.status(500).send('서버 오류');
  }
});

//답글 수정하기
router.put('/posts/comments/:commentId/replies/:replyId', isLoggedIn, async (req, res, next) => {
  try {
    const { commentId, replyId } = req.params;
    const reply = await Replies.findOne({
      where: { id: replyId },
      include: [
        { model: User, attributes: ['id', 'name', 'email'] },
        {
          model: Comment,
          where: { id: commentId },
          include: [{ model: User, attributes: ['id', 'name', 'email'] }],
        },
      ],
    });
    if (!reply) {
      return res.status(404).send('해당하는 답글을 찾을 수 없습니다.');
    }

    if (reply.UserId !== req.user.id) {
      return res.status(403).send('수정 권한이 없습니다.');
    }

    reply.content = req.body.content;
    await reply.save();

    res.status(200).json(reply);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// 답글 삭제하기
router.delete('/posts/comments/:commentId/replies/:replyId', isLoggedIn, async (req, res, next) => {
  try {
    const { commentId, replyId } = req.params;

    const reply = await Replies.findOne({
      where: { id: replyId, CommentId: commentId },
      include: [{ model: User, attributes: ['id', 'name', 'email'] }],
    });

    if (!reply) {
      return res.status(404).send('해당하는 답글을 찾을 수 없습니다.');
    }

    if (reply.UserId !== req.user.id) {
      return res.status(403).send('삭제 권한이 없습니다.');
    }

    await reply.destroy();

    res.status(200).send('삭제되었습니다.');
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// 게시글 가져오기
router.get('/main/posts', async (req, res) => {
  const { page, search } = req.query;
  const limit = 10; // 한 페이지에 보여줄 게시글 수
  const offset = (page - 1) * limit;

  try {
    // 숨겨진 카테고리를 가져옵니다.
    const hiddenCategories = await Category.findAll({
      where: {
        hidden: true,
      },
    });

    // 숨겨진 카테고리 ID를 배열로 가져옵니다.
    const hiddenCategoryIds = hiddenCategories.map((category) => category.id);

    // 검색 조건을 설정합니다.
    const where = {
      ...((search && { title: { [Op.like]: `%${search}%` } }) || {}),
      // 숨겨진 카테고리에 속한 게시글을 제외합니다.
      CategoryId: { [Op.notIn]: hiddenCategoryIds },
    };

    const { rows: posts, count } = await Post.findAndCountAll({
      where,
      order: [['createdAt', 'DESC']],
      limit,
      offset,
    });
    res.json({
      posts,
      count,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: '서버 에러가 발생했습니다.',
    });
  }
});

// 인기 글 가져오기
router.get('/main/popular_posts', async (req, res) => {
  const { limit } = req.query;
  const parsedLimit = parseInt(limit) || 5; // 한 번에 가져올 인기 게시물 수 (기본값: 5)

  try {
    const popular_posts = await Post.findAll({
      order: [['views', 'DESC']],
      limit: parsedLimit,
    });
    res.json({
      popular_posts,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: '서버 에러가 발생했습니다.',
    });
  }
});

//게시글 상세 조회
router.get('/main/posts/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findOne({ where: { id } });
    if (!post) {
      return res.status(404).send('해당 게시글이 존재하지 않습니다.');
    }
    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).send('서버 에러');
  }
});

try {
  fs.readdirSync('uploads');
} catch (error) {
  console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
  fs.mkdirSync('uploads');
}
const upload = multer({
  storage: multerGoogleStorage.storageEngine({
    bucket: process.env.GCLOUD_STORAGE_BUCKET,
    projectId: process.env.GCLOUD_STORAGE_NAME,
    keyFilename: process.env.GCLOUD_STORAGE_KEYFILE,
    filename: (req, file, cb) => {
      cb(null, `original/${Date.now()}_${file.originalname}`);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});
// 이미지 올리기
router.post('/upload', upload.single('image'), (req, res) => {
  const { file } = req;
  if (!file) {
    return res.status(400).send('이미지를 업로드해주세요.');
  }
  res.json({ url: req.file.path });
});

// 글 작성
router.post('/main/posts', isLoggedIn, async (req, res) => {
  const { title, content, categoryId, UserId } = req.body;
  try {
    const post = await Post.create({
      title,
      content,
      categoryId,
      UserId,
    });
    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(500).send('서버 오류');
  }
});

//글 수정
router.put('/main/posts/:id', isLoggedIn, async (req, res) => {
  // 라우팅 경로에서 :id를 지정했기 때문에 req.params 객체에 id 프로퍼티가 들어가게 된다. 따라서 req.params.id와 req.params는 모두 id값을 가져올 수 있다. req.params 객체에는 라우팅 경로에서 지정한 다른 매개변수들도 포함된다. 여기서 req.params.id를 사용하면 서버에러가 난다.
  const { id } = req.params;
  const { title, content } = req.body;
  try {
    const post = await Post.findOne({ where: { id } });
    if (!post) {
      res.status(404).send('해당 게시글이 없습니다.');
    } else if (post.UserId !== req.user.id) {
      res.status(403).send('게시글 작성자만 게시글을 수정할 수 있습니다.');
    } else {
      await post.update({ title, content });
      res.status(200).json(post);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('서버 에러');
  }
});

//글 삭제
router.delete('/main/posts/:id', isLoggedIn, async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findByPk(id);
    if (!post) {
      return res.status(404).send({
        error: '게시글이 존재하지 않습니다.',
      });
    }
    if (post.UserId !== req.user.id) {
      //해당 게시글의 작성자와 현재 로그인한 사용자가 다르면 삭제하지 못하도록 에러 처리한다.
      return res.status(403).send({
        error: '작성자만 삭제할 수 있습니다.',
      });
    }

    // 댓글 삭제
    const comments = await Comment.findAll({
      where: { PostId: id },
      include: {
        model: Replies,
      },
    });

    // 댓글에 연결된 대댓글 삭제
    for (const comment of comments) {
      //해당 게시글에 연결된 모든 댓글을 가져온다.
      for (const reply of comment.Replies) {
        //가져온 댓글들 각각의 Replies(대댓글)을 순회하면 대댓글을 삭제한다.
        await reply.destroy();
      }
    }

    await Comment.destroy({
      where: { PostId: id },
    });

    await post.destroy();
    res.status(204).send({ message: '삭제 완료' });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      error: '서버 에러',
    });
  }
});

//게시글 조회수 증가 API
router.post(`/main/posts/:id/views`, async (req, res) => {
  const postId = req.params.id;
  const post = await Post.findOne({
    where: { id: postId },
  });

  if (post) {
    //조회수를 증가시키기 위한 쿠키 값 이름과 쿠키에 담길 게시글 id의 이름 설정
    const viewedPostsName = 'viewedPosts';
    const postIdName = `post_${postId}`;

    //쿠키에 담긴 값을 읽어옴
    const viewedPosts = req.cookies[viewedPostsName] || {};

    //이미 조회수를 증가시킨 게시글인 경우
    if (viewedPosts[postIdName]) {
      console.log('already viewed');
      return res.status(200).send({ message: '조회수를 증가시킨 게시글입니다.' });
    }
    //조회수를 증가시키고 쿠키에 게시글 id를 추가함
    //postId 쿠키가 있는지 확인하고 없으면 조회수 증가
    post.views++;
    await post.save(); // DB에 변경된 정보 반영
    viewedPosts[postIdName] = true;
    res.cookie(viewedPostsName, viewedPosts, { maxAge: 3600 * 1000 }); // 1시간 동안 쿠키 보관
    console.log('viewedPosts[postIdName]', viewedPosts[postIdName]);
    return res.status(200).send({ message: '조회수 증가 성공', post: { views: post.views } });
  } else {
    res.status(404).send({ message: '게시글을 찾을 수 없습니다.' });
  }
});

//좋아요 갯수 조회
router.get('/posts/:postId/like-info', async (req, res, next) => {
  const { postId } = req.params;

  try {
    const post = await Post.findOne({ where: { id: postId } });
    if (!post) {
      return res.status(404).json({ message: '게시물을 찾을 수 없습니다.' });
    }

    //좋아요 수
    const likeCount = await Like.count({ where: { PostId: postId } });
    console.log('likeCount', likeCount);
    //현재 사용자가 해당 게시물에 좋아요를 눌렀는지 여부
    const currentUser = req.user;
    let liked = false;
    if (currentUser) {
      const userLike = await Like.findOne({
        where: { PostId: postId, UserId: currentUser.id },
      });
      liked = Boolean(userLike);
    }

    res.status(200).json({ likeCount, liked });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

//좋아요 생성
router.post('/posts/:postId/like', isLoggedIn, async (req, res, next) => {
  try {
    const postId = parseInt(req.params.postId, 10);
    const { id: userId } = req.user;

    //이미 좋아요를 눌렀는지 검사
    const exLike = await Like.findOne({
      where: {
        PostId: postId,
        UserId: userId,
      },
    });

    if (exLike) {
      //이미 좋아요를 눌렀다면 삭제
      await exLike.destroy();
      res.json({ liked: false });
    } else {
      //좋아요를 누르지 않은 경우 생성
      await Like.create({
        PostId: postId,
        UserId: userId,
      });
      const likeCount = await Like.count({ where: { PostId: postId } });
      res.json({ count: likeCount, liked: true });
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
});

//좋아요 삭제
router.delete('/posts/:postId/like', isLoggedIn, async (req, res, next) => {
  try {
    const postId = parseInt(req.params.postId, 10);
    const { id: userId } = req.user;

    //좋아요를 눌렀는지 검사
    const exLike = await Like.findOne({
      where: {
        PostId: postId,
        UserId: userId,
      },
    });

    if (exLike) {
      //좋아요가 있으면 삭제
      await exLike.destroy();
      const likeCount = await Like.count({ where: { PostId: postId } });
      res.json({ count: likeCount, liked: false });
    } else {
      //좋아요가 없으면 에러 처리
      res.status(400).json({ message: '해당 포스트에 좋아요를 누르지 않았습니다.' });
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// 이메일 찾기
router.post('/users/findId', async (req, res) => {
  const { name } = req.body;
  try {
    const user = await User.findOne({ where: { name } });
    if (!user) {
      return res.status(404).json({ message: '일치하는 계정이 없습니다.' });
    }
    return res.status(200).json({ email: user.email });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: '서버 에러입니다.' });
  }
});

// 비밀번호 찾기
router.post('/users/findPassword', async (req, res) => {
  const { email, receiveEmail } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: '일치하는 계정이 없습니다 ' });
    }

    // 임시 비밀번호 생헝
    const tempPassword = Math.random().toString(36).slice(-8);
    const hashedPassword = await bcrypt.hash(tempPassword, 12);

    // 비밀번호 업데이트
    await User.update({ password: hashedPassword }, { where: { email } });

    // 이메일 발송
    const mailOptions = {
      from: process.env.EMAIL_ADDRESS, // 발신자 이메일 주소
      to: receiveEmail, // 수신자 이메일 주소
      subject: '새로운 비밀번호 발급', // 이메일 제목
      text: `새로운 비밀번호: ${tempPassword}`, // 이메일 내용
    };
    await transporter.sendMail(mailOptions);

    return res.status(200).json({ message: '임시 비밀번호가 발급되었습니다.' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: '서버 에러입니다.' });
  }
});

// 주소와 get, post 등 메서드가 있는 것을 라우터라고 부른다.
// 현재 유저 정보 불러오기
router.get('/users', (req, res, next) => {
  console.log(req.user);
  return res.json(req.user || false);
});

// 특정 유저 정보 불러오기
router.get('/users/:id', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { id: req.params.id },
    });

    if (!user) {
      return res.status(404).json({
        message: '해당 ID의 사용자가 없습니다.',
      });
    }

    return res.json(user);
  } catch (error) {
    console.log(error);
    return next(error);
  }
});

// 회원가입
router.post('/users', isNotLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (user) {
      return res.status(409).json({
        message: '이미 존재하는 이메일입니다.',
      });
    }
    //비빌번호 암호화
    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    //사용자 생성
    await User.create({
      email: req.body.email,
      name: req.body.name,
      password: hashedPassword,
      role: req.body.role || 'user', //role 값이 지정되지 않으면 기본값으로 user 설정
    });
    return res.status(201).json({
      message: '회원가입이 완료되었습니다.',
    });
  } catch (error) {
    console.log(error);
    return next(error);
  }
});

// 회원 탈퇴
router.delete('/users/:userId', isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.params.userId } });

    if (!user) {
      return res.status(404).json({
        message: '해당 이메일을 가진 사용자가 없습니다.',
      });
    }

    if (req.user.id !== parseInt(req.params.userId)) {
      return res.status(403).json({
        message: '본인 계정에만 탈퇴를 진행할 수 있습니다.',
      });
    }

    await User.destroy({ where: { id: req.params.userId } });

    req.session.destroy();

    return res.status(200).json({
      message: '회원 탈퇴가 완료되었습니다.',
    });
  } catch (error) {
    console.log(error);
    return next(error);
  }
});

// 비밀번호 변경
router.put('/users/password', isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.user.id } });
    if (!user) {
      return res.status(404).json({
        message: '사용자를 찾을 수 없습니다.',
      });
    }

    const { currentPassword, newPassword } = req.body;

    // 입력된 현재 비밀번호와 DB의 비밀번호 비교
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({
        message: '현재 비밀번호가 일치하지 않습니다.',
      });
    }

    // 새로운 비밀번호 암호화 후 업데이트
    const hashedPassword = await bcrypt.hash(newPassword, 12);
    await User.update({ password: hashedPassword }, { where: { id: req.user.id } });

    return res.status(200).json({
      message: '비밀번호가 성공적으로 변경되었습니다.',
    });
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

// 로그인
router.post('/users/login', isNotLoggedIn, (req, res, next) => {
  // passport.authenticate => 미들웨어
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.log(err);
      return next(err);
    }
    if (info) {
      return res.status(401).json(info.reason);
    }
    return req.login(user, async (loginErr) => {
      try {
        if (loginErr) {
          return next(loginErr);
        }
        const fullUser = await User.findOne({
          where: { id: user.id },
          attributes: ['id', 'name', 'email', 'role'],
        });
        return res.status(200).json(fullUser);
      } catch (e) {
        console.error(e);
        next(e);
      }
    });
  })(req, res, next);
});

// 소셜 로그인
// Google 로그인
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/');
  },
);

// Github 로그인
router.get('/auth/github', passport.authenticate('github', { scope: ['user:email'] }));

router.get(
  '/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/');
  },
);

// 로그아웃
router.post('/users/logout', isLoggedIn, (req, res) => {
  req.logout(() => {
    req.session.destroy();
    res.send('ok');
  });
});

module.exports = router;
