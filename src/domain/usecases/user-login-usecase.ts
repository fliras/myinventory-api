import { UserLogin } from '@/domain/contracts';

export default class UserLoginUsecase implements UserLogin {
  constructor(private readonly checkUserByUsernameRepository: any) {}

  async handle(input: UserLogin.Input): Promise<UserLogin.Output> {
    await this.checkUserByUsernameRepository.checkByUsername(input.username);
    return ''
  }
}
