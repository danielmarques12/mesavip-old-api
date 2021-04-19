import Sequelize from 'sequelize';

require('dotenv/config');

class File extends Sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        path: Sequelize.STRING,
        public_id: Sequelize.STRING,
        type: Sequelize.STRING,
      },
      { sequelize, tableName: 'files' }
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

export default File;
