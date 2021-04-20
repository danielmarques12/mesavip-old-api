require('dotenv/config');
const bcrypt = require('bcryptjs');

const password = process.env.SEQUELIZE_BULK_INSERT_PASSWORD;
const cpf = '12345678900';

module.exports = {
  up: (queryInterface) =>
    queryInterface.bulkInsert(
      'usuarios',
      [
        {
          nome: 'Daniel Marques',
          email: 'daniel@gmail.com',
          cpf,
          type: 'CLI',
          password_hash: bcrypt.hashSync(password, 8),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nome: 'Neymar Junior',
          email: 'neymar@gmail.com',
          cpf: cpf + 1,
          type: 'CLI',
          password_hash: bcrypt.hashSync(password, 8),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nome: 'Cristiano Ronaldo',
          email: 'ronaldo@gmail.com',
          cpf: cpf + 2,
          type: 'CLI',
          password_hash: bcrypt.hashSync(password, 8),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nome: 'Linus Torvalds',
          email: 'linus@gmail.com',
          cpf: cpf + 3,
          type: 'CLI',
          password_hash: bcrypt.hashSync(password, 8),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nome: 'Antonio Carlos',
          email: 'antonio@gmail.com',
          cpf: cpf + 4,
          type: 'CLI',
          password_hash: bcrypt.hashSync(password, 8),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nome: 'Claudia Marques',
          email: 'claudia@gmail.com',
          cpf: cpf + 5,
          type: 'CLI',
          password_hash: bcrypt.hashSync(password, 8),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nome: 'Hercilia Amaral',
          email: 'cilu@gmail.com',
          cpf: cpf + 6,
          type: 'CLI',
          password_hash: bcrypt.hashSync(password, 8),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nome: 'Marco Tomas',
          email: 'tomas@gmail.com',
          cpf: cpf + 7,
          type: 'CLI',
          password_hash: bcrypt.hashSync(password, 8),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nome: 'Iracy Albuquerque',
          email: 'iracy@gmail.com',
          cpf: cpf + 8,
          type: 'CLI',
          password_hash: bcrypt.hashSync(password, 8),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nome: 'Yolanda Miranda',
          email: 'yolanda@gmail.com',
          cpf: cpf + 9,
          type: 'CLI',
          password_hash: bcrypt.hashSync(password, 8),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    ),
  down: () => {},
};
