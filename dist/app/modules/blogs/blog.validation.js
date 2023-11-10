"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogValidation = void 0;
const zod_1 = require("zod");
const createBlogPostSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().nonempty({ message: 'Title is required' }),
        content: zod_1.z.string().nonempty({ message: 'Content is required' }),
        authorId: zod_1.z.string().nonempty({ message: 'Author ID is required' }),
    }),
});
const updateBlogPostSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().nonempty({ message: 'Title is required' }).optional(),
        content: zod_1.z.string().nonempty({ message: 'Content is required' }).optional(),
        authorId: zod_1.z
            .string()
            .nonempty({ message: 'Author ID is required' })
            .optional(),
    }),
});
exports.BlogValidation = {
    createBlogPostSchema,
    updateBlogPostSchema,
};
