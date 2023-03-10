const Sequelize = require("sequelize");

class Tag extends Sequelize.Model {
  static initiate(sequelize) {
    Tag.init(
      {
        id: {
          //post 테이블의 Columns역할을 담당
          type: Sequelize.INTEGER, //정수타입 데이터를 50 length까지 가질 수 있다는 의미
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          type: Sequelize.STRING(50),
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: false,
        modelName: "Tag",
        tableName: "tag",
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate(db) {
    // DB 특성상 다대다 관계는 중간 테이블이 생김
    db.Tag.belongsToMany(db.Category, { through: 'CategoryTag'});
  }
};

module.exports = Tag;