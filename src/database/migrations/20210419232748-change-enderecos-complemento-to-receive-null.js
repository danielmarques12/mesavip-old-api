module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.changeColumn('enderecos', 'complemento', {
      type: Sequelize.STRING,
      allowNull: true,
    }),

  down: (queryInterface, Sequelize) =>
    queryInterface.changeColumn('enderecos', 'complemento', {
      type: Sequelize.STRING,
      allowNull: false,
    }),
};
