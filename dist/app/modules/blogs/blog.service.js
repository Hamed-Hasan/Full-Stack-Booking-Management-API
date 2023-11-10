"use strict";
// blog.service.ts
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
exports.BlogService = void 0;
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const blog_constant_1 = require("./blog.constant");
const createBlogPost = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.blogPost.create({ data: payload });
});
const getBlogPost = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.blogPost.findUnique({
        where: { id },
        include: { author: true },
    });
});
const updateBlogPost = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.blogPost.update({ where: { id }, data: payload });
});
const deleteBlogPost = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.blogPost.delete({ where: { id } });
});
const listBlogPosts = (options, filters) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, sortBy, sortOrder } = (0, paginationHelper_1.calculatePagination)(options);
    // Build the WHERE condition for filtering and searching
    const andConditions = [];
    // Handling search
    if (filters.search) {
        andConditions.push({
            OR: blog_constant_1.BlogSearchableFields.map(field => ({
                [field]: { contains: filters.search, mode: 'insensitive' }, // Add 'insensitive' mode
            })),
        });
    }
    // Handling filtering
    blog_constant_1.BlogFilterableFields.forEach(field => {
        if (filters[field]) {
            andConditions.push({
                [field]: { contains: filters[field], mode: 'insensitive' },
            }); // Add 'insensitive' mode
        }
    });
    const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};
    // Execute the query with pagination, sorting, and filtering
    const blogPosts = yield prisma_1.default.blogPost.findMany({
        where: whereConditions,
        skip: options.page ? (options.page - 1) * (options.limit || 10) : 0,
        take: parseInt(options.limit, 10) || 10,
        orderBy: {
            [sortBy]: sortOrder,
        },
        include: {
            author: true,
        },
    });
    const total = yield prisma_1.default.blogPost.count({ where: whereConditions });
    return {
        meta: {
            total,
            page,
            limit,
        },
        data: blogPosts,
    };
});
exports.BlogService = {
    createBlogPost,
    getBlogPost,
    updateBlogPost,
    deleteBlogPost,
    listBlogPosts,
};
