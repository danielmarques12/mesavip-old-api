import { Router } from 'express';

import authMiddleware from '../app/middlewares/auth';

import MesaController from '../app/controllers/Restaurante/MesaController';

class MesaRouter {
  constructor() {
    this.router = Router();
    this.setRoutes();
  }

  setRoutes() {
    this.router
      .route('/mesas/criar')
      .post(authMiddleware, MesaController.store);

    this.router.route('/mesas/:restaurante_id').get(MesaController.index);
  }
}

export default new MesaRouter().router;
