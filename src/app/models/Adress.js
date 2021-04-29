import Sequelize from 'sequelize';

class Adress extends Sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        adress_id: { primaryKey: true, type: Sequelize.INTEGER },
        bairro: Sequelize.STRING,
        cidade: Sequelize.STRING,
        estado: Sequelize.STRING,
        cep: Sequelize.STRING,
        logradouro: Sequelize.STRING,
        numero: Sequelize.STRING,
        complemento: Sequelize.STRING,
        user_id: Sequelize.INTEGER,
      },
      { sequelize, tableName: 'addresses' }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user',
    });
  }
}

export default Adress;
