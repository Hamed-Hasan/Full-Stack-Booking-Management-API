"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceValidation = void 0;
// validation/service.validation.ts
const zod_1 = require("zod");
const createServiceZodSchema = zod_1.z.object({
    name: zod_1.z.string().optional(),
    description: zod_1.z.string().optional(),
    pricePerHour: zod_1.z.number().optional(),
    brand: zod_1.z.string(),
    model: zod_1.z.string(),
    fuelType: zod_1.z.enum(['Petrol', 'Diesel', 'Electric', 'Hybrid']).optional(),
    transmission: zod_1.z.enum(['Manual', 'Automatic']).optional(),
    seatingCapacity: zod_1.z.number(),
    categoryId: zod_1.z.string(),
});
const updateServiceZodSchema = createServiceZodSchema.partial();
exports.ServiceValidation = {
    createServiceZodSchema,
    updateServiceZodSchema,
};
