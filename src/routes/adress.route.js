import { Router } from 'express';
// import authMiddleware from '../app/middlewares/auth';
import AdressController from '../app/controllers/AdressController';

class AdressRouter {
  constructor() {
    this.router = Router();
    this.setRoutes();
  }

  setRoutes() {
    this.router.route('/addresses').post(AdressController.store);
    this.router.route('/addresses/:id').get(AdressController.show);
  }
}

export default new AdressRouter().router;
