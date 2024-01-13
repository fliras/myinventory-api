import RequiredFieldsValidator from '@/presentation/validation/required-fields-validator';
import MissingParamError from '@/presentation/errors/missing-param-error';

describe('RequiredFieldsValidator', () => {
  it('Should return MissingParamError if the specified field is not provided', () => {
    const sut = new RequiredFieldsValidator('requiredField');
    const output = sut.validate({});
    expect(output).toEqual(new MissingParamError('requiredField'));
  });

  it('Should return void if the specified field is provided', () => {
    const sut = new RequiredFieldsValidator('requiredField');
    const output = sut.validate({ requiredField: 'any-value' });
    expect(output).toBe(undefined);
  });
});
