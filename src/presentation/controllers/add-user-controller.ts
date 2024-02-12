import { Controller, HttpResponse, Validator } from '@/presentation/contracts';
import { badRequest, noContent } from '@/presentation/helpers';

export class AddUserController implements Controller {
  constructor(private readonly validator: Validator) {}

  async handle(request: AddUserController.Request): Promise<HttpResponse> {
    const validation = this.validator.validate(request);
    if (validation instanceof Error) return badRequest(validation);
    return noContent();
  }
}

export namespace AddUserController {
  export type Request = {
    body: {
      name: string;
      username: string;
      password: string;
      role: string;
    };
  };
}
