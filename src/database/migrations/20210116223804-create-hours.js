module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('hours', {
      hour_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      hour: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      restaurant_id: {
        references: { model: 'users', key: 'user_id' },
        type: Sequelize.INTEGER,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    }),

  down: (queryInterface) => queryInterface.dropTable('hours'),
};
