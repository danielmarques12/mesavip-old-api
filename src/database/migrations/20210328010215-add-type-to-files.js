module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn('files', 'type', {
      type: Sequelize.STRING,
      allowNull: true,
    }),

  down: (queryInterface) => queryInterface.removeColumn('files', 'type'),
};
