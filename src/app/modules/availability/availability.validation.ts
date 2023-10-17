import { z } from 'zod';

const daysOfWeekSchema = z.object({
  Monday: z.boolean().optional(),
  Tuesday: z.boolean().optional(),
  Wednesday: z.boolean().optional(),
  Thursday: z.boolean().optional(),
  Friday: z.boolean().optional(),
  Saturday: z.boolean().optional(),
  Sunday: z.boolean().optional(),
});

const createUpdateAvailabilitySchema = z.object({
  body: z.object({
    serviceId: z.string(),
    startDate: z.date(),
    endDate: z.date(),
    startTime: z.string(),
    endTime: z.string(),
    daysOfWeek: daysOfWeekSchema,
  }),
});

export const AvailabilityValidation = {
  createUpdateAvailabilitySchema,
};
