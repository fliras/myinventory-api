import db from '@/infra/database/knex/db';
import UsersRepository from '@/infra/database/knex/repos/users-repository';

const mockUser = async () => {
  const [newUser] = await db('users')
    .insert({
      name: 'user',
      username: 'username',
      password: 'hashed-password',
      status: 'ACTIVE',
      role: 'OPERATOR',
    })
    .returning('*');
  return newUser;
};

describe('UsersRepository', () => {
  beforeEach(async () => {
    await db('users').del();
  });

  afterAll(async () => {
    await db.destroy();
  });

  describe('loadByUsername()', () => {
    it('Should return null if the user does not exist', async () => {
      const sut = new UsersRepository();
      const user = await sut.loadByUsername('any-user');
      expect(user).toBeNull();
    });

    it('Should return an user if it exists', async () => {
      const sut = new UsersRepository();
      const mockedUser = await mockUser();
      const loadedUser = await sut.loadByUsername(mockedUser.username);
      expect(loadedUser?.id).toBe(mockedUser.user_id);
    });
  });
});
