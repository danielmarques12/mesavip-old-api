import Sequelize from 'sequelize';

class Culinaria extends Sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        nome: Sequelize.STRING,
      },
      { sequelize, tableName: 'culinarias' }
    );

    return this;
  }
}

export default Culinaria;
