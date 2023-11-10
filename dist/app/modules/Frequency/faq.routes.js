"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FaqRoutes = void 0;
const express_1 = __importDefault(require("express"));
const faq_controller_1 = require("./faq.controller");
const faq_validation_1 = require("./faq.validation");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const router = express_1.default.Router();
router.post('/create-faq', (0, validateRequest_1.default)(faq_validation_1.FaqValidation.createFaqZodSchema), faq_controller_1.FaqController.createFaq);
router.get('/:id', faq_controller_1.FaqController.getFaq);
router.put('/:id', (0, validateRequest_1.default)(faq_validation_1.FaqValidation.updateFaqZodSchema), faq_controller_1.FaqController.updateFaq);
router.delete('/:id', faq_controller_1.FaqController.deleteFaq);
router.get('/', faq_controller_1.FaqController.listFaqs);
exports.FaqRoutes = router;
