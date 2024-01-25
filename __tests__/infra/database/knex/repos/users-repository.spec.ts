import db from '@/infra/database/knex/db';
import UsersRepository from '@/infra/database/knex/repos/users-repository';

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
  });
});
