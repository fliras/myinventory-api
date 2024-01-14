import { User } from '@/domain/entities/user';

export interface LoadUserByUsername {
  loadByUsername(username: string): Promise<LoadUserByUsername.Output>;
}

export namespace LoadUserByUsername {
  export type Output = (User & { hashedPassword: string }) | null;
}
