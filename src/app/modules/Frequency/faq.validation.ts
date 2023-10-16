import { z } from 'zod';

const createFaqZodSchema = z.object({
  body: z.object({
    question: z.string().nonempty({ message: 'Question is required' }),
    answer: z.string().nonempty({ message: 'Answer is required' }),
  }),
});

const updateFaqZodSchema = z.object({
  body: z.object({
    question: z.string().nonempty({ message: 'Question is required' }).optional(),
    answer: z.string().nonempty({ message: 'Answer is required' }).optional(),
  }),
});

export const FaqValidation = {
  createFaqZodSchema,
  updateFaqZodSchema,
};
