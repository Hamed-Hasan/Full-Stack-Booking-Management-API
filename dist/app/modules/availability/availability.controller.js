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
exports.AvailabilityController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const availability_service_1 = require("./availability.service");
const createAvailability = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const availability = yield availability_service_1.AvailabilityService.createAvailability(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 201,
        success: true,
        message: 'Availability created successfully.',
        data: availability,
    });
}));
const getAvailability = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const availability = yield availability_service_1.AvailabilityService.getAvailability(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Availability fetched successfully.',
        data: availability,
    });
}));
const updateAvailability = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const availability = yield availability_service_1.AvailabilityService.updateAvailability(req.params.id, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Availability updated successfully.',
        data: availability,
    });
}));
const deleteAvailability = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield availability_service_1.AvailabilityService.deleteAvailability(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Availability deleted successfully.',
    });
}));
const listAvailabilities = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const availabilities = yield availability_service_1.AvailabilityService.listAvailabilities();
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Availabilities listed successfully.',
        data: availabilities,
    });
}));
exports.AvailabilityController = {
    createAvailability,
    getAvailability,
    updateAvailability,
    deleteAvailability,
    listAvailabilities,
};
