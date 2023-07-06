const Sequelize = require('sequelize');

class Visitor extends Sequelize.Model {
  static initiate(sequelize) {
    Visitor.init(
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        date: {
          type: Sequelize.DATEONLY,
          allowNull: false,
        },
        count: {
          type: Sequelize.INTEGER,
          defaultValue: 1,
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: false,
        modelName: 'Visitor',
        tableName: 'visitors',
        charset: 'utf8',
        collate: 'utf8_general_ci',
      },
    );
  }
}

module.exports = Visitor;
