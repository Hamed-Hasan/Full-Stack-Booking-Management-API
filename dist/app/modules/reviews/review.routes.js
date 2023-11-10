"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewRoutes = void 0;
const express_1 = __importDefault(require("express"));
const review_controller_1 = require("./review.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const review_validation_1 = require("./review.validation");
const router = express_1.default.Router();
router.post('/create-review', (0, validateRequest_1.default)(review_validation_1.ReviewValidation.createReviewZodSchema), review_controller_1.ReviewController.createReview);
router.get('/all-reviews', review_controller_1.ReviewController.getReviews);
router.get('/:id', review_controller_1.ReviewController.getReview);
router.get('/user/:userId', review_controller_1.ReviewController.getUserReviews);
router.patch('/:id', (0, validateRequest_1.default)(review_validation_1.ReviewValidation.reviewZodSchema), review_controller_1.ReviewController.updateReview);
router.delete('/:id', review_controller_1.ReviewController.deleteReview);
exports.ReviewRoutes = router;
