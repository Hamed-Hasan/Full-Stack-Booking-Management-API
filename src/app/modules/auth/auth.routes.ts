import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AuthValidation } from './auth.validation';
import { AuthController } from './auth.controller';

const router = express.Router();

// Route for User Registration
router.post(
  '/register',
  validateRequest(AuthValidation.registerZodSchema),
  AuthController.registerUser
);

// Route for User Login
router.post(
  '/login',
  validateRequest(AuthValidation.loginZodSchema),
  AuthController.loginUser
);

// Route for Refreshing Tokens
router.post('/refresh-token', AuthController.refreshToken);

// Route for Changing Password
router.post(
  '/change-password',
  validateRequest(AuthValidation.changePasswordZodSchema),
  AuthController.changePassword
);

export const AuthRoutes = router;
