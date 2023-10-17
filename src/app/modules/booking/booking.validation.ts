import { z } from 'zod';

const bookingZodSchema = z.object({
  body: z.object({
    userId: z.string().nonempty({ message: 'User ID is required' }),
    serviceId: z.string().nonempty({ message: 'Service ID is required' }),
    scheduledDate: z.string().refine(value => !isNaN(Date.parse(value)), {
      message: 'Scheduled date must be a valid date-time string',
    }),
    status: z.enum(['pending', 'confirmed', 'cancelled']).optional(),
  }),
});

const updateBookingZodSchema = z.object({
  body: z.object({
    scheduledDate: z
      .string()
      .refine(value => !isNaN(Date.parse(value)), {
        message: 'Scheduled date must be a valid date-time string',
      })
      .optional(),
    status: z.enum(['pending', 'confirmed', 'cancelled']).optional(),
  }),
});

export const BookingValidation = {
  bookingZodSchema,
  updateBookingZodSchema,
};
