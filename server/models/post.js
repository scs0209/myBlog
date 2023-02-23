module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "posts", // 테이블의 이름을 지정한다.
    {
      id: {
        //post 테이블의 Columns역할을 담당
        type: DataTypes.INTEGER(50), //정수타입 데이터를 50 length까지 가질 수 있다는 의미
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      modelName: "POST",
      charset: "utf8",
      collate: "utf8_general_ci",
      timestamps: true,
      paranoid: true
    }
  );
}