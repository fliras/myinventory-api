import { CheckUserByUsername } from '@/data/contracts';
import { UserLogin } from '@/domain/contracts';

export default class UserLoginUsecase implements UserLogin {
  constructor(private readonly checkUserByUsernameRepository: CheckUserByUsername) {}

  async handle(input: UserLogin.Input): Promise<UserLogin.Output> {
    await this.checkUserByUsernameRepository.checkByUsername(input.username);
    return '';
  }
}
