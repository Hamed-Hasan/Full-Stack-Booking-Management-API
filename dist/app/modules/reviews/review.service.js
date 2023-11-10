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
exports.ReviewService = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const client_1 = require("@prisma/client");
const review_constant_1 = require("./review.constant");
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const createReview = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.review.create({
        data: Object.assign(Object.assign({}, data), { rating: client_1.RatingValue[data.rating] }),
    });
});
const getReviews = (options, filters) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, sortBy, sortOrder } = (0, paginationHelper_1.calculatePagination)(options);
    const skip = (page - 1) * limit;
    const take = limit;
    const andConditions = [];
    // Handling search
    if (filters.searchTerm) {
        andConditions.push({
            OR: review_constant_1.ReviewSearchableFields.map(field => ({
                [field]: { contains: filters.searchTerm, mode: 'insensitive' },
            })),
        });
    }
    // Handling filtering
    review_constant_1.ReviewFilterableFields.forEach(field => {
        if (filters[field]) {
            andConditions.push({ [field]: { equals: filters[field] } });
        }
    });
    const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};
    const reviews = yield prisma_1.default.review.findMany({
        where: whereConditions,
        skip,
        take,
        orderBy: {
            [sortBy]: sortOrder,
        },
        include: { user: true, service: true },
    });
    const total = yield prisma_1.default.review.count({ where: whereConditions });
    return {
        meta: {
            total,
            page,
            limit,
        },
        data: reviews,
    };
});
const getReview = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.review.findUnique({
        where: { id },
        include: { user: true, service: true },
    });
});
const getUserReviews = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.review.findMany({
        where: { userId },
        include: { user: true, service: true },
    });
});
const updateReview = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.review.update({ where: { id }, data });
});
const deleteReview = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.review.delete({ where: { id } });
});
exports.ReviewService = {
    createReview,
    getReviews,
    getReview,
    getUserReviews,
    updateReview,
    deleteReview,
};
