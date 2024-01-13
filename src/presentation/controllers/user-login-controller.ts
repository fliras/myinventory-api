import { badRequest, serverError, ok } from '@/presentation/helpers/http';
import { Controller, HttpResponse } from '@/presentation/contracts';
import { Validator } from '../contracts/validator';

export default class UserLoginController implements Controller {
  constructor(
    private readonly validator: Validator,
    private readonly userLoginUsecase: any,
  ) {}

  async handle(request: any): Promise<HttpResponse> {
    try {
      const validation = this.validator.validate(request);
      if (validation instanceof Error) return badRequest(validation);
      const result = await this.userLoginUsecase.handle(request);
      if (result instanceof Error) return badRequest(result);
      return ok({ accessToken: result });
    } catch (error) {
      console.error(error);
      return serverError();
    }
  }
}
