import UserLoginController from '@/presentation/controllers/user-login-controller';
import { badRequest, serverError, ok } from '@/presentation/helpers/http';
import MissingParamError from '@/presentation/errors/missing-param-error';

class UserLoginUsecaseStub {
  result = 'any-token';
  async handle(): Promise<string | Error> {
    return this.result;
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

const mockRequest = () => ({
  username: 'any-username',
  password: 'any-password',
});

const mockThrow = () => {
  throw new Error();
};

describe('UserLoginController', () => {
  it('Should return badRequest if username is not provided', async () => {
    const { sut } = makeSut();
    const { password } = mockRequest();
    const output = await sut.handle({ password });
    expect(output).toEqual(badRequest(new MissingParamError('username')));
  });

  it('Should return badRequest if password is not provided', async () => {
    const { sut } = makeSut();
    const { username } = mockRequest();
    const output = await sut.handle({ username });
    expect(output).toEqual(badRequest(new MissingParamError('password')));
  });

  it('Should call userLoginUsecase with the correct values', async () => {
    const { userLoginUsecase, sut } = makeSut();
    const userLoginSpy = jest.spyOn(userLoginUsecase, 'handle');
    const request = mockRequest();
    await sut.handle(request);
    expect(userLoginSpy).toHaveBeenCalledWith(request);
  });

  it('Should return badRequest if userLoginUsecase returns an error', async () => {
    const { userLoginUsecase, sut } = makeSut();
    const error = new Error();
    jest.spyOn(userLoginUsecase, 'handle').mockResolvedValueOnce(new Error());
    const output = await sut.handle(mockRequest());
    expect(output).toEqual(badRequest(error));
  });

  it('Should return serverError if userLoginUsecase throws', async () => {
    const { userLoginUsecase, sut } = makeSut();
    jest.spyOn(userLoginUsecase, 'handle').mockImplementationOnce(mockThrow);
    const output = await sut.handle(mockRequest());
    expect(output).toEqual(serverError());
  });

  it('Should return ok on success', async () => {
    const { userLoginUsecase, sut } = makeSut();
    const output = await sut.handle(mockRequest());
    const expectedOutput = ok({ accessToken: userLoginUsecase.result });
    expect(output).toEqual(expectedOutput);
  });
});
