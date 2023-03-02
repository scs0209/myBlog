const Sequelize = require("sequelize");

class CategoryTag extends Sequelize.Model {
  static initiate(sequelize) {
    CategoryTag.init(
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
      },
      {
        sequelize,
        modelName: "CategoryTag",
        tableName: "category_tags",
        charset: "utf8",
        collate: "utf8_general_ci",
        timestamps: true,
        paranoid: true,
      }
    );
  }
}

module.exports = CategoryTag;