"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryValidation = void 0;
const zod_1 = require("zod");
const createCategoryZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().nonempty({ message: 'Name is required' }),
    }),
});
const updateCategoryZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().nonempty({ message: 'Name is required' }).optional(),
    }),
});
const createMultipleCategoriesZodSchema = zod_1.z.object({
    body: zod_1.z.array(zod_1.z.object({
        name: zod_1.z.string().nonempty({ message: 'Name is required' }),
    })),
});
exports.CategoryValidation = {
    createCategoryZodSchema,
    updateCategoryZodSchema,
    createMultipleCategoriesZodSchema,
};
