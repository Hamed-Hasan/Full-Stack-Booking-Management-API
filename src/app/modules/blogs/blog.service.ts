// blog.service.ts

import { calculatePagination } from '../../../helpers/paginationHelper';
import prisma from '../../../shared/prisma';
import { BlogFilterableFields, BlogSearchableFields, IOptions } from './blog.constant';
import { IBlogPost } from './blog.interface';

const createBlogPost = async (payload: IBlogPost) => {
  return await prisma.blogPost.create({ data: payload });
};

const getBlogPost = async (id: string) => {
  return await prisma.blogPost.findUnique({
    where: { id },
    include: { author: true },
  });
};

const updateBlogPost = async (id: string, payload: Partial<IBlogPost>) => {
  return await prisma.blogPost.update({ where: { id }, data: payload });
};

const deleteBlogPost = async (id: string) => {
  return await prisma.blogPost.delete({ where: { id } });
};

const listBlogPosts = async (options: IOptions, filters: any) => {
  const { page, limit, sortBy, sortOrder } = calculatePagination(options);

  // Build the WHERE condition for filtering and searching
  const andConditions = [];

  // Handling search
  if (filters.search) {
    andConditions.push({
      OR: BlogSearchableFields.map(field => ({
        [field]: { contains: filters.search, mode: 'insensitive' }, // Add 'insensitive' mode
      })),
    });
  }

// Handling filtering
BlogFilterableFields.forEach(field => {
  if (filters[field]) {
    andConditions.push({ [field]: { contains: filters[field], mode: 'insensitive' } }); // Add 'insensitive' mode
  }
});


  const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};

  // Execute the query with pagination, sorting, and filtering
  const blogPosts = await prisma.blogPost.findMany({
    where: whereConditions,
    skip: options.page ? (options.page - 1) * (options.limit || 10) : 0,
    take: parseInt(options.limit, 10) || 10,
    orderBy: {
      [sortBy]: sortOrder,
    },
    include: { 
     author:true
    },
  });

  const total = await prisma.blogPost.count({ where: whereConditions });

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: blogPosts,
  };
};





export const BlogService = {
  createBlogPost,
  getBlogPost,
  updateBlogPost,
  deleteBlogPost,
  listBlogPosts,
};
