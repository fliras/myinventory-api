import { Validator } from '@/presentation/contracts';
import { MissingParamError } from '@/presentation/errors';

export class RequiredFieldValidator implements Validator {
  constructor(private readonly field: string) {}

  validate(input: any): Error | void {
    const field = this.field;
    if (!input[field]) return new MissingParamError(field);
  }
}
