"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceRoutes = void 0;
// routes/service.routes.ts
const express_1 = __importDefault(require("express"));
// import multer from 'multer';
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const service_validation_1 = require("./service.validation");
const service_controller_1 = require("./service.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_1 = require("../../../enums/user");
// const upload = multer({ dest: 'uploads/' });
const router = express_1.default.Router();
router.post('/create-services', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.SUPER_ADMIN), 
// upload.array('files', 5),
service_controller_1.ServiceController.createService);
router.get('/:serviceId', service_controller_1.ServiceController.getService);
router.put('/:serviceId', (0, validateRequest_1.default)(service_validation_1.ServiceValidation.updateServiceZodSchema), service_controller_1.ServiceController.updateService);
router.delete('/:serviceId', service_controller_1.ServiceController.deleteService);
router.delete('/delete-multiple', service_controller_1.ServiceController.deleteMultipleServices);
router.get('/', service_controller_1.ServiceController.listAllServices);
exports.ServiceRoutes = router;
