module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'user_info',
    {
      id: {
        type: DataTypes.INTEGER(50),
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      email: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING(50),
        allowNull: false
      } 
    },
    {
      modelName: 'User',
      tableName: 'users', 
      charset: 'utf8',
      collate: 'utf8_general_ci',
      timestamps: false,
    }
  )
}