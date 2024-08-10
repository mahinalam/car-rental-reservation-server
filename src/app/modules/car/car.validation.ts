import { z } from 'zod'
import { carStatus } from './car.constant'

const createCarValidationSchema = z.object({
  body: z.object({
    name: z.string().trim().min(1, 'Car name is required'),
    description: z.string().trim().min(1, 'Description is required'),
    color: z.string().trim().min(1, 'Color is required'),
    isElectric: z.boolean(),
    status: z.enum(carStatus as [string, ...string[]]).optional(),
    features: z
      .array(z.string().trim())
      .nonempty('Features must include at least one item'),
    pricePerHour: z
      .number()
      .positive('Price per hour must be a positive number'),
  }),
})

const updateCarValidationSchema = z.object({
  body: z.object({
    name: z.string().trim().min(1, 'Car name is required').optional(),
    description: z.string().trim().min(1, 'Description is required').optional(),
    color: z.string().trim().min(1, 'Color is required').optional(),
    isElectric: z.boolean().optional(),
    status: z.enum(carStatus as [string, ...string[]]).optional(),
    features: z
      .array(z.string().trim())
      .nonempty('Features must include at least one item')
      .optional(),
    pricePerHour: z
      .number()
      .positive('Price per hour must be a positive number')
      .optional(),
    isDeleted: z.boolean().optional().default(false).optional(),
  }),
})
const returnCarValidationSchema = z.object({
  body: z.object({
    bookingId: z.string().length(24, 'Invalid booking ID'),
    endTime: z
      .string()
      .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Invalid time format'), // Validates time in HH:mm format
  }),
})
export const CarValidationSchema = {
  createCarValidationSchema,
  updateCarValidationSchema,
  returnCarValidationSchema,
}
