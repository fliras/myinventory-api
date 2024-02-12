import { Controller, HttpResponse, Validator } from '@/presentation/contracts';
import { noContent } from '../helpers';

export class AddUserController implements Controller {
  constructor(private readonly validator: Validator) {}

  async handle(request: AddUserController.Request): Promise<HttpResponse> {
    this.validator.validate(request);
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
