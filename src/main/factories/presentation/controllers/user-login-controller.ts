import { UserLoginController } from '@/presentation/controllers';
import { makeUserLoginControllerValidation } from '@/main/factories/presentation/validation/user-login-controller-validation';
import { makeUserLoginUsecase } from '@/main/factories/domain/usecases/user-login-usecase';

export const makeUserLoginController = () => {
  const validator = makeUserLoginControllerValidation();
  const userLoginUsecase = makeUserLoginUsecase();
  const userLoginController = new UserLoginController(validator, userLoginUsecase);
  return userLoginController;
};
