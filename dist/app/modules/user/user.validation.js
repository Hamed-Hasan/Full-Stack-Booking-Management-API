"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserValidationSchema = void 0;
const zod_1 = require("zod");
const updateUserZodSchema = zod_1.z.object({
    email: zod_1.z.string().email().optional(),
    password: zod_1.z.string().optional(),
    role: zod_1.z.enum(['user', 'admin', 'superAdmin']).optional(),
    file: zod_1.z.any().optional(),
});
exports.UpdateUserValidationSchema = {
    updateUserZodSchema,
};
