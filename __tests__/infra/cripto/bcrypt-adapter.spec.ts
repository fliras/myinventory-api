import bcrypt from 'bcryptjs';
import { BcryptAdapter } from '@/infra/cripto/bcrypt-adapter';

jest.mock('bcryptjs', () => ({
  async compare(): Promise<boolean> {
    return true
  }
}))

describe('BcryptAdapter', () => {
  describe('compare()', () => {
    it('Should call compare with the correct values', async () => {
      const sut = new BcryptAdapter();
      const bcryptSpy = jest.spyOn(bcrypt, 'compare');
      await sut.compare('any-text', 'any-hash');
      expect(bcryptSpy).toHaveBeenCalledWith('any-text', 'any-hash')
    })
  })
});