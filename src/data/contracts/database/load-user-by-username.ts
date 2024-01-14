import { UserEntity } from '@/domain/entities';

export interface LoadUserByUsername {
  loadByUsername(username: string): Promise<LoadUserByUsername.Output>;
}

export namespace LoadUserByUsername {
  export type Output = (UserEntity & { hashedPassword: string }) | null;
}
