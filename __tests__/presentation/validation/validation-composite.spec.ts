import { ValidationComposite } from '@/presentation/validation';
import { Validator } from '@/presentation/contracts';

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

const mockThrow = () => {
  throw new Error();
};

describe('ValidationComposite', () => {
  it('Should return an error if any validator returns an error', () => {
    const { validators, sut } = makeSut();
    const error = new Error();
    jest.spyOn(validators[1], 'validate').mockReturnValueOnce(error);
    const output = sut.validate(mockInput());
    expect(output).toEqual(error);
  });

  it('Should throw if any validator throws', () => {
    const { validators, sut } = makeSut();
    jest.spyOn(validators[1], 'validate').mockImplementationOnce(mockThrow);
    expect(sut.validate).toThrow();
  });

  it('Shouldnt return void if no validator returns an error', () => {
    const { sut } = makeSut();
    const output = sut.validate(mockInput());
    expect(output).toEqual(undefined);
  });
});
