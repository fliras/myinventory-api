import jwt from 'jsonwebtoken';
import { Encrypter } from '@/data/contracts';

export class JwtAdapter implements Encrypter {
  constructor(private readonly secret: string) {}

  async encrypt(payload: any): Promise<string> {
    return jwt.sign(payload, this.secret);
  }
}
