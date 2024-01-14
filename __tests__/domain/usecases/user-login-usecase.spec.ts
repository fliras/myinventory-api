import UserLoginUsecase from '@/domain/usecases/user-login-usecase';
import { UserLogin } from '@/domain/contracts';
import { LoadUserByUsername } from '@/data/contracts';
import { UserNotFoundError } from '@/domain/errors';
import { StatusTypes, UserRoles } from '@/domain/helpers';

class LoadUserByUsernameRepositoryStub implements LoadUserByUsername {
  result = {
    id: 1,
    name: 'any-name',
    username: 'any-username',
    role: UserRoles.OPERATOR,
    status: StatusTypes.ACTIVE,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  async loadByUsername(): Promise<LoadUserByUsername.Output> {
    return this.result;
  }
}

type SutTypes = {
  loadUserByUsernameRepository: LoadUserByUsernameRepositoryStub;
  sut: UserLoginUsecase;
};

const makeSut = (): SutTypes => {
  const loadUserByUsernameRepository = new LoadUserByUsernameRepositoryStub();
  const sut = new UserLoginUsecase(loadUserByUsernameRepository);
  return {
    loadUserByUsernameRepository,
    sut,
  };
};

const mockInput = (): UserLogin.Input => ({
  username: 'any-username',
  password: 'any-password',
});

const mockThrow = () => {
  throw new Error();
};

describe('UserLoginUsecase', () => {
  it('Should call LoadUserByUsernameRepository with correct values', async () => {
    const { loadUserByUsernameRepository, sut } = makeSut();
    const checkUserSpy = jest.spyOn(loadUserByUsernameRepository, 'loadByUsername');
    const input = mockInput();
    await sut.handle(input);
    expect(checkUserSpy).toHaveBeenCalledWith(input.username);
  });

  it('Should return UserNotFoundError if LoadUserByUsernameRepository returns null', async () => {
    const { loadUserByUsernameRepository, sut } = makeSut();
    jest.spyOn(loadUserByUsernameRepository, 'loadByUsername').mockResolvedValueOnce(null);
    const output = await sut.handle(mockInput());
    expect(output).toEqual(new UserNotFoundError());
  });

  it('Should throw if LoadUserByUsernameRepository throws', async () => {
    const { loadUserByUsernameRepository, sut } = makeSut();
    jest.spyOn(loadUserByUsernameRepository, 'loadByUsername').mockImplementationOnce(mockThrow);
    const output = sut.handle(mockInput());
    expect(output).rejects.toThrow();
  });
});
