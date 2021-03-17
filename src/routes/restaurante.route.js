import { Router } from 'express';

import RestauranteController from '../app/controllers/Restaurante/RestauranteController';
import AvaliacaoController from '../app/controllers/Restaurante/AvaliacaoController';
import HorarioController from '../app/controllers/Restaurante/HorarioController';

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
      .route('/restaurantes/:id')
      .get(RestauranteController.restauranteInfo);

    this.router
      .route('/restaurantes/horarios/:id')
      .get(HorarioController.index);

    this.router
      .route('/restaurantes/avaliacoes/:id')
      .get(AvaliacaoController.index);
  }
}

export default new RestauranteRouter().router;
