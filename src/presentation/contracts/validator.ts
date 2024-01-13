export interface Validator<T = any> {
  validate(input: T): Error | void
}