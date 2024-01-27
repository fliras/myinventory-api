import UsersRepository from '@/infra/database/knex/repos/users-repository';

export const makeUsersRepository = () => new UsersRepository();
