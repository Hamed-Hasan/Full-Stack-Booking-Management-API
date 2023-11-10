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
exports.UserService = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const user_constant_1 = require("./user.constant");
const paginationHelper_1 = require("../../../helpers/paginationHelper");
exports.UserService = {
    listAllUsers: (options, filters) => __awaiter(void 0, void 0, void 0, function* () {
        const { page, limit, sortBy, sortOrder } = (0, paginationHelper_1.calculatePagination)(options);
        // Define skip and take for pagination
        const skip = (page - 1) * limit;
        const take = limit;
        // Build the WHERE condition for filtering and searching
        const andConditions = [];
        // Handling search
        if (filters.searchTerm) {
            andConditions.push({
                OR: user_constant_1.UserSearchableFields.map(field => ({
                    [field]: { contains: filters.searchTerm, mode: 'insensitive' },
                })),
            });
        }
        // Handling filtering
        user_constant_1.UserFilterableFields.forEach(field => {
            if (filters[field]) {
                andConditions.push({ [field]: { equals: filters[field] } });
            }
        });
        const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};
        // Execute the query with pagination, sorting, and filtering
        const users = yield prisma_1.default.user.findMany({
            include: {
                profile: true,
            },
            where: whereConditions,
            skip,
            take,
            orderBy: {
                [sortBy]: sortOrder,
            },
        });
        const total = yield prisma_1.default.user.count({ where: whereConditions });
        if (users.length === 0) {
            // Handle case when no results are found
            return {
                meta: {
                    total: 0,
                    page,
                    limit,
                },
                data: [],
            };
        }
        return {
            meta: {
                total,
                page,
                limit,
            },
            data: users,
        };
    }),
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma_1.default.user.findUnique({
                where: { id },
                include: {
                    bookings: true,
                    reviews: true,
                    cartItems: true,
                    blogPosts: true,
                    feedbacks: true,
                    notifications: true,
                    profile: true,
                },
            });
        });
    },
    updateUser(id, data, profileImage) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingProfile = yield prisma_1.default.profile.findUnique({
                where: { userId: id },
            });
            const profileData = Object.assign(Object.assign({}, data.profile), { profileImage: profileImage || undefined });
            if (existingProfile) {
                return yield prisma_1.default.user.update({
                    where: { id },
                    data: Object.assign(Object.assign({}, data), { profile: {
                            update: profileData,
                        } }),
                    include: { profile: true },
                });
            }
            else {
                return yield prisma_1.default.user.update({
                    where: { id },
                    data: Object.assign(Object.assign({}, data), { profile: {
                            create: profileData,
                        } }),
                    include: { profile: true },
                });
            }
        });
    },
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma_1.default.user.delete({ where: { id } });
        });
    },
};
