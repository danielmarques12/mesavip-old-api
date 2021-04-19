module.exports = {
  up: (queryInterface) => queryInterface.removeColumn('mesas', 'capacidade'),

  down: (queryInterface, Sequelize) =>
    queryInterface.addColumn('mesas', 'capacidade', {
      type: Sequelize.INTEGER,
      allowNull: false,
    }),
};
