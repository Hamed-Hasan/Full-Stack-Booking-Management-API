import { ENUM_USER_ROLE } from '../../../enums/user';

export type IRegisterUser = {
  email: string;
  password: string;
};

export type ILoginUser = {
  email: string;
  password: string;
};

export type ILoginUserResponse = {
  accessToken: string;
  refreshToken?: string;
  needsPasswordChange: boolean | null;
};

export type IRefreshTokenResponse = {
  accessToken: string;
};

export type IVerifiedLoginUser = {
  userId: string;
  role: ENUM_USER_ROLE;
};

export type IChangePassword = {
  oldPassword: string;
  newPassword: string;
};
