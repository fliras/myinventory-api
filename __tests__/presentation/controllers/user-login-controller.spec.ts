import UserLoginController from '@/presentation/controllers/user-login-controller';
import { badRequest } from '@/presentation/helpers/http';

describe('UserLoginController', () => {
  it('Should return badRequest if username is not provided', async () => {
    const sut = new UserLoginController();
    const output = await sut.handle({});
    expect(output).toEqual(badRequest(new Error('Missing param: username')));
  });
});
