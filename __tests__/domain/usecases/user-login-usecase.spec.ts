import UserLoginUsecase from '@/domain/usecases/user-login-usecase';
import { UserLogin } from '@/domain/contracts';
import { LoadUserByUsername, HashComparer } from '@/data/contracts';
import { UserNotFoundError } from '@/domain/errors';
import { StatusTypes, UserRoles } from '@/domain/helpers';

class LoadUserByUsernameRepositoryStub implements LoadUserByUsername {
  result = {
    id: 1,
    name: 'any-name',
    username: 'any-username',
    hashedPassword: 'hashed-password',
    role: UserRoles.OPERATOR,
    status: StatusTypes.ACTIVE,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  async loadByUsername(): Promise<LoadUserByUsername.Output> {
    return this.result;
  }
}

class HashComparerStub implements HashComparer {
  async compare(): Promise<boolean> {
    return true;
  }
}

type SutTypes = {
  loadUserByUsernameRepository: LoadUserByUsernameRepositoryStub;
  hashComparer: HashComparerStub;
  sut: UserLoginUsecase;
};

const makeSut = (): SutTypes => {
  const loadUserByUsernameRepository = new LoadUserByUsernameRepositoryStub();
  const hashComparer = new HashComparerStub();
  const sut = new UserLoginUsecase(loadUserByUsernameRepository, hashComparer);
  return {
    loadUserByUsernameRepository,
    hashComparer,
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

  it('Should call hashComparer with the correct values', async () => {
    const { hashComparer, loadUserByUsernameRepository, sut } = makeSut();
    const hashComparerSpy = jest.spyOn(hashComparer, 'compare');
    const input = mockInput();
    await sut.handle(input);
    const { password } = input;
    const { hashedPassword } = loadUserByUsernameRepository.result;
    expect(hashComparerSpy).toHaveBeenCalledWith(password, hashedPassword);
  });
});
