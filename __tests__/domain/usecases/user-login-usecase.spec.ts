import UserLoginUsecase from '@/domain/usecases/user-login-usecase';
import { UserLogin } from '@/domain/contracts';
import { CheckUserByUsername } from '@/data/contracts';
import { UserNotFoundError } from '@/domain/errors';

class CheckUserByUsernameRepositoryStub implements CheckUserByUsername {
  async checkByUsername() {
    return true;
  }
}

type SutTypes = {
  checkUserByUsernameRepository: CheckUserByUsernameRepositoryStub;
  sut: UserLoginUsecase;
};

const makeSut = (): SutTypes => {
  const checkUserByUsernameRepository = new CheckUserByUsernameRepositoryStub();
  const sut = new UserLoginUsecase(checkUserByUsernameRepository);
  return {
    checkUserByUsernameRepository,
    sut,
  };
};

const mockInput = (): UserLogin.Input => ({
  username: 'any-username',
  password: 'any-password',
});

describe('UserLoginUsecase', () => {
  it('Should call CheckUserByUsernameRepository with correct values', async () => {
    const { checkUserByUsernameRepository, sut } = makeSut();
    const checkUserSpy = jest.spyOn(checkUserByUsernameRepository, 'checkByUsername');
    const input = mockInput();
    await sut.handle(input);
    expect(checkUserSpy).toHaveBeenCalledWith(input.username);
  });

  it('Should return UserNotFoundError if CheckUserByUsernameRepository returns false', async () => {
    const { checkUserByUsernameRepository, sut } = makeSut();
    jest.spyOn(checkUserByUsernameRepository, 'checkByUsername').mockResolvedValueOnce(false);
    const output = await sut.handle(mockInput());
    expect(output).toEqual(new UserNotFoundError());
  });
});
