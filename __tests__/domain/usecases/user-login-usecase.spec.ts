import { UserLoginUsecase } from '@/domain/usecases';
import { UserLogin } from '@/domain/contracts';
import { LoadUserByUsername, HashComparer, Encrypter } from '@/data/contracts';
import { UserNotFoundError, InvalidPasswordError, InactiveUserError } from '@/domain/errors';
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

class EncrypterStub implements Encrypter {
  result = 'any-token';
  async encrypt() {
    return this.result;
  }
}

type SutTypes = {
  loadUserByUsernameRepository: LoadUserByUsernameRepositoryStub;
  hashComparer: HashComparerStub;
  encrypter: EncrypterStub;
  sut: UserLoginUsecase;
};

const makeSut = (): SutTypes => {
  const loadUserByUsernameRepository = new LoadUserByUsernameRepositoryStub();
  const hashComparer = new HashComparerStub();
  const encrypter = new EncrypterStub();
  const sut = new UserLoginUsecase(loadUserByUsernameRepository, hashComparer, encrypter);
  return {
    loadUserByUsernameRepository,
    hashComparer,
    encrypter,
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

  it('Should return InactiveUserError if the loaded user is inactive', async () => {
    const { loadUserByUsernameRepository, sut } = makeSut();
    jest
      .spyOn(loadUserByUsernameRepository, 'loadByUsername')
      .mockResolvedValueOnce({
        ...loadUserByUsernameRepository.result,
        status: StatusTypes.INACTIVE,
      });
    const output = await sut.handle(mockInput());
    expect(output).toEqual(new InactiveUserError());
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

  it('Should return InvalidPasswordError if hashComparer returns false', async () => {
    const { hashComparer, sut } = makeSut();
    jest.spyOn(hashComparer, 'compare').mockResolvedValueOnce(false);
    const output = await sut.handle(mockInput());
    expect(output).toEqual(new InvalidPasswordError());
  });

  it('Should throw if hashComparer throws', async () => {
    const { hashComparer, sut } = makeSut();
    jest.spyOn(hashComparer, 'compare').mockImplementationOnce(mockThrow);
    const output = sut.handle(mockInput());
    expect(output).rejects.toThrow();
  });

  it('Should call encrypter with the correct values', async () => {
    const { encrypter, loadUserByUsernameRepository, sut } = makeSut();
    const encrypterSpy = jest.spyOn(encrypter, 'encrypt');
    const input = mockInput();
    await sut.handle(input);
    const { id, role } = loadUserByUsernameRepository.result;
    expect(encrypterSpy).toHaveBeenCalledWith({ id, role });
  });

  it('Should throw if encrypter throws', async () => {
    const { encrypter, sut } = makeSut();
    jest.spyOn(encrypter, 'encrypt').mockImplementationOnce(mockThrow);
    const output = sut.handle(mockInput());
    expect(output).rejects.toThrow();
  });

  it('Should return a token on success', async () => {
    const { encrypter, sut } = makeSut();
    const output = await sut.handle(mockInput());
    expect(output).toBe(encrypter.result);
  });
});
