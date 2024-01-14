import { HashComparer, LoadUserByUsername } from '@/data/contracts';
import { UserLogin } from '@/domain/contracts';
import { UserNotFoundError } from '@/domain/errors';

export default class UserLoginUsecase implements UserLogin {
  constructor(
    private readonly loadUserByUsernameRepository: LoadUserByUsername,
    private readonly hashComparer: HashComparer,
  ) {}

  async handle(input: UserLogin.Input): Promise<UserLogin.Output> {
    const loadedUser = await this.loadUserByUsernameRepository.loadByUsername(input.username);
    if (!loadedUser) return new UserNotFoundError();
    await this.hashComparer.compare(input.password, loadedUser.hashedPassword);
    return '';
  }
}
