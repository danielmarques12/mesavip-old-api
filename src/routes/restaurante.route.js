import { Router } from 'express';

import RestauranteController from '../app/controllers/Restaurante/RestauranteController';
import AvaliacaoController from '../app/controllers/Restaurante/AvaliacaoController';
import HorarioController from '../app/controllers/Restaurante/HorarioController';
import ImagemController from '../app/controllers/Restaurante/ImagemController';

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

    this.router
      .route('/restaurantes/imagens/:id')
      .get(ImagemController.getImagensGaleria);

    this.router
      .route('/restaurantes/banner/:id')
      .get(ImagemController.getBanner);
  }
}

export default new RestauranteRouter().router;
