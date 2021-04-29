import { Router } from 'express';
import authMiddleware from '../app/middlewares/auth';
import UserController from '../app/controllers/UserController';

class UserRouter {
  constructor() {
    this.router = Router();
    this.setRoutes();
  }

  setRoutes() {
    this.router.route('/users').post(UserController.store);
    this.router.route('/users').put(authMiddleware, UserController.update);
    this.router
      .route('/users/:id')
      .delete(authMiddleware, UserController.delete);
  }
}

export default new UserRouter().router;
