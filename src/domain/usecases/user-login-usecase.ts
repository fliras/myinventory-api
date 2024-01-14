import { LoadUserByUsername } from '@/data/contracts';
import { UserLogin } from '@/domain/contracts';
import { UserNotFoundError } from '@/domain/errors';

export default class UserLoginUsecase implements UserLogin {
  constructor(private readonly loadUserByUsernameRepository: LoadUserByUsername) {}

  async handle(input: UserLogin.Input): Promise<UserLogin.Output> {
    const userExists = await this.loadUserByUsernameRepository.loadByUsername(input.username);
    if (!userExists) return new UserNotFoundError();
    return '';
  }
}
