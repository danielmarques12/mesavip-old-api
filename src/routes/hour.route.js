import { Router } from 'express';
import authMiddleware from '../app/middlewares/auth';
import HourController from '../app/controllers/Restaurant/HourController';

class HourRouter {
  constructor() {
    this.router = Router();
    this.setRoutes();
  }

  setRoutes() {
    this.router.route('/hours').post(authMiddleware, HourController.store);
  }
}

export default new HourRouter().router;
