"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingValidation = void 0;
const zod_1 = require("zod");
const bookingZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        userId: zod_1.z.string().nonempty({ message: 'User ID is required' }),
        serviceId: zod_1.z.string().nonempty({ message: 'Service ID is required' }),
        scheduledDate: zod_1.z.string().refine(value => !isNaN(Date.parse(value)), {
            message: 'Scheduled date must be a valid date-time string',
        }),
        status: zod_1.z.enum(['pending', 'confirmed', 'cancelled']).optional(),
    }),
});
const updateBookingZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        scheduledDate: zod_1.z
            .string()
            .refine(value => !isNaN(Date.parse(value)), {
            message: 'Scheduled date must be a valid date-time string',
        })
            .optional(),
        status: zod_1.z.enum(['pending', 'confirmed', 'cancelled']).optional(),
    }),
});
exports.BookingValidation = {
    bookingZodSchema,
    updateBookingZodSchema,
};
