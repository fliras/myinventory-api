import { badRequest, serverError, ok } from '@/presentation/helpers/http';
import { Controller, HttpResponse, Validator } from '@/presentation/contracts';
import { UserLogin } from '@/domain/contracts';

export default class UserLoginController implements Controller {
  constructor(
    private readonly validator: Validator,
    private readonly userLoginUsecase: UserLogin,
  ) {}

  async handle(request: UserLoginController.Request): Promise<HttpResponse> {
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

export namespace UserLoginController {
  export type Request = {
    username: string;
    password: string;
  };
}
