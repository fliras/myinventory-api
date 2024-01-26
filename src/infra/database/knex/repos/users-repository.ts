import { LoadUserByUsername } from '@/data/contracts';
import db from '../db';

export default class UsersRepository implements LoadUserByUsername {
  async loadByUsername(username: string): Promise<LoadUserByUsername.Output> {
    const user = await db('users').first().where({ username });
    return (user && this.map(user)) || null;
  }

  private map(user: any): LoadUserByUsername.Output {
    return {
      id: user.user_id,
      name: user.name,
      username: user.username,
      hashedPassword: user.password,
      status: user.status,
      createdAt: user.created_at,
      updatedAt: user.updated_at,
      role: user.role,
    };
  }
}
