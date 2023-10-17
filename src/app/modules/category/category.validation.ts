import { z } from 'zod';

const createCategoryZodSchema = z.object({
  body: z.object({
    name: z.string().nonempty({ message: 'Name is required' }),
  }),
});

const updateCategoryZodSchema = z.object({
  body: z.object({
    name: z.string().nonempty({ message: 'Name is required' }).optional(),
  }),
});

const createMultipleCategoriesZodSchema = z.object({
  body: z.array(
    z.object({
      name: z.string().nonempty({ message: 'Name is required' }),
    })
  ),
});

export const CategoryValidation = {
  createCategoryZodSchema,
  updateCategoryZodSchema,
  createMultipleCategoriesZodSchema,
};
