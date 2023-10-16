import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { UserService } from './user.service';


export const UserController = {
    getAllUsers: catchAsync(async (req: Request, res: Response) => {
        const users = await UserService.getAllUsers();
        sendResponse(res, { statusCode: 200, success: true, data: users });
    }),

    getUserById: catchAsync(async (req: Request, res: Response) => {
        const user = await UserService.getUserById(req.params.id);
        sendResponse(res, { statusCode: 200, success: true, data: user });
    }),

    updateUser: catchAsync(async (req: Request, res: Response) => {
        const updatedUser = await UserService.updateUser(req.params.id, req.body);
        sendResponse(res, { statusCode: 200, success: true, data: updatedUser });
    }),

    deleteUser: catchAsync(async (req: Request, res: Response) => {
        await UserService.deleteUser(req.params.id);
        sendResponse(res, { statusCode: 200, success: true, message: 'User deleted successfully.' });
    }),
};
