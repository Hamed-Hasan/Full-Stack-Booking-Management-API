"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AvailabilityRoutes = void 0;
const express_1 = __importDefault(require("express"));
const availability_controller_1 = require("./availability.controller");
const router = express_1.default.Router();
router.post('/add', 
//   validateRequest(AvailabilityValidation.createUpdateAvailabilitySchema),
availability_controller_1.AvailabilityController.createAvailability);
router.get('/:id', availability_controller_1.AvailabilityController.getAvailability);
router.put('/:id', 
//   validateRequest(AvailabilityValidation.createUpdateAvailabilitySchema),
availability_controller_1.AvailabilityController.updateAvailability);
router.delete('/:id', availability_controller_1.AvailabilityController.deleteAvailability);
router.get('/', availability_controller_1.AvailabilityController.listAvailabilities);
exports.AvailabilityRoutes = router;
