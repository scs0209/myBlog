const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const apiRouter = require('./routes/api');

const sequelize = require('./models').sequelize;
sequelize.sync();

app.use(express.json());
// body-Parser 모듈 적용
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



//클라이언트로부터 받아오는 값을 조회활 수 잇는 API를 작성
//이제부터 클라이언트가 '/add/data/'의 주소로 보내는 모든 데이터는 서버로 전송된다.
// 여기서 클라이언트가 보내는 데이터를 읽기 위해서는 'body-parser'라는 모듈이 필요하기 때문에 npm i body-parser를 해준다.
app.use('/api', apiRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server On : http://localhost:${PORT}/`);
});