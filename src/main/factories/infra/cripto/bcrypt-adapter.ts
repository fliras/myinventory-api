import { BcryptAdapter } from '@/infra/cripto/bcrypt-adapter';

export const makeBcryptAdapter = () => new BcryptAdapter();
