import { CheckUserByUsername } from '@/data/contracts';
import { UserLogin } from '@/domain/contracts';
import { UserNotFoundError } from '@/domain/errors';

export default class UserLoginUsecase implements UserLogin {
  constructor(private readonly checkUserByUsernameRepository: CheckUserByUsername) {}

  async handle(input: UserLogin.Input): Promise<UserLogin.Output> {
    const userExists = await this.checkUserByUsernameRepository.checkByUsername(input.username);
    if (!userExists) return new UserNotFoundError();
    return '';
  }
}
