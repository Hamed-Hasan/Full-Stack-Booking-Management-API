// src/review/review.controller.ts

import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { ReviewService } from './review.service';


const createReview = catchAsync(async (req: Request, res: Response) => {
    const result = await ReviewService.createReview(req.body);
    sendResponse(res, { statusCode: 201, success: true, message: 'Review created successfully.', data: result });
  });
  

const getReviews = catchAsync(async (req: Request, res: Response) => {
  const result = await ReviewService.getReviews();
  sendResponse(res, { statusCode: 200, success: true, message: 'Reviews fetched successfully.', data: result });
});

const getReview = catchAsync(async (req: Request, res: Response) => {
  const result = await ReviewService.getReview(req.params.id);
  sendResponse(res, { statusCode: 200, success: true, message: 'Review fetched successfully.', data: result });
});

const getUserReviews = catchAsync(async (req: Request, res: Response) => {
  const result = await ReviewService.getUserReviews(req.params.userId);
  sendResponse(res, { statusCode: 200, success: true, message: 'User reviews fetched successfully.', data: result });
});

const updateReview = catchAsync(async (req: Request, res: Response) => {
  const result = await ReviewService.updateReview(req.params.id, req.body);
  sendResponse(res, { statusCode: 200, success: true, message: 'Review updated successfully.', data: result });
});

const deleteReview = catchAsync(async (req: Request, res: Response) => {
  await ReviewService.deleteReview(req.params.id);
  sendResponse(res, { statusCode: 200, success: true, message: 'Review deleted successfully.' });
});

export const ReviewController = {
  createReview,
  getReviews,
  getReview,
  getUserReviews,
  updateReview,
  deleteReview,
};

