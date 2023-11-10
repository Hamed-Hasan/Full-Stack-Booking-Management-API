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
exports.BookingService = void 0;
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const constant_1 = require("./constant");
exports.BookingService = {
    createBooking: (payload) => __awaiter(void 0, void 0, void 0, function* () {
        return yield prisma_1.default.booking.create({
            data: payload,
        });
    }),
    getBooking: (id) => __awaiter(void 0, void 0, void 0, function* () {
        return yield prisma_1.default.booking.findUnique({
            where: { id },
            include: {
                user: true,
                service: true,
            },
        });
    }),
    updateBooking: (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
        return yield prisma_1.default.booking.update({
            where: { id },
            data: payload,
        });
    }),
    deleteBooking: (id) => __awaiter(void 0, void 0, void 0, function* () {
        return yield prisma_1.default.booking.delete({
            where: { id },
        });
    }),
    listBookings: (options, filters) => __awaiter(void 0, void 0, void 0, function* () {
        const { page, limit, sortBy, sortOrder } = (0, paginationHelper_1.calculatePagination)(options);
        const skip = (page - 1) * limit;
        const take = limit;
        const andConditions = [];
        // Handling search
        if (filters.searchTerm) {
            andConditions.push({
                OR: constant_1.BookingSearchableFields.map(field => ({
                    [field]: { contains: filters.searchTerm, mode: 'insensitive' },
                })),
            });
        }
        // Handling filtering
        constant_1.BookingSearchableFields.forEach(field => {
            if (filters[field]) {
                andConditions.push({ [field]: { equals: filters[field] } });
            }
        });
        const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};
        const bookings = yield prisma_1.default.booking.findMany({
            where: whereConditions,
            skip,
            take,
            orderBy: {
                [sortBy]: sortOrder,
            },
            include: {
                user: true,
                service: true,
            },
        });
        const total = yield prisma_1.default.booking.count({ where: whereConditions });
        return {
            meta: {
                total,
                page,
                limit,
            },
            data: bookings,
        };
    }),
    listUserBookings: (userId) => __awaiter(void 0, void 0, void 0, function* () {
        return yield prisma_1.default.booking.findMany({
            where: { userId },
            include: {
                user: true,
                service: true,
            },
        });
    }),
};
