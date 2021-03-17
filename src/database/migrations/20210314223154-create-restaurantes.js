module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('restaurantes', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      sobre: {
        type: Sequelize.STRING(1000),
        allowNull: false,
      },
      telefone: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      site: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      restaurante_id: {
        references: { model: 'usuarios', key: 'id' },
        type: Sequelize.INTEGER,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        unique: true,
      },
      culinaria_id: {
        references: { model: 'culinarias', key: 'id' },
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

  down: (queryInterface) => queryInterface.dropTable('restaurantes'),
};
