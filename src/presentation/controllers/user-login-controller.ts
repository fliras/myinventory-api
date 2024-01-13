import { badRequest } from '@/presentation/helpers/http';

export default class UserLoginController {
  async handle(request: any) {
    if (!request.username) return badRequest(new Error('Missing param: username'));
    if (!request.password) return badRequest(new Error('Missing param: password'));
  }
}
