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

router.get('/users/login', (req, res) => {
  res.send({data: 'data'})
});

router.post('/users/login', (req, res) => {
  connection.query({
    where: { id: req }
  })
  .then((result) => { res.send(result) })
  .catch( err => { throw err})
});

module.exports = router;