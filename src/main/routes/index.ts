import setupUsersRoutes from './users';
import { Express, Router } from 'express';

export default (app: Express) => {
  const router = Router();
  setupUsersRoutes(router);
  app.use('/api', router);
};
