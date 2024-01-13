import { badRequest, serverError, ok } from '@/presentation/helpers/http';

export default class UserLoginController {
  constructor(private readonly userLoginUsecase: any) {}

  async handle(request: any) {
    try {
      if (!request.username) return badRequest(new Error('Missing param: username'));
      if (!request.password) return badRequest(new Error('Missing param: password'));
      const accessToken = await this.userLoginUsecase.handle(request);
      return ok({ accessToken });
    } catch (error) {
      return serverError();
    }
  }
}
