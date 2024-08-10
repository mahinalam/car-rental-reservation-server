import { z } from 'zod'
import { VehicleType } from './booking.interface'

// Zod schema for Booking
const createBookingValidationSchema = z.object({
  body: z.object({
    car: z.string().length(24, 'Invalid car ID format'),
    date: z.string().refine((val) => !isNaN(Date.parse(val)), {
      message: 'Invalid date format',
    }),
    startTime: z
      .string()
      .refine((val) => /^([01]\d|2[0-3]):?([0-5]\d)$/.test(val), {
        message: 'Invalid time format, must be HH:MM in 24-hour format',
      }),
  }),
})

const updateBookingValidationSchema = z.object({
  body: z.object({
    //   customer: z.string().min(1, 'Customer ID is required').trim(),
    service: z.string().min(1, 'Service ID is required').trim().optional(),
    slot: z.string().min(1, 'Slot ID is required').trim().optional(),
    vehicleType: z.nativeEnum(VehicleType).optional(),
    vehicleBrand: z
      .string()
      .min(1, 'Vehicle brand is required')
      .trim()
      .optional(),
    vehicleModel: z
      .string()
      .min(1, 'Vehicle model is required')
      .trim()
      .optional(),
    manufacturingYear: z
      .number()
      .int()
      .positive('Manufacturing year must be a positive integer')
      .optional(),
    registrationPlate: z
      .string()
      .min(1, 'Registration plate is required')
      .trim()
      .optional(),
    isDeleted: z.boolean().optional().optional(),
    createdAt: z.date().optional().optional(),
    updatedAt: z.date().optional().optional(),
  }),
})

export const BookingValidationSchema = {
  createBookingValidationSchema,
  updateBookingValidationSchema,
}
