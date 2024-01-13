import UserLoginController from '@/presentation/controllers/user-login-controller';
import { badRequest } from '@/presentation/helpers/http';

class UserLoginUsecaseStub {
  async handle() {
    return {
      accessToken: 'any-token',
    };
  }
}

type sutTypes = {
  userLoginUsecase: UserLoginUsecaseStub;
  sut: UserLoginController;
};

const makeSut = (): sutTypes => {
  const userLoginUsecase = new UserLoginUsecaseStub();
  const sut = new UserLoginController(userLoginUsecase);
  return {
    userLoginUsecase,
    sut,
  };
};

describe('UserLoginController', () => {
  it('Should return badRequest if username is not provided', async () => {
    const { sut } = makeSut();
    const output = await sut.handle({ password: 'any-password' });
    expect(output).toEqual(badRequest(new Error('Missing param: username')));
  });

  it('Should return badRequest if password is not provided', async () => {
    const { sut } = makeSut();
    const output = await sut.handle({ username: 'any-username' });
    expect(output).toEqual(badRequest(new Error('Missing param: password')));
  });

  it('Should call userLoginUsecase with the correct values', async () => {
    const { userLoginUsecase, sut } = makeSut();
    const userLoginSpy = jest.spyOn(userLoginUsecase, 'handle');
    await sut.handle({ username: 'any-username', password: 'any-password' });
    expect(userLoginSpy).toHaveBeenCalledWith({
      username: 'any-username',
      password: 'any-password',
    });
  });
});
