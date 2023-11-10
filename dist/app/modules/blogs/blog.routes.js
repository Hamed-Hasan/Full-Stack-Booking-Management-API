"use strict";
// blog.routes.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogRoutes = void 0;
const express_1 = __importDefault(require("express"));
const blog_controller_1 = require("./blog.controller");
const blog_validation_1 = require("./blog.validation");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const router = express_1.default.Router();
router.post('/create', (0, validateRequest_1.default)(blog_validation_1.BlogValidation.createBlogPostSchema), blog_controller_1.BlogController.createBlogPost);
router.get('/:id', blog_controller_1.BlogController.getBlogPost);
router.put('/:id', (0, validateRequest_1.default)(blog_validation_1.BlogValidation.updateBlogPostSchema), blog_controller_1.BlogController.updateBlogPost);
router.delete('/:id', blog_controller_1.BlogController.deleteBlogPost);
router.get('/', blog_controller_1.BlogController.listBlogPosts);
exports.BlogRoutes = router;
