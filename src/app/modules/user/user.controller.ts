import { Request, Response } from 'express';
import fs from 'fs';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { UserService, UserUpdateInput } from './user.service';
import config from '../../../config';
import {
  UserFilterableFields,
  UserSearchableFields,
  UserSortableFields,
} from './user.constant';
import pick from '../../../shared/pick';

export const UserController = {
  getAllUsers: catchAsync(async (req: Request, res: Response) => {
    const options = pick(req.query, ['page', 'limit', 'sortBy', 'sortOrder']);
    const filters = pick(req.query, [
      ...UserSortableFields,
      ...UserFilterableFields,
      ...UserSearchableFields,
    ]);

    const result = await UserService.listAllUsers(options, filters);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      meta: result.meta,
      data: result.data,
    });
  }),

  getUserById: catchAsync(async (req: Request, res: Response) => {
    const user = await UserService.getUserById(req.params.id);
    sendResponse(res, { statusCode: 200, success: true, data: user });
  }),

  updateUser: catchAsync(async (req: Request, res: Response) => {
    // const userData: UserUpdateInput = JSON.parse(req.body.data); // this line for multer

    const userData: UserUpdateInput = req.body.data;

    let profileImage;

    if (req.file) {
      const uploadResult = await config.cloudinary.uploader.upload(
        req.file.path
      );
      profileImage = uploadResult.secure_url;
      fs.unlink(req.file.path, err => {
        if (err) {
          console.error('Error deleting file:', err);
        }
      });
    }
    const updatedUser = await UserService.updateUser(
      req.params.id,
      userData,
      profileImage
    );
    sendResponse(res, { statusCode: 200, success: true, data: updatedUser });
  }),

  deleteUser: catchAsync(async (req: Request, res: Response) => {
    await UserService.deleteUser(req.params.id);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'User deleted successfully.',
    });
  }),
};
