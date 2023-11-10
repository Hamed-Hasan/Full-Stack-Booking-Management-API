"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartItemValidation = void 0;
const zod_1 = require("zod");
const createCartItemZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        userId: zod_1.z.string(),
        serviceId: zod_1.z.string(),
        quantity: zod_1.z.number().min(1),
    }),
});
const updateCartItemZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        quantity: zod_1.z.number().min(1).optional(),
    }),
});
exports.CartItemValidation = {
    createCartItemZodSchema,
    updateCartItemZodSchema,
};
