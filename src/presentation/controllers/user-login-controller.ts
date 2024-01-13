import { badRequest, serverError, ok } from '@/presentation/helpers/http';
import MissingParamError from '@/presentation/errors/missing-param-error';
import { Controller, HttpResponse } from '@/presentation/contracts';

export default class UserLoginController implements Controller {
  constructor(private readonly userLoginUsecase: any) {}

  async handle(request: any): Promise<HttpResponse> {
    try {
      if (!request.username) return badRequest(new MissingParamError('username'));
      if (!request.password) return badRequest(new MissingParamError('password'));
      const result = await this.userLoginUsecase.handle(request);
      if (result instanceof Error) return badRequest(result);
      return ok({ accessToken: result });
    } catch (error) {
      return serverError();
    }
  }
}
