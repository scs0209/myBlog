const Sequelize = require('sequelize');

class Category extends Sequelize.Model {
  static initiate(sequelize) {
    Category.init(
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true, //기본키의 자동 증가
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        hidden: {
          // hidden 속성 추가
          type: Sequelize.BOOLEAN,
          defaultValue: false,
        },
      },
      {
        sequelize,
        modelName: 'Category',
        tableName: 'category',
        charset: 'utf8',
        collate: 'utf8_general_ci',
        timestamps: true,
        paranoid: true,
      },
    );
  }
  static associate(db) {
    db.Category.belongsTo(db.User);
    db.Category.belongsToMany(db.Tag, { through: 'CategoryTag' });
    db.Category.belongsToMany(db.Comment, { through: 'CommentCategory' });
    db.Category.hasMany(db.Post, { as: 'posts', foreignKey: 'categoryId', onDelete: 'CASCADE' });
  }
}

module.exports = Category;
