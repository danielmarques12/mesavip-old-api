import { Router } from 'express';

import authMiddleware from '../app/middlewares/auth';

import UsuarioController from '../app/controllers/UsuarioController';

class UsuarioRouter {
  constructor() {
    this.router = Router();
    this.setRoutes();
  }

  setRoutes() {
    this.router.route('/usuarios').post(UsuarioController.storeUser);
    this.router
      .route('/usuarios/endereco')
      .post(authMiddleware, UsuarioController.storeEndereco);
  }
}

export default new UsuarioRouter().router;
