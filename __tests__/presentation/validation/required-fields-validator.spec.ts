import RequiredFieldsValidator from '@/presentation/validation/required-fields-validator';
import MissingParamError from '@/presentation/errors/missing-param-error';

describe('RequiredFieldsValidator', () => {
  it('Should return MissingParamError if the specified field is not provided', () => {
    const sut = new RequiredFieldsValidator('any-field');
    const output = sut.validate({});
    expect(output).toEqual(new MissingParamError('any-field'));
  });
});
