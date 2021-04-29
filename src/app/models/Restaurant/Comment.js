import Sequelize from 'sequelize';

class Comment extends Sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        comment_id: { primaryKey: true, type: Sequelize.INTEGER },
        comment: Sequelize.STRING,
        restaurant_id: Sequelize.INTEGER,
        client_id: Sequelize.INTEGER,
      },
      { sequelize, tableName: 'comments' }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: 'restaurant_id',
      as: 'restaurant',
    });
    this.belongsTo(models.User, {
      foreignKey: 'client_id',
      as: 'client',
    });
  }
}

export default Comment;
