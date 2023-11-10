"use strict";
// src/profile/profile.validation.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileValidation = void 0;
const zod_1 = require("zod");
const updateProfileZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        username: zod_1.z.string().optional(),
        firstName: zod_1.z.string().optional(),
        lastName: zod_1.z.string().optional(),
        dateOfBirth: zod_1.z.date().optional(),
        phoneNumber: zod_1.z.string().optional(),
        address: zod_1.z.string().optional(),
        bio: zod_1.z.string().optional(),
        profileImage: zod_1.z.string().optional(),
    }),
});
exports.ProfileValidation = {
    updateProfileZodSchema,
};
