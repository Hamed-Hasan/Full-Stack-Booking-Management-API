import express from 'express';
import { FaqController } from './faq.controller';
import { FaqValidation } from './faq.validation';
import validateRequest from '../../middlewares/validateRequest';

const router = express.Router();

router.post(
  '/create-faq',
  validateRequest(FaqValidation.createFaqZodSchema),
  FaqController.createFaq
);

router.get(
  '/:id',
  FaqController.getFaq
);

router.put(
  '/:id',
  validateRequest(FaqValidation.updateFaqZodSchema),
  FaqController.updateFaq
);

router.delete(
  '/:id',
  FaqController.deleteFaq
);

router.get(
  '/',
  FaqController.listFaqs
);

export const FaqRoutes = router;
