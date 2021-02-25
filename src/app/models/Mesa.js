import Sequelize, { Model } from 'sequelize';

class Mesa extends Model {
  static init(sequelize) {
    super.init(
      {
        capacidade: Sequelize.INTEGER,
      },
      {
        sequelize,
        tableName: 'mesas',
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Usuario, {
      foreignKey: 'restaurante_id',
      as: 'restaurante',
    });
    this.hasMany(models.Agendamento, {
      foreignKey: 'mesa_id',
      as: 'agendamento',
    });
  }
}

export default Mesa;
