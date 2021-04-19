import { Router } from 'express';

import ImagemController from '../app/controllers/Restaurante/ImagemController';

class RestauranteRouter {
  constructor() {
    this.router = Router();
    this.setRoutes();
  }

  setRoutes() {
    this.router.route('/imagens/:restaurante_id').post(ImagemController.show);
  }
}

export default new RestauranteRouter().router;
