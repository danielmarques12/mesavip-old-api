import Sequelize from 'sequelize';

class Horario extends Sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        horario: Sequelize.STRING,
      },
      { sequelize, tableName: 'horarios' }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Usuario, {
      foreignKey: 'restaurante_id',
      as: 'restaurante',
    });
  }
}

export default Horario;
