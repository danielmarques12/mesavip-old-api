module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.changeColumn('files', 'public_id', {
      type: Sequelize.STRING,
      allowNull: false,
    }),

  down: (queryInterface, Sequelize) =>
    queryInterface.changeColumn('files', 'public_id', {
      type: Sequelize.STRING,
      allowNull: true,
    }),
};
