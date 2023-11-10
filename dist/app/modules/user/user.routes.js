"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
// import multer from 'multer';
const user_controller_1 = require("./user.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const user_validation_1 = require("./user.validation");
// const upload = multer({ dest: 'uploads/' });
const router = express_1.default.Router();
router.get('/all-users', user_controller_1.UserController.getAllUsers);
router.get('/:id', user_controller_1.UserController.getUserById);
router.put('/:id', 
// upload.single('file'),
(0, validateRequest_1.default)(user_validation_1.UpdateUserValidationSchema.updateUserZodSchema), user_controller_1.UserController.updateUser);
router.delete('/:id', user_controller_1.UserController.deleteUser);
exports.UserRoutes = router;
