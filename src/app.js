import express from 'express';
import Youch from 'youch';
import cors from 'cors';
import 'express-async-errors';

import routes from './routes';
import './database';

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  routes() {
    this.server.use('/', routes);
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use(cors());
  }

  exceptionHandler() {
    this.server.use(async (error, request, response, next) => {
      const errors = await new Youch(error, request).toJSON();

      return response.status(500).json(errors);
    });
  }
}

export default new App();
