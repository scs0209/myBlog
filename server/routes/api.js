const express = require('express');
const util = require('util');

const User = require('../models/User'); 

const router = express.Router();

const mysql = require('mysql');
const connection = mysql.createConnection({
  host: "tutorial-db-instance.clfzc3a1xomr.ap-northeast-2.rds.amazonaws.com",
  user: "tutorial_user",
  password: "gk2fnd12",
  database: "sample",
});

connection.connect();

router.get('/users/login', (req, res) => {
  res.send({data: 'data'})
});

router.post("/users/login", (req, res) => {
  console.log(`= = = > req : ${util.inspect(req)}`);
  // user_id, pw 변수로 선언
  const id = req.query.id;
  const pw = req.query.password;
  // 입력된 id 와 동일한 id 가 mysql 에 있는 지 확인
  const sql1 = 'SELECT COUNT(*) AS sample FROM users WHERE id = ?;';
  connection.query(sql1, id, (err, data) => {
    if (!err) {
      // 결과값이 1보다 작다면(동일한 id 가 없다면)
      if (data[0].result < 1) {
        res.send({ msg: "입력하신 id 가 일치하지 않습니다." });
      } else {
        // 동일한 id 가 있으면 비밀번호 일치 확인
        const sql2 = `SELECT 
                      CASE (SELECT COUNT(*) FROM users WHERE id = ? AND password = ?)
                          WHEN '0' THEN NULL
                          ELSE (SELECT id FROM users WHERE id = ? AND pw = ?)
                      END AS userId
                      , CASE (SELECT COUNT(*) FROM users WHERE id = ? AND pw = ?)
                          WHEN '0' THEN NULL
                          ELSE (SELECT pw FROM users WHERE id = ? AND pw = ?)
                      END AS userPw`;
        // sql 란에 필요한 parameter 값을 순서대로 기재
        const params = [
          id,
          pw,
          id,
          pw,
          id,
          pw,
          id,
          pw,
        ];
        connection.query(sql2, params, (err, data) => {
          if (!err) {
            res.send(data[0]);
          } else {
            res.send(err);
          }
        });
      }
    } else {
      res.send(err);
    }
  });
});

module.exports = router;