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
exports.CategoryService = void 0;
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const category_constant_1 = require("./category.constant");
const createCategory = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.serviceCategory.create({ data: payload });
});
const createMultipleCategories = (categories) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.serviceCategory.createMany({
        data: categories,
    });
    return result;
});
const getCategory = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.serviceCategory.findUnique({ where: { id } });
});
const updateCategory = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.serviceCategory.update({ where: { id }, data: payload });
});
const deleteCategory = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.serviceCategory.delete({ where: { id } });
});
const listCategories = (options, filters) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, sortBy, sortOrder } = (0, paginationHelper_1.calculatePagination)(options);
    // Define skip and take for pagination
    const skip = (page - 1) * limit;
    const take = limit;
    // Build the WHERE condition for filtering and searching
    const andConditions = [];
    // Handling search
    if (filters.searchTerm) {
        andConditions.push({
            OR: category_constant_1.CategorySearchableFields.map(field => ({
                [field]: { contains: filters.searchTerm, mode: 'insensitive' },
            })),
        });
    }
    // Handling filtering
    category_constant_1.CategoryFilterableFields.forEach(field => {
        if (filters[field]) {
            andConditions.push({ [field]: { equals: filters[field] } });
        }
    });
    const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};
    // Execute the query with pagination, sorting, and filtering
    const categories = yield prisma_1.default.serviceCategory.findMany({
        where: whereConditions,
        skip,
        take,
        orderBy: {
            [sortBy]: sortOrder,
        },
    });
    const total = yield prisma_1.default.serviceCategory.count({ where: whereConditions });
    return {
        meta: {
            total,
            page,
            limit,
        },
        data: categories,
    };
});
exports.CategoryService = {
    createCategory,
    createMultipleCategories,
    getCategory,
    updateCategory,
    deleteCategory,
    listCategories,
};
