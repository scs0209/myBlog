require('dotenv').config();

module.exports = {
  development: {
    username: 'root',
    password: process.env.MYSQL_PASSWORD,
    database: 'blog',
    host: 'svc.sel3.cloudtype.app',
    port: process.env.PORT,
    dialect: 'mariadb',
  },
  production: {
    username: 'root',
    password: process.env.MYSQL_PASSWORD,
    database: 'blog',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mariadb',
  },
};
