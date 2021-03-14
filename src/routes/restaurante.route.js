import { Router } from 'express';

import RestauranteController from '../app/controllers/RestauranteController';

class RestauranteRouter {
  constructor() {
    this.router = Router();
    this.setRoutes();
  }

  setRoutes() {
    this.router
      .route('/restaurantes')
      .get(RestauranteController.listarRestaurantes);

    this.router
      .route('/restaurantes/adicionar/culinaria/:id')
      .get(RestauranteController.adicionarCulinaria);
  }
}

export default new RestauranteRouter().router;
