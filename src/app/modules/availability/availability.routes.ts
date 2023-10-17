import express from 'express';
import { AvailabilityController } from './availability.controller';

const router = express.Router();

router.post(
  '/add',
  //   validateRequest(AvailabilityValidation.createUpdateAvailabilitySchema),
  AvailabilityController.createAvailability
);

router.get('/:id', AvailabilityController.getAvailability);

router.put(
  '/:id',
  //   validateRequest(AvailabilityValidation.createUpdateAvailabilitySchema),
  AvailabilityController.updateAvailability
);

router.delete('/:id', AvailabilityController.deleteAvailability);

router.get('/', AvailabilityController.listAvailabilities);

export const AvailabilityRoutes = router;
