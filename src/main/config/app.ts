import express, { Express } from 'express';
import setupRoutes from '@/main/routes';
import { bodyParser } from '@/main/middlewares/body-parser';

export default (): Express => {
  const app = express();
  app.use(bodyParser);
  setupRoutes(app);
  return app;
};
