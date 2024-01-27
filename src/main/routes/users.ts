import { Router } from 'express';
import { adaptExpressRoute } from '../adapters/express-route-adapter';
import { makeUserLoginController } from '../factories/presentation/controllers/user-login-controller';

export default (route: Router) => {
  route.post('/users/login', adaptExpressRoute(makeUserLoginController()));
};
