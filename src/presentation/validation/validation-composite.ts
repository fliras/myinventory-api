import { Validator } from '@/presentation/contracts';

export class ValidationComposite implements Validator {
  constructor(private readonly validators: Validator[]) {}

  validate(input: any): Error | void {
    for (const validator of this.validators) {
      const validation = validator.validate(input);
      if (validation instanceof Error) return validation;
    }
  }
}
