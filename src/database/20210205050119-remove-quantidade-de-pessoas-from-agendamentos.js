module.exports = {
  up: (queryInterface) => {
    queryInterface.removeColumn('agendamentos', 'quantidade_pessoas');
  },

  down: (queryInterface, Sequelize) =>
    queryInterface.addColumn('agendamentos', 'quantidade_pessoas', {
      type: Sequelize.INTEGER,
      allowNull: false,
    }),
};
