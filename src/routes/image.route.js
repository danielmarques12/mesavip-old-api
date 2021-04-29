import { Router } from 'express';
import ImageController from '../app/controllers/Restaurant/ImageController';

class ImageRouter {
  constructor() {
    this.router = Router();
    this.setRoutes();
  }

  setRoutes() {
    this.router.route('/images/:restaurant_id').post(ImageController.show);
  }
}

export default new ImageRouter().router;
