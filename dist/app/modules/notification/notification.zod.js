"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationZod = void 0;
const zod_1 = require("zod");
const createNotificationSchema = zod_1.z.object({
    body: zod_1.z.object({
        userId: zod_1.z.string(),
        message: zod_1.z.string(),
        read: zod_1.z.boolean().optional(),
    }),
});
const updateNotificationSchema = zod_1.z.object({
    body: zod_1.z.object({
        message: zod_1.z.string().optional(),
        read: zod_1.z.boolean().optional(),
    }),
});
exports.NotificationZod = {
    createNotificationSchema,
    updateNotificationSchema,
};
