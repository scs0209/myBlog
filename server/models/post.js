const Sequelize = require('sequelize');

class Post extends Sequelize.Model {
  static initiate(sequelize) {
    Post.init(
      {
        id: {
          //post 테이블의 Columns역할을 담당
          type: Sequelize.INTEGER(50), //정수타입 데이터를 50 length까지 가질 수 있다는 의미
          primaryKey: true,
          autoIncrement: true,
        },
        title: {
          type: Sequelize.STRING(50),
          allowNull: false,
        },
        content: {
          type: Sequelize.TEXT('long'),
          allowNull: false,
        },
        views: {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
        categoryId: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: 'Post',
        tableName: 'posts',
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci',
        timestamps: true,
        paranoid: true,
      },
    );
  }
  static associate(db) {
    db.Post.belongsTo(db.User);
    db.Post.belongsTo(db.Category, {
      as: 'category',
      foreignKey: 'categoryId',
      onDelete: 'CASCADE',
    });
    db.Post.hasMany(db.Like);
    db.Post.hasMany(db.Comment, { onDelete: 'CASCADE' });
  }
}

module.exports = Post;
