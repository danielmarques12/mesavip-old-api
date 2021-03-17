import Sequelize from 'sequelize';

class Restaurante extends Sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        sobre: Sequelize.STRING,
        telefone: Sequelize.STRING,
        site: Sequelize.STRING,
        restaurante_id: Sequelize.INTEGER,
        culinaria_id: Sequelize.INTEGER,
      },
      { sequelize, tableName: 'restaurantes' }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Usuario, {
      foreignKey: 'restaurante_id',
      as: 'restaurante',
    });
    this.belongsTo(models.Culinaria, {
      foreignKey: 'culinaria_id',
      as: 'culinaria',
    });
  }
}

export default Restaurante;
