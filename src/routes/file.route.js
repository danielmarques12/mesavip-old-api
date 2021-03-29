import { Router } from 'express';
import authMiddleware from '../app/middlewares/auth';
import FileController from '../app/controllers/FileController';

class FileRouter {
  constructor() {
    this.router = Router();
    this.setRoutes();
  }

  setRoutes() {
    this.router.route('/files').post(authMiddleware, FileController.store);
  }
}

export default new FileRouter().router;
