

import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { BlogService } from './blog.service';

const createBlogPost = catchAsync(async (req: Request, res: Response) => {
  const result = await BlogService.createBlogPost(req.body);
  sendResponse(res, { statusCode: 201, success: true, message: 'Blog post created successfully.', data: result });
});

const getBlogPost = catchAsync(async (req: Request, res: Response) => {
  const result = await BlogService.getBlogPost(req.params.id);
  sendResponse(res, { statusCode: 200, success: true, message: 'Blog post fetched successfully.', data: result });
});

const updateBlogPost = catchAsync(async (req: Request, res: Response) => {
  const result = await BlogService.updateBlogPost(req.params.id, req.body);
  sendResponse(res, { statusCode: 200, success: true, message: 'Blog post updated successfully.', data: result });
});

const deleteBlogPost = catchAsync(async (req: Request, res: Response) => {
  await BlogService.deleteBlogPost(req.params.id);
  sendResponse(res, { statusCode: 200, success: true, message: 'Blog post deleted successfully.' });
});

const listBlogPosts = catchAsync(async (req: Request, res: Response) => {
  const result = await BlogService.listBlogPosts();
  sendResponse(res, { statusCode: 200, success: true, message: 'Blog posts listed successfully.', data: result });
});

export const BlogController = {
  createBlogPost,
  getBlogPost,
  updateBlogPost,
  deleteBlogPost,
  listBlogPosts,
};
