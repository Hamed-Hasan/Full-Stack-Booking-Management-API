// src/review/review.controller.ts

import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { ReviewService } from './review.service';
import pick from '../../../shared/pick';
import { ReviewFilterableFields, ReviewSearchableFields } from './review.constant';

const createReview = catchAsync(async (req: Request, res: Response) => {
  const result = await ReviewService.createReview(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Review created successfully.',
    data: result,
  });
});

const getReviews = catchAsync(async (req: Request, res: Response) => {
  const options = pick(req.query, ['page', 'limit', 'sortBy', 'sortOrder']);
  const filters = pick(req.query, [...ReviewSearchableFields, ...ReviewFilterableFields]);

  const result = await ReviewService.getReviews(options, filters);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Reviews fetched successfully.',
    meta: result.meta,
    data: result.data,
  });
});

const getReview = catchAsync(async (req: Request, res: Response) => {
  const result = await ReviewService.getReview(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Review fetched successfully.',
    data: result,
  });
});

const getUserReviews = catchAsync(async (req: Request, res: Response) => {
  const result = await ReviewService.getUserReviews(req.params.userId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User reviews fetched successfully.',
    data: result,
  });
});

const updateReview = catchAsync(async (req: Request, res: Response) => {
  const result = await ReviewService.updateReview(req.params.id, req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Review updated successfully.',
    data: result,
  });
});

const deleteReview = catchAsync(async (req: Request, res: Response) => {
  await ReviewService.deleteReview(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Review deleted successfully.',
  });
});

export const ReviewController = {
  createReview,
  getReviews,
  getReview,
  getUserReviews,
  updateReview,
  deleteReview,
};
