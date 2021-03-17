import Sequelize from 'sequelize';

class Nota extends Sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        nota: Sequelize.INTEGER,
        restaurante_id: Sequelize.INTEGER,
        cliente_id: Sequelize.INTEGER,
      },
      { sequelize, tableName: 'notas' }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Usuario, {
      foreignKey: 'restaurante_id',
      as: 'restaurante',
    });
    this.belongsTo(models.Usuario, {
      foreignKey: 'cliente_id',
      as: 'cliente',
    });
  }
}

export default Nota;
