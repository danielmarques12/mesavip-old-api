module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn('usuarios', 'type', {
      type: Sequelize.STRING,
      allowNull: true,
    }),

  down: (queryInterface) => queryInterface.removeColumn('usuarios', 'type'),
};
