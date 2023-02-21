const mysql = require('mysql');

const db = mysql.createPool({
	host: 'tutorial-db-instance.clfzc3a1xomr.ap-northeast-2.rds.amazonaws.com',
	port: '3306',
	user: 'tutorial_user',
	password: 'gk2fnd12',
	database: 'sample',
});

module.exports = db;