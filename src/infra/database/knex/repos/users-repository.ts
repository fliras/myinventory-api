import { LoadUserByUsername } from '@/data/contracts';

export default class UsersRepository implements LoadUserByUsername {
  async loadByUsername(username: string): Promise<LoadUserByUsername.Output> {
    return null;
  }
}
