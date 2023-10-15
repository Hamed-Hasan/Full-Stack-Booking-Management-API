
import prisma from '../../../shared/prisma';
import { Prisma, RatingValue } from '@prisma/client';


export type IReview = {
  id?: string;
  userId: string;
  serviceId: string;
  review: string;
  rating: RatingValue;
};

const createReview = async (data: IReview) => {
    return await prisma.review.create({ data: { ...data, rating: RatingValue[data.rating] } });
  };

const getReviews = async () => {
  return await prisma.review.findMany({ include: { user: true, service: true } });
};

const getReview = async (id: string) => {
  return await prisma.review.findUnique({ where: { id }, include: { user: true, service: true } });
};

const getUserReviews = async (userId: string) => {
  return await prisma.review.findMany({ where: { userId }, include: { user: true, service: true } });
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

