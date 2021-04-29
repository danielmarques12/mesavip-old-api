import Sequelize from 'sequelize';
import databaseConfig from '../config/database';

import User from '../app/models/User';
import Reservation from '../app/models/Reservation';
import File from '../app/models/File';
import Adress from '../app/models/Adress';

import Hour from '../app/models/Restaurant/Hour';
import Table from '../app/models/Restaurant/Table';
import Restaurant from '../app/models/Restaurant/Restaurant';
import Culinary from '../app/models/Restaurant/Culinary';
import Comment from '../app/models/Restaurant/Comment';
import Rate from '../app/models/Restaurant/Rate';

const models = [
  User,
  Reservation,
  Hour,
  Table,
  File,
  Adress,
  Restaurant,
  Culinary,
  Comment,
  Rate,
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
