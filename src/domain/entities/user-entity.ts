import { StatusTypes, UserRoles } from '@/domain/helpers';

export type UserEntity = {
  readonly id: number;
  name: string;
  username: string;
  status: StatusTypes;
  role: UserRoles;
  readonly createdAt: Date;
  updatedAt: Date;
};
