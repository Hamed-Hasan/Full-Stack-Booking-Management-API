import { z } from 'zod';

 const createCartItemZodSchema = z.object({
  body: z.object({
    userId: z.string(),
    serviceId: z.string(),
    quantity: z.number().min(1),
  }),
});

 const updateCartItemZodSchema = z.object({
  body: z.object({
    quantity: z.number().min(1).optional(),
  }),
});

export const CartItemValidation = {
    createCartItemZodSchema,
    updateCartItemZodSchema,
  };
  