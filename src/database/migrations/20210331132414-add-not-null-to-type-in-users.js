module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.changeColumn('usuarios', 'type', {
      type: Sequelize.STRING,
      allowNull: false,
    }),

  down: (queryInterface, Sequelize) =>
    queryInterface.changeColumn('usuarios', 'type', {
      type: Sequelize.STRING,
      allowNull: true,
    }),
};
