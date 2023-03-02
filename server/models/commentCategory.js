const Sequelize = require('sequelize');

class CommentCategory extends Sequelize.Model {
  static initiate(sequelize) {
    CommentCategory.init(
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
      },
      {
        sequelize,
        modelName: "CommentCategory",
        tableName: "comment_category",
        charset: "utf8",
        collate: "utf8_general_ci",
        timestamps: true,
        paranoid: true,
      }
    );
  }
}

module.exports = CommentCategory;