// src/profile/profile.controller.ts

import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { ProfileService } from './profile.service';

const getProfiles = catchAsync(async (req: Request, res: Response) => {
  const result = await ProfileService.getProfiles();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Profiles fetched successfully.',
    data: result,
  });
});

const getProfile = catchAsync(async (req: Request, res: Response) => {
  const result = await ProfileService.getProfile(req.params.userId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Profile fetched successfully.',
    data: result,
  });
});

const updateProfile = catchAsync(async (req: Request, res: Response) => {
  const result = await ProfileService.updateProfile(
    req.params.userId,
    req.body
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Profile updated successfully.',
    data: result,
  });
});

const deleteProfile = catchAsync(async (req: Request, res: Response) => {
  const result = await ProfileService.deleteProfile(req.params.userId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Profile deleted successfully.',
    data: result,
  });
});

export const ProfileController = {
  getProfiles,
  getProfile,
  updateProfile,
  deleteProfile,
};
