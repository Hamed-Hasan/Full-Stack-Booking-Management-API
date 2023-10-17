// validation/service.validation.ts
import { z } from 'zod';

const createServiceZodSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  pricePerHour: z.number().optional(),
  brand: z.string(),
  model: z.string(),
  fuelType: z.enum(['Petrol', 'Diesel', 'Electric', 'Hybrid']).optional(),
  transmission: z.enum(['Manual', 'Automatic']).optional(),
  seatingCapacity: z.number(),
  categoryId: z.string(),
});

const updateServiceZodSchema = createServiceZodSchema.partial();

export const ServiceValidation = {
  createServiceZodSchema,
  updateServiceZodSchema,
};
