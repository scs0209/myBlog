module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "likes", // 테이블의 이름을 지정한다.
    {
      id: {
        //post 테이블의 Columns역할을 담당
        type: DataTypes.INTEGER, //정수타입 데이터를 50 length까지 가질 수 있다는 의미
        primaryKey: true,
        autoIncrement: true
      },
    },
    {
      modelName: "LIKE",
      charset: "utf8",
      collate: "utf8_general_ci",
      timestamps: true,
      paranoid: true,
    }
  );
};
