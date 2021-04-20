module.exports = {
  up: (queryInterface) =>
    queryInterface.bulkInsert(
      'culinarias',
      [
        {
          nome: 'Brasileira',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nome: 'Americana',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nome: 'Vegana',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nome: 'Vegetariana',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nome: 'Mineira',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nome: 'Baiana',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nome: 'Indiana',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nome: 'Japonesa',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nome: 'Italiana',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nome: 'Chinesa',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nome: 'Churrascaria',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    ),
  down: () => {},
};
