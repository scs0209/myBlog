const Sequelize = require("sequelize");

class Like extends Sequelize.Model {
  static initiate(sequelize) {
    Like.init(
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
      },
      {
        sequelize,
        modelName: "Like",
        tableName: "likes",
        charset: "utf8",
        collate: "utf8_general_ci",
        timestamps: true,
        paranoid: true,
      }
    );
  }
  static associate(db) {
    db.Like.belongsTo(db.User);
    db.Like.belongsTo(db.Post);
  }
};

module.exports = Like;