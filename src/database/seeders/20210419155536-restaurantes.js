const sobre = `O restaurante foi fundado pelo chefe proprietário, o restaurante
traz na íntegra todas as receitas que o chefe aprendeu com sua família ao longo
de décadas.`;
const site = 'https://restaurante.com.br';
const telefone = '(11) 93123-4566';

module.exports = {
  up: (queryInterface) =>
    queryInterface.bulkInsert(
      'restaurantes',
      [
        {
          sobre,
          telefone,
          site,
          restaurante_id: 11,
          culinaria_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          sobre,
          telefone,
          site,
          restaurante_id: 12,
          culinaria_id: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          sobre,
          telefone,
          site,
          restaurante_id: 13,
          culinaria_id: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          sobre,
          telefone,
          site,
          restaurante_id: 14,
          culinaria_id: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          sobre,
          telefone,
          site,
          restaurante_id: 15,
          culinaria_id: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          sobre,
          telefone,
          site,
          restaurante_id: 16,
          culinaria_id: 6,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          sobre,
          telefone,
          site,
          restaurante_id: 17,
          culinaria_id: 7,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          sobre,
          telefone,
          site,
          restaurante_id: 18,
          culinaria_id: 8,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          sobre,
          telefone,
          site,
          restaurante_id: 19,
          culinaria_id: 9,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          sobre,
          telefone,
          site,
          restaurante_id: 20,
          culinaria_id: 10,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          sobre,
          telefone,
          site,
          restaurante_id: 21,
          culinaria_id: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          sobre,
          telefone,
          site,
          restaurante_id: 22,
          culinaria_id: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    ),
  down: () => {},
};
