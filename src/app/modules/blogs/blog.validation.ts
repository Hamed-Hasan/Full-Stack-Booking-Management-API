import { z } from 'zod';

const createBlogPostSchema = z.object({
  body: z.object({
    title: z.string().nonempty({ message: 'Title is required' }),
    content: z.string().nonempty({ message: 'Content is required' }),
    authorId: z.string().nonempty({ message: 'Author ID is required' }),
  }),
});

const updateBlogPostSchema = z.object({
  body: z.object({
    title: z.string().nonempty({ message: 'Title is required' }).optional(),
    content: z.string().nonempty({ message: 'Content is required' }).optional(),
    authorId: z
      .string()
      .nonempty({ message: 'Author ID is required' })
      .optional(),
  }),
});

export const BlogValidation = {
  createBlogPostSchema,
  updateBlogPostSchema,
};
