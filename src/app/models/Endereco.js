import Sequelize from 'sequelize';

class Endereco extends Sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        bairro: Sequelize.STRING,
        cidade: Sequelize.STRING,
        estado: Sequelize.STRING,
        cep: Sequelize.STRING,
        logradouro: Sequelize.STRING,
        numero: Sequelize.STRING,
        complemento: Sequelize.STRING,
        usuario_id: Sequelize.INTEGER,
      },
      { sequelize, tableName: 'enderecos' }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Usuario, {
      foreignKey: 'usuario_id',
      as: 'usuario',
    });
  }
}

export default Endereco;
