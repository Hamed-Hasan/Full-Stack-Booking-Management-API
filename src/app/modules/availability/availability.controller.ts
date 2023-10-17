// availability.controller.ts
import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { AvailabilityService } from './availability.service';

const createAvailability = catchAsync(async (req: Request, res: Response) => {
  const availability = await AvailabilityService.createAvailability(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Availability created successfully.',
    data: availability,
  });
});

const getAvailability = catchAsync(async (req: Request, res: Response) => {
  const availability = await AvailabilityService.getAvailability(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Availability fetched successfully.',
    data: availability,
  });
});

const updateAvailability = catchAsync(async (req: Request, res: Response) => {
  const availability = await AvailabilityService.updateAvailability(
    req.params.id,
    req.body
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Availability updated successfully.',
    data: availability,
  });
});

const deleteAvailability = catchAsync(async (req: Request, res: Response) => {
  await AvailabilityService.deleteAvailability(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Availability deleted successfully.',
  });
});

const listAvailabilities = catchAsync(async (req: Request, res: Response) => {
  const availabilities = await AvailabilityService.listAvailabilities();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Availabilities listed successfully.',
    data: availabilities,
  });
});

export const AvailabilityController = {
  createAvailability,
  getAvailability,
  updateAvailability,
  deleteAvailability,
  listAvailabilities,
};
