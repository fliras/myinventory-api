import ValidationComposite from '@/presentation/validation/validation-composite';
import { Validator } from '@/presentation/contracts/validator';

class ValidatorStub implements Validator {
  validate(): Error | void {}
}

type SutTypes = {
  sut: ValidationComposite;
  validators: ValidatorStub[];
};

const makeSut = (): SutTypes => {
  const validators = [new ValidatorStub(), new ValidatorStub(), new ValidatorStub()];
  const sut = new ValidationComposite(validators);
  return {
    validators,
    sut,
  };
};

const mockInput = () => ({
  anyField: 'any-value',
});

describe('ValidationComposite', () => {
  it('Should return an error if any validator returns an error', () => {
    const { validators, sut } = makeSut();
    const error = new Error();
    jest.spyOn(validators[1], 'validate').mockReturnValueOnce(error);
    const output = sut.validate(mockInput());
    expect(output).toEqual(error);
  });
});

// chamar corretamente
// quebrar se algum quebrar
// retornar o primeiro erro que houver
// retornar void se nenhum retornar erro
