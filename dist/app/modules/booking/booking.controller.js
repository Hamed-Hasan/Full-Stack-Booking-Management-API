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
exports.BookingController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const booking_service_1 = require("./booking.service");
const pick_1 = __importDefault(require("../../../shared/pick"));
const constant_1 = require("./constant");
exports.BookingController = {
    createBooking: (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield booking_service_1.BookingService.createBooking(req.body);
        (0, sendResponse_1.default)(res, {
            statusCode: 201,
            success: true,
            message: 'Booking created successfully.',
            data: result,
        });
    })),
    getBooking: (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield booking_service_1.BookingService.getBooking(req.params.id);
        (0, sendResponse_1.default)(res, {
            statusCode: 200,
            success: true,
            message: 'Booking fetched successfully.',
            data: result,
        });
    })),
    updateBooking: (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield booking_service_1.BookingService.updateBooking(req.params.id, req.body);
        (0, sendResponse_1.default)(res, {
            statusCode: 200,
            success: true,
            message: 'Booking updated successfully.',
            data: result,
        });
    })),
    deleteBooking: (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        yield booking_service_1.BookingService.deleteBooking(req.params.id);
        (0, sendResponse_1.default)(res, {
            statusCode: 200,
            success: true,
            message: 'Booking deleted successfully.',
        });
    })),
    listBookings: (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const options = (0, pick_1.default)(req.query, ['page', 'limit', 'sortBy', 'sortOrder']);
        const filters = (0, pick_1.default)(req.query, [...constant_1.BookingSearchableFields, 'searchTerm']);
        const result = yield booking_service_1.BookingService.listBookings(options, filters);
        (0, sendResponse_1.default)(res, {
            statusCode: 200,
            success: true,
            message: 'Bookings listed successfully.',
            data: result,
        });
    })),
    listUserBookings: (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield booking_service_1.BookingService.listUserBookings(req.params.userId);
        (0, sendResponse_1.default)(res, {
            statusCode: 200,
            success: true,
            message: 'User bookings listed successfully.',
            data: result,
        });
    })),
};
