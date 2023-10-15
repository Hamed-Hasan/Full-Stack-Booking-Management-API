import express from 'express';
import { CategoryController } from './category.controller';
import { CategoryValidation } from './category.validation';
import validateRequest from '../../middlewares/validateRequest';

const router = express.Router();

router.post(
  '/create-category',
  validateRequest(CategoryValidation.createCategoryZodSchema),
  CategoryController.createCategory
);

router.post(
    '/bulk-create',
    validateRequest(CategoryValidation.createMultipleCategoriesZodSchema),
    CategoryController.createMultipleCategories
  );
router.get(
  '/:id',
  CategoryController.getCategory
);

router.put(
  '/:id',
  validateRequest(CategoryValidation.updateCategoryZodSchema),
  CategoryController.updateCategory
);

router.delete(
  '/:id',
  CategoryController.deleteCategory
);

router.get(
  '/',
  CategoryController.listCategories
);

export const CategoryRoutes = router;
