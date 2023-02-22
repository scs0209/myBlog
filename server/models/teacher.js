module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'teacher',// 테이블의 이름을 지정한다.
    {
      name: {//teacher 테이블의 Columns역할을 담당
        type: DataTypes.STRING(50),//String타입의 데이터를 50 length까지 가질 수 있다는 의미
        allowNull: true
      },
    },
    {
      charset: 'utf8',
      collate: 'utf8_general_ci',
      timestamps: false,
    }
  )
}