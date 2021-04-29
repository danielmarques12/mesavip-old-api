import Sequelize from 'sequelize';

class Hour extends Sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        hour: Sequelize.STRING,
      },
      { sequelize, tableName: 'hours' }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Usuario, {
      foreignKey: 'restaurant_id',
      as: 'restaurant',
    });
  }
}

export default Hour;
