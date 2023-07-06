const Sequelize = require('sequelize');

class Comment extends Sequelize.Model {
  static initiate(sequelize) {
    Comment.init(
      {
        id: {
          //post 테이블의 Columns역할을 담당
          type: Sequelize.INTEGER, //정수타입 데이터를 50 length까지 가질 수 있다는 의미
          primaryKey: true,
          autoIncrement: true,
        },
        content: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: 'Comment',
        tableName: 'comments',
        charset: 'utf8',
        collate: 'utf8_general_ci',
        timestamps: true,
        paranoid: true,
      },
    );
  }
  static associate(db) {
    db.Comment.belongsTo(db.User);
    db.Comment.belongsTo(db.Post);
    db.Comment.belongsToMany(db.Tag, { through: 'CategoryTag' });
    db.Comment.belongsToMany(db.Category, { through: 'CommentCategory' });
    db.Comment.hasMany(db.Replies);
  }
}

module.exports = Comment;
