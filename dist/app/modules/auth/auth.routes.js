"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const auth_validation_1 = require("./auth.validation");
const auth_controller_1 = require("./auth.controller");
const router = express_1.default.Router();
// Route for User Registration
router.post('/register', (0, validateRequest_1.default)(auth_validation_1.AuthValidation.registerZodSchema), auth_controller_1.AuthController.registerUser);
// Route for User Login
router.post('/login', (0, validateRequest_1.default)(auth_validation_1.AuthValidation.loginZodSchema), auth_controller_1.AuthController.loginUser);
// Route for Refreshing Tokens
router.post('/refresh-token', auth_controller_1.AuthController.refreshToken);
// Route for Changing Password
router.post('/change-password', (0, validateRequest_1.default)(auth_validation_1.AuthValidation.changePasswordZodSchema), auth_controller_1.AuthController.changePassword);
exports.AuthRoutes = router;
