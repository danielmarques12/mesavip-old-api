import Sequelize from 'sequelize';

class Rate extends Sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        rate_id: { primaryKey: true, type: Sequelize.INTEGER },
        rate: Sequelize.INTEGER,
        restaurant_id: Sequelize.INTEGER,
        client_id: Sequelize.INTEGER,
      },
      { sequelize, tableName: 'rates' }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: 'restaurant_id',
      as: 'restaurant',
    });
    this.belongsTo(models.User, {
      foreignKey: 'client_id',
      as: 'client',
    });
  }
}

export default Rate;
