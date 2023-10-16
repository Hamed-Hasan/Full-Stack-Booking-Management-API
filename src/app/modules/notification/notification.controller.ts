import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { NotificationService } from './notification.service';

const createNotification = catchAsync(async (req: Request, res: Response) => {
  const result = await NotificationService.createNotification(req.body);
  sendResponse(res, { statusCode: 201, success: true, message: 'Notification created successfully.', data: result });
});


const getUserNotifications = catchAsync(async (req: Request, res: Response) => {
    const userId = req.params.userId;
    const result = await NotificationService.getUserNotifications(userId);
    sendResponse(res, { statusCode: 200, success: true, message: 'User notifications fetched successfully.', data: result });
  });

const getNotification = catchAsync(async (req: Request, res: Response) => {
  const result = await NotificationService.getNotification(req.params.id);
  sendResponse(res, { statusCode: 200, success: true, message: 'Notification fetched successfully.', data: result });
});

const updateNotification = catchAsync(async (req: Request, res: Response) => {
  const result = await NotificationService.updateNotification(req.params.id, req.body);
  sendResponse(res, { statusCode: 200, success: true, message: 'Notification updated successfully.', data: result });
});

const deleteNotification = catchAsync(async (req: Request, res: Response) => {
  await NotificationService.deleteNotification(req.params.id);
  sendResponse(res, { statusCode: 200, success: true, message: 'Notification deleted successfully.' });
});

const listNotifications = catchAsync(async (req: Request, res: Response) => {
  const result = await NotificationService.listNotifications(req.query.userId as string);
  sendResponse(res, { statusCode: 200, success: true, message: 'Notifications listed successfully.', data: result });
});

export const NotificationController = {
  createNotification,
  getUserNotifications,
  getNotification,
  updateNotification,
  deleteNotification,
  listNotifications,
};
