import { Router } from 'express';

import multer from 'multer';
import multerConfig from '../config/multer';

import authMiddleware from '../app/middlewares/auth';

import FileController from '../app/controllers/FileController';

class FileRouter {
  constructor() {
    this.router = Router();
    this.upload = multer(multerConfig);
    this.setRoutes();
  }

  setRoutes() {
    this.router
      .route('/files')
      .post(authMiddleware, this.upload.single('file'), FileController.store);
  }
}

export default new FileRouter().router;
