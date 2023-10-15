// routes/service.routes.ts
import express from 'express';
import multer from 'multer';
import validateRequest from '../../middlewares/validateRequest';
import { ServiceValidation } from './service.validation';
import { ServiceController } from './service.controller';


const upload = multer({ dest: 'uploads/' });

const router = express.Router();

router.post(
    '/create-services',
    upload.single('file'),  
    ServiceController.createService
  );


router.get(
'/:serviceId', 
ServiceController.getService
);

router.put(
  '/:serviceId',
  validateRequest(ServiceValidation.updateServiceZodSchema),
  ServiceController.updateService
);

router.delete(
'/:serviceId', ServiceController.deleteService
);

router.get(
'/', ServiceController.listServices
);

export const ServiceRoutes = router;
