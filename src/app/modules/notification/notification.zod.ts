import { z } from 'zod';

const createNotificationSchema = z.object({
  body: z.object({
    userId: z.string(),
  message: z.string(),
  read: z.boolean().optional(),
  })
});

const updateNotificationSchema = z.object({
 body: z.object({
    message: z.string().optional(),
    read: z.boolean().optional(),
 })
});

export const NotificationZod = {
  createNotificationSchema,
  updateNotificationSchema,
};
