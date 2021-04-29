import Sequelize from 'sequelize';

class Restaurant extends Sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        about: Sequelize.STRING,
        phone: Sequelize.STRING,
        site: Sequelize.STRING,
        restaurant_id: Sequelize.INTEGER,
        culinary_id: Sequelize.INTEGER,
      },
      { sequelize, tableName: 'restaurants' }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: 'restaurant_id',
      as: 'restaurant',
    });
    this.belongsTo(models.Culinary, {
      foreignKey: 'culinary_id',
      as: 'culinary',
    });
  }
}

export default Restaurant;
