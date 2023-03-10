const Sequelize = require("sequelize");
class PostTag extends Sequelize.Model {
  static initiate(sequelize) {
    PostTag.init(
      {
        id: {
          //post 테이블의 Columns역할을 담당
          type: Sequelize.INTEGER, //정수타입 데이터를 50 length까지 가질 수 있다는 의미
          primaryKey: true,
          autoIncrement: true, //기본키의 자동 증가
        },
      },
      {
        sequelize,
        modelName: "PostTag",
        tableName: "post_tags",
        charset: "utf8",
        collate: "utf8_general_ci",
        timestamps: true,
        paranoid: true,
      }
    );
  }
}
module.exports = PostTag;
