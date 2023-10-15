// src/profile/profile.validation.ts

import { z } from 'zod';

const updateProfileZodSchema = z.object({
  body: z.object({
    username: z.string().optional(),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    dateOfBirth: z.date().optional(),
    phoneNumber: z.string().optional(),
    address: z.string().optional(),
    bio: z.string().optional(),
    profileImage: z.string().optional(),
  }),
});

export const ProfileValidation = {
  updateProfileZodSchema,
};
