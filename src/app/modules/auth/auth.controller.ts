import { Request, Response } from 'express';
import httpStatus from 'http-status';
import config from '../../../config';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { AuthService } from './auth.service';
import ApiError from '../../../errors/ApiError';
import { ILoginUserResponse, IRefreshTokenResponse } from './auth.Interfaces';
import jwt from 'jsonwebtoken';

const registerUser = catchAsync(async (req: Request, res: Response) => {
  const { ...registerData } = req.body;
  await AuthService.registerUser(registerData);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'User registered successfully!',
    data: registerData,
  });
});

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body;
  const result = await AuthService.loginUser(loginData);
  const { refreshToken } = result;

  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };

  res.cookie('refreshToken', refreshToken, cookieOptions);

  sendResponse<ILoginUserResponse>(res, {
    statusCode: 200,
    success: true,
    message: 'User logged in successfully !',
    data: result,
  });
});

const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;

  const result = await AuthService.refreshToken(refreshToken);

  sendResponse<IRefreshTokenResponse>(res, {
    statusCode: 200,
    success: true,
    message: 'Token refreshed successfully !',
    data: result,
  });
});

const changePassword = catchAsync(async (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'User not authorized');
  }

  const token = authHeader.split(' ')[1];

  let userId: string; // Change the type to string
  try {
    const decodedToken = jwt.verify(token, config.jwt.secret as string) as any;
    console.log(decodedToken);
    userId = decodedToken.userId.toString();
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'User not authorized');
  }

  const { ...passwordData } = req.body;

  await AuthService.changePassword(userId, passwordData);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Password changed successfully !',
  });
});

export const AuthController = {
  registerUser,
  loginUser,
  refreshToken,
  changePassword,
};
