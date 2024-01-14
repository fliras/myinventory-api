import { UserLoginController } from '@/presentation/controllers';
import { badRequest, serverError, ok } from '@/presentation/helpers';
import { Validator } from '@/presentation/contracts';
import { UserLogin } from '@/domain/contracts';

class UserLoginUsecaseStub implements UserLogin {
  result = 'any-token';
  async handle(): Promise<string | Error> {
    return this.result;
  }
}

class ValidatorStub implements Validator {
  validate(): Error | void {}
}

type sutTypes = {
  validator: ValidatorStub;
  userLoginUsecase: UserLoginUsecaseStub;
  sut: UserLoginController;
};

const makeSut = (): sutTypes => {
  const validator = new ValidatorStub();
  const userLoginUsecase = new UserLoginUsecaseStub();
  const sut = new UserLoginController(validator, userLoginUsecase);
  return {
    userLoginUsecase,
    validator,
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
  it('Should call validator with correct values', async () => {
    const { validator, sut } = makeSut();
    const validatorSpy = jest.spyOn(validator, 'validate');
    const request = mockRequest();
    await sut.handle(request);
    expect(validatorSpy).toHaveBeenCalledWith(request);
  });

  it('Should return badRequest if validator returns an error', async () => {
    const { validator, sut } = makeSut();
    const error = new Error();
    jest.spyOn(validator, 'validate').mockReturnValueOnce(error);
    const output = await sut.handle(mockRequest());
    expect(output).toEqual(badRequest(error));
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
