import Sequelize from 'sequelize';

require('dotenv/config');

class File extends Sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        file_id: {
          primaryKey: true,
          type: Sequelize.INTEGER,
          autoIncrement: true,
          allowNull: false,
        },
        path: Sequelize.STRING,
        public_id: Sequelize.STRING,
        type: Sequelize.STRING,
      },
      { sequelize, tableName: 'files' }
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

export default File;
