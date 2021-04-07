import { Router } from 'express';

import ImagemController from '../app/controllers/Restaurante/ImagemController';
import authMiddleware from '../app/middlewares/auth';

class RestauranteRouter {
  constructor() {
    this.router = Router();
    this.setRoutes();
  }

  setRoutes() {
    this.router.route('/imagens').post(authMiddleware, ImagemController.show);
  }
}

export default new RestauranteRouter().router;
