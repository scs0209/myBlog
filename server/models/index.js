'use strict';

const path = require('path');
const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
// path 모듈을 사용할 때 여러개의 인자값이 들어간다.
// 두번째의 '..'은 경로의 이동값인데, 현 디렉토리의 밖에 있다는 의미로 쓰인다.
// 세번째의 config는 현재 디렉토리 안에 있는 config라는 디렉토리로 들어간다는 의미
// 마지막의 db.json는 config 디렉토리 안에 있는 db.json파일을 가져오겠다는 뜻이다.
const config = require(path.join(__dirname, '..', 'config', 'db.json'))[
    env
  ];
const db = {};

let sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config,
    {
      define: {
        charset: 'utf8',
        collate: 'utf8_general_ci'
      }
    }
  );
  
  db.sequelize = sequelize;
  db.Sequelize = Sequelize;

    db.sequelize
    .authenticate()
    .then(() => {//db가 성공적으로 생성됐을 시
        console.log('Connection has been established successfully.');
    })
    .catch(err => {//db가 생성 안됐을 시
        console.log('Unable to connect to the database: ', err);
    });

    db.User = require('./User')(sequelize, Sequelize);
    db.Post = require('./post')(sequelize, Sequelize);
    db.postTag = require('./postTag')(sequelize, Sequelize);
    db.Tag = require('./tag')(sequelize, Sequelize);
    db.Comment = require('./comment')(sequelize, Sequelize);
    db.Like = require('./like')(sequelize, Sequelize);

    db.User.hasMany(db.Post);
    db.Post.belongsTo(db.User);

    db.Post.belongsToMany(db.Tag, {
      through : 'PostTag',
    });
    db.Tag.belongsToMany(db.Post, {
      through: 'PostTag'
    });

    db.Comment.belongsTo(db.User);
    db.Comment.belongsTo(db.Post);
    db.User.hasMany(db.Comment);
    db.Post.hasMany(db.Comment);

    db.Like.belongsTo(db.User);
    db.Like.belongsTo(db.Post);
    db.User.hasMany(db.Like);
    db.Post.hasMany(db.Like);


db.secret = '(9*)5$&!3%^0%^@@2$1!#5@2!4';
module.exports = db;

