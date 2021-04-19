module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn('files', 'public_id', {
      type: Sequelize.STRING,
      allowNull: true,
    }),

  down: (queryInterface) => queryInterface.removeColumn('files', 'public_id'),
};
