import Sequelize, { Model } from 'sequelize';

class Agendamento extends Model {
  static init(sequelize) {
    super.init(
      {
        horario_id: Sequelize.INTEGER,
        cliente_id: Sequelize.INTEGER,
        mesa_id: Sequelize.INTEGER,
      },
      { sequelize, tableName: 'agendamentos' }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Usuario, { foreignKey: 'cliente_id', as: 'cliente' });
    this.belongsTo(models.Horario, { foreignKey: 'horario_id', as: 'horario' });
    this.belongsTo(models.Mesa, { foreignKey: 'mesa_id', as: 'mesa' });
  }
}

export default Agendamento;
