import bcrypt from 'bcryptjs';
import { BcryptAdapter } from '@/infra/cripto/bcrypt-adapter';

jest.mock('bcryptjs', () => ({
  async compare(): Promise<boolean> {
    return true;
  },
}));

const mockThrow = () => {
  throw new Error();
};

describe('BcryptAdapter', () => {
  describe('compare()', () => {
    it('Should call compare with the correct values', async () => {
      const sut = new BcryptAdapter();
      const bcryptSpy = jest.spyOn(bcrypt, 'compare');
      await sut.compare('any-text', 'any-hash');
      expect(bcryptSpy).toHaveBeenCalledWith('any-text', 'any-hash');
    });

    it('Should throw if bcrypt.compare throws', async () => {
      const sut = new BcryptAdapter();
      jest.spyOn(bcrypt, 'compare').mockImplementationOnce(mockThrow);
      const output = sut.compare('any-text', 'any-hash');
      expect(output).rejects.toThrow();
    });

    describe('Should return a boolean', () => {
      it('when bcrypt.compare returns false', async () => {
        const sut = new BcryptAdapter();
        jest.spyOn(bcrypt, 'compare').mockImplementationOnce(() => false);
        const output = await sut.compare('any-text', 'any-hash');
        expect(output).toBe(false);
      });
    });
  });
});
