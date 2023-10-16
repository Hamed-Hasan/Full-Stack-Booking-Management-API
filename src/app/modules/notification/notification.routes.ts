import express from 'express';
import { NotificationController } from './notification.controller';
import { NotificationZod } from './notification.zod';
import validateRequest from '../../middlewares/validateRequest';

const router = express.Router();

router.post(
  '/create-notification',
  validateRequest(NotificationZod.createNotificationSchema),
  NotificationController.createNotification
);

router.get(
  '/:id',
  NotificationController.getNotification
);

router.put(
  '/:id',
  validateRequest(NotificationZod.updateNotificationSchema),
  NotificationController.updateNotification
);

router.delete(
  '/:id',
  NotificationController.deleteNotification
);

router.get(
  '/',
  NotificationController.listNotifications
);

router.get(
    '/user/:userId',
    NotificationController.getUserNotifications
  );

export const NotificationRoutes = router;
