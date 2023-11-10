import express from 'express';
// import multer from 'multer';
import { UserController } from './user.controller';

import validateRequest from '../../middlewares/validateRequest';
import { UpdateUserValidationSchema } from './user.validation';

// const upload = multer({ dest: 'uploads/' });

const router = express.Router();

router.get('/all-users', UserController.getAllUsers);

router.get('/:id', UserController.getUserById);

router.put(
  '/:id',
  // upload.single('file'),
  validateRequest(UpdateUserValidationSchema.updateUserZodSchema),
  UserController.updateUser
);

router.delete('/:id', UserController.deleteUser);

export const UserRoutes = router;
