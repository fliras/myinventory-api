import { ValidationComposite, RequiredFieldValidator } from '@/presentation/validation';

export const makeUserLoginControllerValidation = () => {
  return new ValidationComposite([
    new RequiredFieldValidator('username'),
    new RequiredFieldValidator('password'),
  ]);
};
