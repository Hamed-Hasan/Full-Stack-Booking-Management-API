import { z } from 'zod';

const updateUserZodSchema = z.object({
    body: z.object({
        email: z.string().email().optional(),
        password: z.string().optional(),
        role: z.enum(['user', 'admin','superAdmin']).optional(),
    }),
});

export const UpdateUserValidationSchema = {
    updateUserZodSchema
}