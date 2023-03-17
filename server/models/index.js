'use strict';
const Sequelize = require('sequelize');
const User = require('./user');
const Post = require('./post');
const PostTag = require("./postTag");
const Tag = require('./tag');
const Comment = require('./comment');
const Like = require('./like');
const Category = require('./category');
const CategoryTag = require('./categoryTag');
const CommentCategory = require('./commentCategory');
const Replies = require('./reply');

const env = process.env.NODE_ENV || 'development';
// path 모듈을 사용할 때 여러개의 인자값이 들어간다.
// 두번째의 '..'은 경로의 이동값인데, 현 디렉토리의 밖에 있다는 의미로 쓰인다.
// 세번째의 config는 현재 디렉토리 안에 있는 config라는 디렉토리로 들어간다는 의미
// 마지막의 db.json는 config 디렉토리 안에 있는 db.json파일을 가져오겠다는 뜻이다.
const config = require('../config/config')[env];
const db = {};

const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config,
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

    db.User = User;
    db.Post = Post;
    db.PostTag = PostTag;
    db.Tag = Tag;
    db.Comment = Comment;
    db.Like = Like;
    db.Category = Category;
    db.CommentCategory = CommentCategory;
    db.CategoryTag = CategoryTag;
    db.Replies = Replies;

    User.initiate(sequelize);
    Post.initiate(sequelize);
    PostTag.initiate(sequelize);
    Tag.initiate(sequelize);
    Comment.initiate(sequelize);
    Like.initiate(sequelize);
    Category.initiate(sequelize);
    CategoryTag.initiate(sequelize);
    CommentCategory.initiate(sequelize);
    Replies.initiate(sequelize);

    // db.User.hasMany(db.Post);
    // db.Post.belongsTo(db.User);

    // db.Post.belongsToMany(db.Tag, {
    //   through : 'PostTag',
    // });
    // db.Tag.belongsToMany(db.Post, {
    //   through: 'PostTag'
    // });

    // db.Comment.belongsTo(db.User);
    // db.Comment.belongsTo(db.Post);
    // db.User.hasMany(db.Comment);
    // db.Post.hasMany(db.Comment);

    // db.Like.belongsTo(db.User);
    // db.Like.belongsTo(db.Post);
    // db.User.hasMany(db.Like);
    // db.Post.hasMany(db.Like);


    Object.values(db)
    .filter((model) => typeof model.associate === "function")
    .forEach((model) => model.associate(db));

module.exports = db;

