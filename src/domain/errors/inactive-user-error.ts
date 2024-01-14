export class InactiveUserError extends Error {
  constructor() {
    super('User inactive');
    this.name = 'InactiveUserError';
  }
}
