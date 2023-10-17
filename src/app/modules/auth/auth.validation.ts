import { z } from 'zod';

const registerZodSchema = z.object({
  body: z.object({
    email: z.string().email({ message: 'Invalid email address' }),
    password: z.string().min(6, { message: 'Password too short' }),
  }),
});

const loginZodSchema = z.object({
  body: z.object({
    email: z.string().email({ message: 'Invalid email address' }),
    password: z.string().min(6, { message: 'Password too short' }),
  }),
});

const changePasswordZodSchema = z.object({
  body: z.object({
    oldPassword: z.string().min(6, { message: 'Password too short' }),
    newPassword: z.string().min(6, { message: 'Password too short' }),
  }),
});

export const AuthValidation = {
  registerZodSchema,
  loginZodSchema,
  changePasswordZodSchema,
};
