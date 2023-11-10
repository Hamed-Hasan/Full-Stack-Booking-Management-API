"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryRoutes = void 0;
const express_1 = __importDefault(require("express"));
const category_controller_1 = require("./category.controller");
const category_validation_1 = require("./category.validation");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const router = express_1.default.Router();
router.post('/create-category', (0, validateRequest_1.default)(category_validation_1.CategoryValidation.createCategoryZodSchema), category_controller_1.CategoryController.createCategory);
router.post('/bulk-create', (0, validateRequest_1.default)(category_validation_1.CategoryValidation.createMultipleCategoriesZodSchema), category_controller_1.CategoryController.createMultipleCategories);
router.get('/:id', category_controller_1.CategoryController.getCategory);
router.put('/:id', (0, validateRequest_1.default)(category_validation_1.CategoryValidation.updateCategoryZodSchema), category_controller_1.CategoryController.updateCategory);
router.delete('/:id', category_controller_1.CategoryController.deleteCategory);
router.get('/', category_controller_1.CategoryController.listCategories);
exports.CategoryRoutes = router;
