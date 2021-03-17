import Sequelize from 'sequelize';

class Comentario extends Sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        comentario: Sequelize.STRING,
        restaurante_id: Sequelize.INTEGER,
        cliente_id: Sequelize.INTEGER,
      },
      { sequelize, tableName: 'comentarios' }
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

export default Comentario;
