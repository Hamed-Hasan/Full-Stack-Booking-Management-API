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
exports.CartItemService = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const addCartItem = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.cartItem.create({
        data: payload,
        include: {
            user: true,
            service: true,
        },
    });
});
const updateCartItem = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.cartItem.update({
        where: { id },
        data: payload,
        include: {
            user: true,
            service: true,
        },
    });
});
const removeCartItem = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.cartItem.delete({ where: { id } });
});
const listCartItems = (userId, page, limit) => __awaiter(void 0, void 0, void 0, function* () {
    const skip = (page - 1) * limit;
    const whereConditions = {
        userId: userId,
    };
    const total = yield prisma_1.default.cartItem.count({ where: whereConditions });
    const cartItems = yield prisma_1.default.cartItem.findMany({
        where: whereConditions,
        include: {
            user: true,
            service: true,
        },
        skip,
        take: limit,
    });
    return {
        meta: {
            total,
            page,
            limit,
        },
        data: cartItems,
    };
});
const getCartItem = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.cartItem.findUnique({
        where: { id },
        include: {
            user: true,
            service: true,
        },
    });
});
exports.CartItemService = {
    addCartItem,
    updateCartItem,
    removeCartItem,
    listCartItems,
    getCartItem,
};
