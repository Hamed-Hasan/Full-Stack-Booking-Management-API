// routes/service.routes.ts
import express from 'express';
import multer from 'multer';
import validateRequest from '../../middlewares/validateRequest';
import { ServiceValidation } from './service.validation';
import { ServiceController } from './service.controller';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';

const upload = multer({ dest: 'uploads/' });

const router = express.Router();

router.post(
  '/create-services',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  upload.array('files', 5), 
  ServiceController.createService
);


router.get('/:serviceId', ServiceController.getService);

router.put(
  '/:serviceId',
  validateRequest(ServiceValidation.updateServiceZodSchema),
  ServiceController.updateService
);

router.delete('/:serviceId', ServiceController.deleteService);

router.get('/', ServiceController.listAllServices);

export const ServiceRoutes = router;
