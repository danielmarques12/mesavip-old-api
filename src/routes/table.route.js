import { Router } from 'express';
import authMiddleware from '../app/middlewares/auth';
import TableController from '../app/controllers/Restaurant/TableController';

class TableRouter {
  constructor() {
    this.router = Router();
    this.setRoutes();
  }

  setRoutes() {
    this.router
      .route('/tables/create')
      .post(authMiddleware, TableController.store);

    this.router.route('/tables/:restaurant_id').get(TableController.index);
  }
}

export default new TableRouter().router;
