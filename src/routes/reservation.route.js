import { Router } from 'express';
import authMiddleware from '../app/middlewares/auth';
import ReservationController from '../app/controllers/ReservationController';

class ReservationRouter {
  constructor() {
    this.router = Router();
    this.setRoutes();
  }

  setRoutes() {
    this.router
      .route('/reservations/:restaurant_id')
      .post(authMiddleware, ReservationController.store);

    this.router
      .route('/reservations')
      .get(authMiddleware, ReservationController.index);

    this.router
      .route('/reservations/:id')
      .delete(authMiddleware, ReservationController.destroy);
  }
}

export default new ReservationRouter().router;
