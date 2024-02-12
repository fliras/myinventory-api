import { AddUserController } from '@/presentation/controllers/add-user-controller';
import { Validator } from '@/presentation/contracts';
import { badRequest } from '@/presentation/helpers';

type SutTypes = {
  validator: Validator;
  sut: AddUserController;
};

const makeSut = (): SutTypes => {
  const validator: Validator = {
    validate: jest.fn(),
  };
  const sut = new AddUserController(validator);
  return {
    validator,
    sut,
  };
};

const mockRequest = (): AddUserController.Request => ({
  body: {
    name: 'any-name',
    username: 'any-username',
    password: 'any-password',
    role: 'any-role',
  },
});

describe('AddUserController', () => {
  it('Should call validator with the correct values', async () => {
    const { validator, sut } = makeSut();
    const request = mockRequest();
    await sut.handle(request);
    expect(validator.validate).toHaveBeenCalledWith(request);
  });

  it('Should return badRequest if validator returns an error', async () => {
    const { validator, sut } = makeSut();
    const error = new Error('random-error');
    jest.spyOn(validator, 'validate').mockReturnValue(error);
    const output = await sut.handle(mockRequest());
    expect(output).toEqual(badRequest(error));
  });
});
