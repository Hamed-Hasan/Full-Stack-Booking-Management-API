import prisma from '../../../shared/prisma';
import { Prisma, RatingValue } from '@prisma/client';
import {
  ReviewFilterableFields,
  ReviewSearchableFields,
} from './review.constant';
import { calculatePagination } from '../../../helpers/paginationHelper';
import { IOptions } from '../services/service.constant';

export type IReview = {
  id?: string;
  userId: string;
  serviceId: string;
  review: string;
  rating: RatingValue;
};

const createReview = async (data: IReview) => {
  return await prisma.review.create({
    data: { ...data, rating: RatingValue[data.rating] },
  });
};

const getReviews = async (options: IOptions, filters: any) => {
  const { page, limit, sortBy, sortOrder } = calculatePagination(options);
  const skip = (page - 1) * limit;
  const take = limit;

  const andConditions = [];

  // Handling search
  if (filters.searchTerm) {
    andConditions.push({
      OR: ReviewSearchableFields.map(field => ({
        [field]: { contains: filters.searchTerm, mode: 'insensitive' },
      })),
    });
  }

  // Handling filtering
  ReviewFilterableFields.forEach(field => {
    if (filters[field]) {
      andConditions.push({ [field]: { equals: filters[field] } });
    }
  });

  const whereConditions =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const reviews = await prisma.review.findMany({
    where: whereConditions,
    skip,
    take,
    orderBy: {
      [sortBy]: sortOrder,
    },
    include: { user: true, service: true },
  });

  const total = await prisma.review.count({ where: whereConditions });

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: reviews,
  };
};

const getReview = async (id: string) => {
  return await prisma.review.findUnique({
    where: { id },
    include: { user: true, service: true },
  });
};

const getUserReviews = async (userId: string) => {
  return await prisma.review.findMany({
    where: { userId },
    include: { user: true, service: true },
  });
};

const updateReview = async (id: string, data: Prisma.ReviewUpdateInput) => {
  return await prisma.review.update({ where: { id }, data });
};

const deleteReview = async (id: string) => {
  return await prisma.review.delete({ where: { id } });
};

export const ReviewService = {
  createReview,
  getReviews,
  getReview,
  getUserReviews,
  updateReview,
  deleteReview,
};
