import bcrypt from 'bcrypt';
import config from '../../../config';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import {
  IChangePassword,
  ILoginUser,
  ILoginUserResponse,
  IRefreshTokenResponse,
  IRegisterUser,
} from './auth.Interfaces';
import prisma from '../../../shared/prisma';

const registerUser = async (payload: IRegisterUser): Promise<void> => {
  const { email, password } = payload;

  // Check if user already exists
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    throw new ApiError(httpStatus.CONFLICT, 'Email already registered');
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create new user
  await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });
};

const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { email, password } = payload;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
  }

  const accessToken = jwtHelpers.createToken(
    { userId: user.id },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string,
    user.role // Pass the user's role here
  );

  const refreshToken = jwtHelpers.createToken(
    { userId: user.id },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string,
    user.role // Pass the user's role here
  );

  return {
    accessToken,
    refreshToken,
    needsPasswordChange: user.needsPasswordChange,
  };
};

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  let verifiedToken = null;
  try {
    verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secret as Secret
    );
  } catch (err) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token');
  }

  const user = await prisma.user.findUnique({
    where: { id: verifiedToken.userId },
  });
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }
  console.log(user.role);

  const newAccessToken = jwtHelpers.createToken(
    { userId: user.id },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string,
    user.role
  );

  return {
    accessToken: newAccessToken,
  };
};

const changePassword = async (
  userId: string,
  payload: IChangePassword
): Promise<void> => {
  const { oldPassword, newPassword } = payload;

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  const isOldPasswordMatch = await bcrypt.compare(oldPassword, user.password);
  if (!isOldPasswordMatch) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Old Password is incorrect');
  }

  const newHashedPassword = await bcrypt.hash(newPassword, 10);

  await prisma.user.update({
    where: { id: userId },
    data: {
      password: newHashedPassword,
      needsPasswordChange: false,
    },
  });
};

export const AuthService = {
  registerUser,
  loginUser,
  refreshToken,
  changePassword,
};
