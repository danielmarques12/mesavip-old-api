/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
import { Router } from 'express';
import { readdirSync } from 'fs';
import { basename, join } from 'path';

const initialize = () => {
  const extensions = ['.js'];

  const route = Router();

  readdirSync(__dirname)
    .filter(
      (file) =>
        file.indexOf('.') !== 0 &&
        file !== basename(__filename) &&
        extensions.includes(file.slice(-3))
    )
    .forEach((file) => {
      const fileRouter = require(join(__dirname, file));
      route.use(fileRouter.default);
    });

  return route;
};

export default initialize();
