"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidation = void 0;
const zod_1 = require("zod");
const registerZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string().email({ message: 'Invalid email address' }),
        password: zod_1.z.string().min(6, { message: 'Password too short' }),
    }),
});
const loginZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string().email({ message: 'Invalid email address' }),
        password: zod_1.z.string().min(6, { message: 'Password too short' }),
    }),
});
const changePasswordZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        oldPassword: zod_1.z.string().min(6, { message: 'Password too short' }),
        newPassword: zod_1.z.string().min(6, { message: 'Password too short' }),
    }),
});
exports.AuthValidation = {
    registerZodSchema,
    loginZodSchema,
    changePasswordZodSchema,
};
