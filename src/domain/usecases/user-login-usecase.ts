import { Encrypter, HashComparer, LoadUserByUsername } from '@/data/contracts';
import { UserLogin } from '@/domain/contracts';
import { InactiveUserError, InvalidPasswordError, UserNotFoundError } from '@/domain/errors';
import { StatusTypes } from '@/domain/helpers';

export class UserLoginUsecase implements UserLogin {
  constructor(
    private readonly loadUserByUsernameRepository: LoadUserByUsername,
    private readonly hashComparer: HashComparer,
    private readonly encrypter: Encrypter,
  ) {}

  async handle(input: UserLogin.Input): Promise<UserLogin.Output> {
    const loadedUser = await this.loadUserByUsernameRepository.loadByUsername(input.username);
    if (!loadedUser) return new UserNotFoundError();
    if (loadedUser.status === StatusTypes.INACTIVE) return new InactiveUserError();
    const isPasswordValid = await this.hashComparer.compare(
      input.password,
      loadedUser.hashedPassword,
    );
    if (!isPasswordValid) return new InvalidPasswordError();
    const payload = { id: loadedUser.id, role: loadedUser.role };
    const accessToken = await this.encrypter.encrypt(payload);
    return accessToken;
  }
}
