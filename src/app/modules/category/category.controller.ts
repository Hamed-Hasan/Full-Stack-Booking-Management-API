import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { CategoryService } from './category.service';
import pick from '../../../shared/pick';
import {
  CategoryFilterableFields,
  CategorySearchableFields,
} from './category.constant';

const createCategory = catchAsync(async (req: Request, res: Response) => {
  const result = await CategoryService.createCategory(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Category created successfully.',
    data: result,
  });
});

const createMultipleCategories = catchAsync(
  async (req: Request, res: Response) => {
    const result = await CategoryService.createMultipleCategories(req.body);
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: 'Categories created successfully.',
      data: result,
    });
  }
);

const getCategory = catchAsync(async (req: Request, res: Response) => {
  const result = await CategoryService.getCategory(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Category fetched successfully.',
    data: result,
  });
});

const updateCategory = catchAsync(async (req: Request, res: Response) => {
  const result = await CategoryService.updateCategory(req.params.id, req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Category updated successfully.',
    data: result,
  });
});

const deleteCategory = catchAsync(async (req: Request, res: Response) => {
  await CategoryService.deleteCategory(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Category deleted successfully.',
  });
});

const listCategories = catchAsync(async (req: Request, res: Response) => {
  const options = pick(req.query, ['page', 'limit', 'sortBy', 'sortOrder']);
  const filters = pick(req.query, [
    ...CategorySearchableFields,
    ...CategoryFilterableFields,
    'searchTerm',
  ]);

  const result = await CategoryService.listCategories(options, filters);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    meta: result.meta,
    data: result.data,
  });
});

export const CategoryController = {
  createCategory,
  createMultipleCategories,
  getCategory,
  updateCategory,
  deleteCategory,
  listCategories,
};
