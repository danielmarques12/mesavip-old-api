require('dotenv/config');
const bcrypt = require('bcryptjs');

const password = process.env.SEQUELIZE_BULK_INSERT_PASSWORD;
const cnpj = '12345678901234';

module.exports = {
  up: (queryInterface) =>
    queryInterface.bulkInsert(
      'users',
      [
        {
          name: 'Comida Mineira',
          email: 'comidamineira@gmail.com',
          cnpj,
          type: 'RES',
          password_hash: bcrypt.hashSync(password, 8),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Carnes Brasil',
          email: 'carnesbrasil@gmail.com',
          cnpj: cnpj + 1,
          type: 'RES',
          password_hash: bcrypt.hashSync(password, 8),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Esfirra do Gil',
          email: 'rogerio@gmail.com',
          cnpj: cnpj + 2,
          type: 'RES',
          password_hash: bcrypt.hashSync(password, 8),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Bar do Chico Lopes',
          email: 'chicolopes@gmail.com',
          cnpj: cnpj + 3,
          type: 'RES',
          password_hash: bcrypt.hashSync(password, 8),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Padoca do Marcola',
          email: 'padocadomarcola@gmail.com',
          cnpj: cnpj + 4,
          type: 'RES',
          password_hash: bcrypt.hashSync(password, 8),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Hamburgueria Novo Sabor',
          email: 'hamburguerianovosabor@gmail.com',
          cnpj: cnpj + 5,
          type: 'RES',
          password_hash: bcrypt.hashSync(password, 8),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Cantinho do sul',
          email: 'cantinhodosul@gmail.com',
          cnpj: cnpj + 6,
          type: 'RES',
          password_hash: bcrypt.hashSync(password, 8),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Nordeste com você',
          email: 'nordestecomvoce@gmail.com',
          cnpj: cnpj + 7,
          type: 'RES',
          password_hash: bcrypt.hashSync(password, 8),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Bar do Juca',
          email: 'bardojuca@gmail.com',
          cnpj: cnpj + 8,
          type: 'RES',
          password_hash: bcrypt.hashSync(password, 8),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Luffy Picanharia',
          email: 'gangstergastino@gmail.com',
          cnpj: cnpj + 9,
          type: 'RES',
          password_hash: bcrypt.hashSync(password, 8),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Mercadinho do Docs',
          email: 'crissytirocerto@gmail.com',
          cnpj: cnpj + 10,
          type: 'RES',
          password_hash: bcrypt.hashSync(password, 8),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Burger Queen',
          email: 'burgerqueen@gmail.com',
          cnpj: cnpj + 11,
          type: 'RES',
          password_hash: bcrypt.hashSync(password, 8),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    ),
  down: () => {},
};
