import Sequelize from 'sequelize';

import Usuario from '../app/models/Usuario';
import Agendamento from '../app/models/Agendamento';
import Horario from '../app/models/Horario';
import Mesa from '../app/models/Mesa';
import File from '../app/models/File';

import databaseConfig from '../config/database';

const models = [Usuario, Agendamento, Horario, Mesa, File];

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
