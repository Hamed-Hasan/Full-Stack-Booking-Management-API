import { z } from 'zod';

const createFeedbackZodSchema = z.object({
  body: z.object({
    userId: z.string().nonempty({ message: 'User ID is required' }),
    content: z.string().nonempty({ message: 'Content is required' }),
  }),
});

const updateFeedbackZodSchema = z.object({
  body: z.object({
    content: z.string().nonempty({ message: 'Content is required' }).optional(),
  }),
});

export const FeedbackValidation = {
  createFeedbackZodSchema,
  updateFeedbackZodSchema
};
