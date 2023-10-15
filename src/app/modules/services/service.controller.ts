// controllers/service.controller.ts
import { Request, Response } from 'express';
import { ServiceService } from '../services/service.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IService } from './service.interface';
import config from '../../../config';


const createService = catchAsync(async (req: Request, res: Response) => {
    // Parse the JSON string to an object
    const serviceData: IService = JSON.parse(req.body.data);
  
    if (req.file) {
      // If file is provided, upload it to Cloudinary
      const uploadResult = await config.cloudinary.uploader.upload(req.file.path);
      serviceData.images = [{ filePath: uploadResult.secure_url }];
    }
  
    const service = await ServiceService.createService(serviceData);
    sendResponse(res, { statusCode: 201, success: true, data: service });
  });
  


  const getService = catchAsync(async (req: Request, res: Response) => {
    const service = await ServiceService.getService(req.params.serviceId);
    sendResponse(res, { statusCode: 200, success: true, data: service });
  });
  
  const updateService = catchAsync(async (req: Request, res: Response) => {
    const service = await ServiceService.updateService(req.params.serviceId, req.body);
    sendResponse(res, { statusCode: 200, success: true, data: service });
  });
  
  const deleteService = catchAsync(async (req: Request, res: Response) => {
    const service = await ServiceService.deleteService(req.params.serviceId);
    sendResponse(res, { statusCode: 200, success: true, data: service });
  });
  
  const listServices = catchAsync(async (_req: Request, res: Response) => {
    const services = await ServiceService.listServices();
    sendResponse(res, { statusCode: 200, success: true, data: services });
  });

export const ServiceController = {
  createService,
//   uploadImage,
  getService,
  updateService,
  deleteService,
  listServices,
};
