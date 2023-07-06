require('dotenv').config();

module.exports = {
  development: {
    username: 'tutorial_user',
    password: process.env.MYSQL_PASSWORD,
    database: 'sample',
    host: 'db-instance.clfzc3a1xomr.ap-northeast-2.rds.amazonaws.com',
    port: '3306',
    dialect: 'mysql',
  },
  production: {
    username: 'tutorial_user',
    password: process.env.MYSQL_PASSWORD,
    database: 'sample',
    host: 'db-instance.clfzc3a1xomr.ap-northeast-2.rds.amazonaws.com',
    dialect: 'mysql',
  },
};
