const Sequelize = require('sequelize');

class Replies extends Sequelize.Model {
  static initiate(sequelize) {
    Replies.init(
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        content: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        CommentId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'comments',
            key: 'id',
          },
          onDelete: 'CASCADE',
        },
      },
      {
        sequelize,
        modelName: 'Replies',
        tableName: 'replies',
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
        timestamps: true,
        paranoid: true,
      },
    );
  }

  static associate(db) {
    db.Replies.belongsTo(db.Comment);
    db.Replies.belongsTo(db.User);
  }
}

module.exports = Replies;
