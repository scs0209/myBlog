const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
const hpp = require("hpp");
const helmet = require("helmet");
const apiRouter = require("./routes/api");
const newRouter = require("./routes/news")
const passport = require("passport");

const app = express();

const passportConfig = require("./passport");
passportConfig();

const sequelize = require("./models").sequelize;
sequelize
  .sync({ force: false })
  .then(() => {
    console.log("데이터베이스 연결 성공");
  })
  .catch((err) => {
    console.log(err);
  });
const prod = process.env.NODE_ENV === "production";

if (prod) {
  app.enable("trust proxy");
  app.use(morgan("combined"));
  app.use(helmet({ contentSecurityPolicy: false }));
  app.use(hpp());
  app.use(
    cors({
      origin: true,
      credentials: true,
    })
  );
} else {
  app.use(morgan("dev"));
  app.use(
    cors({
      origin: true,
      credentials: true,
    })
  );
}
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "100mb", extended: true })); //form 파싱을 해줌
const sessionOption = {
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
  },
};
if (prod) {
  sessionOption.cookie.secure = true;
  sessionOption.cookie.proxy = true;
}
app.use(session(sessionOption));
app.use(passport.initialize());
app.use(passport.session());


//클라이언트로부터 받아오는 값을 조회활 수 잇는 API를 작성
//이제부터 클라이언트가 '/add/data/'의 주소로 보내는 모든 데이터는 서버로 전송된다.
// 여기서 클라이언트가 보내는 데이터를 읽기 위해서는 'body-parser'라는 모듈이 필요하기 때문에 npm i body-parser를 해준다.
app.use("/api", apiRouter);
app.use("/api/news", newRouter);
app.get("*", (req, res, next) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server On : http://localhost:${PORT}/`);
});

