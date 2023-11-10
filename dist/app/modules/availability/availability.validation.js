"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AvailabilityValidation = void 0;
const zod_1 = require("zod");
const daysOfWeekSchema = zod_1.z.object({
    Monday: zod_1.z.boolean().optional(),
    Tuesday: zod_1.z.boolean().optional(),
    Wednesday: zod_1.z.boolean().optional(),
    Thursday: zod_1.z.boolean().optional(),
    Friday: zod_1.z.boolean().optional(),
    Saturday: zod_1.z.boolean().optional(),
    Sunday: zod_1.z.boolean().optional(),
});
const createUpdateAvailabilitySchema = zod_1.z.object({
    body: zod_1.z.object({
        serviceId: zod_1.z.string(),
        startDate: zod_1.z.date(),
        endDate: zod_1.z.date(),
        startTime: zod_1.z.string(),
        endTime: zod_1.z.string(),
        daysOfWeek: daysOfWeekSchema,
    }),
});
exports.AvailabilityValidation = {
    createUpdateAvailabilitySchema,
};
