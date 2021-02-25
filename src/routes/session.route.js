import { Router } from 'express';

import SessionController from '../app/controllers/SessionController';

class SessionRouter {
  constructor() {
    this.router = Router();
    this.setRoutes();
  }

  setRoutes() {
    this.router.route('/sessions').post(SessionController.store);
  }
}

export default new SessionRouter().router;
