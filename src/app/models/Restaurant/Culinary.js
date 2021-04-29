import Sequelize from 'sequelize';

class Culinary extends Sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
      },
      { sequelize, tableName: 'culinaries' }
    );

    return this;
  }
}

export default Culinary;
