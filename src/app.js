import 'dotenv/config';
import express from 'express';
import Youch from 'youch';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import 'express-async-errors';
import * as sentry from '@sentry/node';
import fileupload from 'express-fileupload';
import sentryConfig from './config/sentry';

import routes from './routes';
import './database';

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
    this.exceptionHandler();

    if (process.env.NODE_ENV === 'production') sentry.init(sentryConfig);
  }

  routes() {
    this.server.use('/', routes);
    if (process.env.NODE_ENV === 'production')
      this.server.use(sentry.Handlers.errorHandler());
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use(cors());
    this.server.use(compression());
    this.server.use(helmet());
    this.server.use(fileupload({ useTempFiles: true }));
  }

  exceptionHandler() {
    this.server.use(async (error, request, response, next) => {
      if (process.env.NODE_ENV === 'development') {
        const errors = await new Youch(error, request).toJSON();
        return response.status(500).json(errors);
      }

      return response.status(500).json({ error: 'Internal server error' });
    });
  }
}

export default new App();
