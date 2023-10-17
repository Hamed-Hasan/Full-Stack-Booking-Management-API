import express from 'express';
import { ProfileController } from './profile.controller';
import { ProfileValidation } from './profile.validation';
import validateRequest from '../../middlewares/validateRequest';

const router = express.Router();

router.get('/all-profile', ProfileController.getProfiles);

router.get('/specific-profile/:userId', ProfileController.getProfile);

router.patch(
  '/update-profile/:userId',
  validateRequest(ProfileValidation.updateProfileZodSchema),
  ProfileController.updateProfile
);

router.delete('/delete-profile/:userId', ProfileController.deleteProfile);

export const ProfileRoutes = router;
