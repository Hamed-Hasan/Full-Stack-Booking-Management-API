import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { FaqService } from './faq.service';

const createFaq = catchAsync(async (req: Request, res: Response) => {
  const result = await FaqService.createFaq(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'FAQ created successfully.',
    data: result,
  });
});

const getFaq = catchAsync(async (req: Request, res: Response) => {
  const result = await FaqService.getFaq(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'FAQ fetched successfully.',
    data: result,
  });
});

const updateFaq = catchAsync(async (req: Request, res: Response) => {
  const result = await FaqService.updateFaq(req.params.id, req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'FAQ updated successfully.',
    data: result,
  });
});

const deleteFaq = catchAsync(async (req: Request, res: Response) => {
  await FaqService.deleteFaq(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'FAQ deleted successfully.',
  });
});

const listFaqs = catchAsync(async (req: Request, res: Response) => {
  const result = await FaqService.listFaqs();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'FAQs listed successfully.',
    data: result,
  });
});

export const FaqController = {
  createFaq,
  getFaq,
  updateFaq,
  deleteFaq,
  listFaqs,
};
