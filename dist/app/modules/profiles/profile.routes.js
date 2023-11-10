"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileRoutes = void 0;
const express_1 = __importDefault(require("express"));
const profile_controller_1 = require("./profile.controller");
const profile_validation_1 = require("./profile.validation");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const router = express_1.default.Router();
router.get('/all-profile', profile_controller_1.ProfileController.getProfiles);
router.get('/specific-profile/:userId', profile_controller_1.ProfileController.getProfile);
router.patch('/update-profile/:userId', (0, validateRequest_1.default)(profile_validation_1.ProfileValidation.updateProfileZodSchema), profile_controller_1.ProfileController.updateProfile);
router.delete('/delete-profile/:userId', profile_controller_1.ProfileController.deleteProfile);
exports.ProfileRoutes = router;
