const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');//기본적으로 express는 post 방식을 처리해주지 않는데, post 방식을 처리해주게 해주는 module
const app = express();
const apiRouter = require('./routes/api');
const passport = require('passport');

const passportConfig = require('./passport');

passportConfig();

const sequelize = require('./models').sequelize;
sequelize.sync({ force: false})
  .then(() => {
    console.log('데이터베이스 연결 성공')
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());
// body-Parser 모듈 적용(app이 body-parser를 사용하겠다는 뜻)
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(
  session({
    secret: "SECRET",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());



//클라이언트로부터 받아오는 값을 조회활 수 잇는 API를 작성
//이제부터 클라이언트가 '/add/data/'의 주소로 보내는 모든 데이터는 서버로 전송된다.
// 여기서 클라이언트가 보내는 데이터를 읽기 위해서는 'body-parser'라는 모듈이 필요하기 때문에 npm i body-parser를 해준다.
app.use('/api', apiRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server On : http://localhost:${PORT}/`);
});