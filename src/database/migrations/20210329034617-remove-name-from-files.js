module.exports = {
  up: (queryInterface) => queryInterface.removeColumn('files', 'name'),

  down: (queryInterface, Sequelize) =>
    queryInterface.addColumn('files', 'name', {
      type: Sequelize.STRING,
      allowNull: false,
    }),
};
