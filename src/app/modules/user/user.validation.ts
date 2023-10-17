import { z } from 'zod';

const updateUserZodSchema = z.object({
  email: z.string().email().optional(),
  password: z.string().optional(),
  role: z.enum(['user', 'admin', 'superAdmin']).optional(),
  file: z.any().optional(),
});
export const UpdateUserValidationSchema = {
  updateUserZodSchema,
};
