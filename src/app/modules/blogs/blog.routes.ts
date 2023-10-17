// blog.routes.ts

import express from 'express';
import { BlogController } from './blog.controller';
import { BlogValidation } from './blog.validation';
import validateRequest from '../../middlewares/validateRequest';

const router = express.Router();

router.post(
  '/create',
  validateRequest(BlogValidation.createBlogPostSchema),
  BlogController.createBlogPost
);

router.get('/:id', BlogController.getBlogPost);

router.put(
  '/:id',
  validateRequest(BlogValidation.updateBlogPostSchema),
  BlogController.updateBlogPost
);

router.delete('/:id', BlogController.deleteBlogPost);

router.get('/', BlogController.listBlogPosts);

export const BlogRoutes = router;
