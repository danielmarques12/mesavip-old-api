import { Router } from 'express';

import authMiddleware from '../app/middlewares/auth';

import UsuarioController from '../app/controllers/UsuarioController';

class UsuarioRouter {
  constructor() {
    this.router = Router();
    this.setRoutes();
  }

  setRoutes() {
    this.router.route('/usuarios').post(UsuarioController.store);
    this.router
      .route('/usuarios')
      .put(authMiddleware, UsuarioController.update);
    this.router
      .route('/usuarios/:id')
      .delete(authMiddleware, UsuarioController.delete);
  }
}

export default new UsuarioRouter().router;
