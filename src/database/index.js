import Sequelize from 'sequelize';

import Usuario from '../app/models/Usuario';
import Agendamento from '../app/models/Agendamento';
import Horario from '../app/models/Restaurante/Horario';
import Mesa from '../app/models/Restaurante/Mesa';
import File from '../app/models/File';
import Endereco from '../app/models/Endereco';

import Restaurante from '../app/models/Restaurante/Restaurante';
import Culinaria from '../app/models/Restaurante/Culinaria';
import Comentario from '../app/models/Restaurante/Comentario';
import Nota from '../app/models/Restaurante/Nota';

import databaseConfig from '../config/database';

const models = [
  Usuario,
  Agendamento,
  Horario,
  Mesa,
  File,
  Endereco,
  Restaurante,
  Culinaria,
  Comentario,
  Nota,
];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models)
      );
  }
}

export default new Database();
