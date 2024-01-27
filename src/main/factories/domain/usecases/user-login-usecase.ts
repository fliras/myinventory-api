import { UserLoginUsecase } from '@/domain/usecases';
import { makeBcryptAdapter } from '@/main/factories/infra/cripto/bcrypt-adapter';
import { makeJwtAdapter } from '@/main/factories/infra/cripto/jwt-adapter';
import { makeUsersRepository } from '@/main/factories/infra/database/repos/users-repository';

export const makeUserLoginUsecase = () => {
  const bcryptAdapter = makeBcryptAdapter();
  const jwtAdapter = makeJwtAdapter();
  const usersRepository = makeUsersRepository();
  return new UserLoginUsecase(usersRepository, bcryptAdapter, jwtAdapter);
};
