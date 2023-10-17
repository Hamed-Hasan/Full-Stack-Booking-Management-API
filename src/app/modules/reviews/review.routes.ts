import express from 'express';
import { ReviewController } from './review.controller';
import validateRequest from '../../middlewares/validateRequest';
import { ReviewValidation } from './review.validation';

const router = express.Router();

router.post(
  '/create-review',
  validateRequest(ReviewValidation.createReviewZodSchema),
  ReviewController.createReview
);

router.get('/all-reviews', ReviewController.getReviews);

router.get('/:id', ReviewController.getReview);

router.get('/user/:userId', ReviewController.getUserReviews);

router.patch(
  '/:id',
  validateRequest(ReviewValidation.reviewZodSchema),
  ReviewController.updateReview
);

router.delete('/:id', ReviewController.deleteReview);

export const ReviewRoutes = router;
