import Sequelize from 'sequelize';

class Hour extends Sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        hour_id: {
          primaryKey: true,
          type: Sequelize.INTEGER,
          autoIncrement: true,
          allowNull: false,
        },
        hour: Sequelize.STRING,
      },
      { sequelize, tableName: 'hours' }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: 'restaurant_id',
      as: 'restaurant',
    });
  }
}

export default Hour;
