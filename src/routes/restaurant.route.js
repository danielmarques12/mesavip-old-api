import { Router } from 'express';

import RestaurantController from '../app/controllers/Restaurant/RestaurantController';
import RatingController from '../app/controllers/Restaurant/RatingController';
import HourController from '../app/controllers/Restaurant/HourController';

class RestaurantRouter {
  constructor() {
    this.router = Router();
    this.setRoutes();
  }

  setRoutes() {
    this.router.route('/restaurant/:id').get(RestaurantController.show);
    this.router.route('/restaurants/list').get(RestaurantController.index);
    this.router.route('/restaurants/hours/:id').get(HourController.index);
    this.router.route('/restaurants/ratings/:id').get(RatingController.index);
  }
}

export default new RestaurantRouter().router;
