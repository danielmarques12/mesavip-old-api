module.exports = {
  up: (queryInterface) =>
    queryInterface.bulkInsert(
      'culinaries',
      [
        {
          name: 'Brasileira',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Americana',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Vegana',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Vegetariana',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Mineira',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Baiana',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Indiana',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Japonesa',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Italiana',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Chinesa',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Churrascaria',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    ),
  down: () => {},
};
