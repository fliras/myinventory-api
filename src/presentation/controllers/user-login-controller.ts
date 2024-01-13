import { badRequest } from '@/presentation/helpers/http';

export default class UserLoginController {
  async handle(request: any) {
    if (!request.username) return badRequest(new Error('Missing param: username'));
  }
}
