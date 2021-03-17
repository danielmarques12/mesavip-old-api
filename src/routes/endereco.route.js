import { Router } from 'express';

// import authMiddleware from '../app/middlewares/auth';

import EnderecoController from '../app/controllers/EnderecoController';

class EnderecoRouter {
  constructor() {
    this.router = Router();
    this.setRoutes();
  }

  setRoutes() {
    this.router.route('/enderecos').post(EnderecoController.store);
    this.router.route('/enderecos/:id').get(EnderecoController.show);
  }
}

export default new EnderecoRouter().router;
