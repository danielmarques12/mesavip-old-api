import { Router } from 'express';

import authMiddleware from '../app/middlewares/auth';

import AgendamentoController from '../app/controllers/AgendamentoController';

class AgendamentoRouter {
  constructor() {
    this.router = Router();
    this.setRoutes();
  }

  setRoutes() {
    this.router
      .route('/agendamentos/:restaurante_id')
      .post(authMiddleware, AgendamentoController.store);

    this.router
      .route('/agendamentos')
      .get(authMiddleware, AgendamentoController.index);

    this.router
      .route('/agendamentos/:id')
      .delete(authMiddleware, AgendamentoController.destroy);
  }
}

export default new AgendamentoRouter().router;
