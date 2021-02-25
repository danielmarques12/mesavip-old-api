module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('agendamentos', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      quantidade_pessoas: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      cancelamento: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      horario_id: {
        references: { model: 'horarios', key: 'id' },
        type: Sequelize.INTEGER,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      cliente_id: {
        references: { model: 'usuarios', key: 'id' },
        type: Sequelize.INTEGER,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      mesa_id: {
        references: { model: 'mesas', key: 'id' },
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

  down: (queryInterface) => queryInterface.dropTable('agendamentos'),
};
