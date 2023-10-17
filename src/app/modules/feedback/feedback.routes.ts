import express from 'express';
import { FeedbackController } from './feedback.controller';
import { FeedbackValidation } from './feedback.validation';
import validateRequest from '../../middlewares/validateRequest';

const router = express.Router();

router.post(
  '/create-feedback',
  validateRequest(FeedbackValidation.createFeedbackZodSchema),
  FeedbackController.createFeedback
);

router.get('/:id', FeedbackController.getFeedback);

router.put(
  '/:id',
  validateRequest(FeedbackValidation.updateFeedbackZodSchema),
  FeedbackController.updateFeedback
);

router.delete('/:id', FeedbackController.deleteFeedback);

router.get('/', FeedbackController.listFeedback);

export const FeedbackRoutes = router;
