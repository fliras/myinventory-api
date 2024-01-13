import { Validator } from '@/presentation/contracts/validator';
import MissingParamError from '../errors/missing-param-error';

export default class RequiredFieldsValidator implements Validator {
  constructor(private readonly field: string) {}

  validate(input: any): Error | void {
    const field = this.field;
    if (!input[field]) return new MissingParamError(field);
  }
}
