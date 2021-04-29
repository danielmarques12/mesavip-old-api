import Sequelize from 'sequelize';

class Reservation extends Sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        hour_id: Sequelize.INTEGER,
        client_id: Sequelize.INTEGER,
        table_id: Sequelize.INTEGER,
      },
      { sequelize, tableName: 'reservations' }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'client_id', as: 'client' });
    this.belongsTo(models.User, { foreignKey: 'hour_id', as: 'hour' });
    this.belongsTo(models.Table, { foreignKey: 'table_id', as: 'table' });
  }
}

export default Reservation;
