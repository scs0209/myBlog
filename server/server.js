const express = require('express');
const dotenv = require('dotenv');
const session = require('express-session');
const cookieParser = require("cookie-parser");
const morgan = require('morgan');
const path = require('path');
const apiRouter = require('./routes/api');
const passport = require('passport');

dotenv.config();
const app = express();

const passportConfig = require('./passport');
passportConfig();

const sequelize = require('./models').sequelize;
sequelize.sync({ force: false })
  .then(() => {
    console.log('데이터베이스 연결 성공')
  })
  .catch((err) => {
    console.log(err);
  });

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser('myblog'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));//form 파싱을 해줌
// const sessionOption = {
//   resave: false,
//   saveUninitialized: false,
//   secret: 'myblog',
//   cookie: {
//     httpOnly: true,
//   },
// };
app.use(session({secret: 'myblog'}));
app.use(passport.initialize());
app.use(passport.session());



//클라이언트로부터 받아오는 값을 조회활 수 잇는 API를 작성
//이제부터 클라이언트가 '/add/data/'의 주소로 보내는 모든 데이터는 서버로 전송된다.
// 여기서 클라이언트가 보내는 데이터를 읽기 위해서는 'body-parser'라는 모듈이 필요하기 때문에 npm i body-parser를 해준다.
app.use('/api', apiRouter);
app.get("*", (req, res, next) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server On : http://localhost:${PORT}/`);
});