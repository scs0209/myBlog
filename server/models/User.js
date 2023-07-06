const Sequelize = require('sequelize');

class User extends Sequelize.Model {
  static initiate(sequelize) {
    User.init(
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        googleId: {
          type: Sequelize.STRING,
          allowNull: true,
          unique: true,
        },
        githubId: {
          type: Sequelize.STRING,
          allowNull: true,
          unique: true,
        },
        name: {
          type: Sequelize.STRING(50),
          allowNull: false, //NOT NULL 이라는 뜻
        },
        email: {
          type: Sequelize.STRING(50),
          allowNull: false,
        },
        password: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        role: {
          type: Sequelize.ENUM('user', 'admin'),
          allowNull: false,
          defaultValue: 'user',
        },
      },
      // createAt => 생성할 때 시간이 자동으로 저장, updatedAt => update될 때 시간이 자동으로 저장(timestamps true 일 경우);
      // paranoid가 true이면 deletedAt 까지 사용가능 deletedAt => 삭제 했을 때의 시간
      {
        sequelize,
        timestamps: false,
        modelName: 'User', //자바스크립트에서 사용하는 이름
        tableName: 'users', //sql에서 사용하는 이름
        charset: 'utf8', //utf8mb4 => 이모티콘까지 사용 가능
        collate: 'utf8_general_ci',
      },
    );
  }
  static associate(db) {
    db.User.hasMany(db.Post);
    db.User.hasMany(db.Like);
    db.User.hasMany(db.Comment);
  }
}

module.exports = User;
