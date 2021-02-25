module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('horarios', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      horario: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      restaurante_id: {
        references: { model: 'usuarios', key: 'id' },
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

  down: (queryInterface) => queryInterface.dropTable('horarios'),
};
