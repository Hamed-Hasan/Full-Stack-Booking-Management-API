"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedbackValidation = void 0;
const zod_1 = require("zod");
const createFeedbackZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        userId: zod_1.z.string().nonempty({ message: 'User ID is required' }),
        content: zod_1.z.string().nonempty({ message: 'Content is required' }),
    }),
});
const updateFeedbackZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        content: zod_1.z.string().nonempty({ message: 'Content is required' }).optional(),
    }),
});
exports.FeedbackValidation = {
    createFeedbackZodSchema,
    updateFeedbackZodSchema,
};
