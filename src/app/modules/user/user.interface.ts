/* eslint-disable no-unused-vars */
export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
  SUPER_ADMIN = 'superAdmin',
}

export type IUser = {
  id?: string;
  email: string;
  password: string;
  needsPasswordChange?: boolean;
  role: UserRole;
};
