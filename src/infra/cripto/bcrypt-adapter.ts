import bcrypt from 'bcryptjs';
import { HashComparer } from '@/data/contracts';

export class BcryptAdapter implements HashComparer {
  async compare(plaintext: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(plaintext, hash);
  }
}
