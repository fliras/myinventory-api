import { JwtAdapter } from '@/infra/cripto/jwt-adapter';
import jwt from 'jsonwebtoken';

jest.mock('jsonwebtoken', () => ({
  async sign(): Promise<string> {
    return 'any-token';
  },
}));

type SutTypes = {
  secret: string;
  sut: JwtAdapter;
};

const makeSut = (): SutTypes => {
  const secret = 'any-secret';
  const sut = new JwtAdapter(secret);
  return {
    secret,
    sut,
  };
};

const mockThrow = () => {
  throw new Error();
};

describe('JwtAdapter', () => {
  describe('encrypt()', () => {
    it('Should call jwt.sign with the correct values', async () => {
      const { secret, sut } = makeSut();
      const signSpy = jest.spyOn(jwt, 'sign');
      const payload = { id: 666 };
      await sut.encrypt(payload);
      expect(signSpy).toHaveBeenCalledWith(payload, secret);
    });

    it('Should throw if jwt.sign throws', async () => {
      const { sut } = makeSut();
      jest.spyOn(jwt, 'sign').mockImplementationOnce(mockThrow);
      const output = sut.encrypt({ id: 666 });
      expect(output).rejects.toThrow();
    });
  });
});
