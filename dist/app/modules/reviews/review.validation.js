"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewValidation = exports.RatingValueEnum = void 0;
const zod_1 = require("zod");
exports.RatingValueEnum = zod_1.z.union([
    zod_1.z.literal('ONE'),
    zod_1.z.literal('TWO'),
    zod_1.z.literal('THREE'),
    zod_1.z.literal('FOUR'),
    zod_1.z.literal('FIVE'),
]);
const reviewZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        review: zod_1.z.string(),
        rating: exports.RatingValueEnum,
    }),
});
const createReviewZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        userId: zod_1.z.string().uuid(),
        serviceId: zod_1.z.string().uuid(),
        review: zod_1.z.string(),
        rating: exports.RatingValueEnum,
    }),
});
exports.ReviewValidation = {
    reviewZodSchema,
    createReviewZodSchema,
};
