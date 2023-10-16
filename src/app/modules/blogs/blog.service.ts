// blog.service.ts

import prisma from '../../../shared/prisma';
import { IBlogPost } from './blog.interface';

const createBlogPost = async (payload: IBlogPost) => {
  return await prisma.blogPost.create({ data: payload });
};

const getBlogPost = async (id: string) => {
  return await prisma.blogPost.findUnique({ where: { id }, include: { author: true } });
};

const updateBlogPost = async (id: string, payload: Partial<IBlogPost>) => {
  return await prisma.blogPost.update({ where: { id }, data: payload });
};

const deleteBlogPost = async (id: string) => {
  return await prisma.blogPost.delete({ where: { id } });
};

const listBlogPosts = async () => {
  return await prisma.blogPost.findMany({ include: { author: true } });
};

export const BlogService = {
  createBlogPost,
  getBlogPost,
  updateBlogPost,
  deleteBlogPost,
  listBlogPosts,
};
