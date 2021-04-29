import Sequelize from 'sequelize';

class Culinary extends Sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        culinary_id: {
          primaryKey: true,
          type: Sequelize.INTEGER,
          autoIncrement: true,
          allowNull: false,
        },
        name: Sequelize.STRING,
      },
      { sequelize, tableName: 'culinaries' }
    );

    return this;
  }
}

export default Culinary;
