// controllers/service.controller.ts
import { Request, Response } from 'express';
import { ServiceService } from '../services/service.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IService } from './service.interface';
import config from '../../../config';
import pick from '../../../shared/pick';
import { ServiceFilterableFields, ServiceSearchableFields } from './service.constant';



const listAllServices = catchAsync(async (req: Request, res: Response) => {
  const options = pick(req.query, ['page', 'limit', 'sortBy', 'sortOrder']);
  const filters = pick(req.query, [...ServiceSearchableFields, ...ServiceFilterableFields, 'searchTerm']);

  const result = await ServiceService.listAllServices(options, filters);
  sendResponse(res, { statusCode: 200, success: true, meta: result.meta, data: result.data });
});



const createService = catchAsync(async (req: Request, res: Response) => {
    const serviceData: IService = JSON.parse(req.body.data);
    if (req.file) {
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
  

export const ServiceController = {
  createService,
  getService,
  updateService,
  deleteService,
  listAllServices,
};
