"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceController = void 0;
const service_service_1 = require("../services/service.service");
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const config_1 = __importDefault(require("../../../config"));
const pick_1 = __importDefault(require("../../../shared/pick"));
const service_constant_1 = require("./service.constant");
const listAllServices = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const options = (0, pick_1.default)(req.query, ['page', 'limit', 'sortBy', 'sortOrder']);
    const filters = (0, pick_1.default)(req.query, [
        ...service_constant_1.ServiceSearchableFields,
        ...service_constant_1.ServiceFilterableFields,
        'searchTerm',
    ]);
    const result = yield service_service_1.ServiceService.listAllServices(options, filters);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        meta: result.meta,
        data: result.data,
    });
}));
const createService = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const serviceData = JSON.parse(req.body.data);
    const imageFiles = req.files;
    if (imageFiles) {
        const imagePromises = imageFiles.map((file) => __awaiter(void 0, void 0, void 0, function* () {
            const uploadResult = yield config_1.default.cloudinary.uploader.upload(file.path);
            return { filePath: uploadResult.secure_url };
        }));
        serviceData.images = yield Promise.all(imagePromises);
    }
    const service = yield service_service_1.ServiceService.createService(serviceData);
    (0, sendResponse_1.default)(res, { statusCode: 201, success: true, data: service });
}));
const getService = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const service = yield service_service_1.ServiceService.getService(req.params.serviceId);
    (0, sendResponse_1.default)(res, { statusCode: 200, success: true, data: service });
}));
const updateService = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const service = yield service_service_1.ServiceService.updateService(req.params.serviceId, req.body);
    (0, sendResponse_1.default)(res, { statusCode: 200, success: true, data: service });
}));
const deleteService = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const service = yield service_service_1.ServiceService.deleteService(req.params.serviceId);
    (0, sendResponse_1.default)(res, { statusCode: 200, success: true, data: service, message: 'Service deleted successfully!' });
}));
const deleteMultipleServices = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { serviceIds } = req.body;
    if (!serviceIds || !Array.isArray(serviceIds) || serviceIds.length === 0) {
        return (0, sendResponse_1.default)(res, {
            statusCode: 400,
            success: false,
            message: 'Invalid serviceIds provided.',
        });
    }
    yield service_service_1.ServiceService.deleteMultipleServices(serviceIds);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Multiple services deleted successfully.',
    });
}));
exports.ServiceController = {
    createService,
    getService,
    updateService,
    deleteService,
    listAllServices,
    deleteMultipleServices
};
