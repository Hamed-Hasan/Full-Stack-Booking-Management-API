import { z } from 'zod';

export const RatingValueEnum = z.union([
  z.literal('ONE'),
  z.literal('TWO'),
  z.literal('THREE'),
  z.literal('FOUR'),
  z.literal('FIVE'),
]);

const reviewZodSchema = z.object({
    body: z.object({
      review: z.string(),
      rating: RatingValueEnum,
    }),
  });
  

const createReviewZodSchema = z.object({
  body: z.object({
    userId: z.string().uuid(),
    serviceId: z.string().uuid(),
    review: z.string(),
    rating: RatingValueEnum,
  }),
});

export const ReviewValidation = {
  reviewZodSchema,
  createReviewZodSchema,
};
