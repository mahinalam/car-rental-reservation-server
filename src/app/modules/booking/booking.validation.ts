import { z } from 'zod'
import { VehicleType } from './booking.interface'

// Zod schema for Booking
const createBookingValidationSchema = z.object({
  body: z.object({
    //   customer: z.string().min(1, 'Customer ID is required').trim(),
    service: z.string().min(1, 'Service ID is required').trim(),
    slot: z.string().min(1, 'Slot ID is required').trim(),
    vehicleType: z.nativeEnum(VehicleType),
    vehicleBrand: z.string().min(1, 'Vehicle brand is required').trim(),
    vehicleModel: z.string().min(1, 'Vehicle model is required').trim(),
    manufacturingYear: z
      .number()
      .int()
      .positive('Manufacturing year must be a positive integer'),
    registrationPlate: z
      .string()
      .min(1, 'Registration plate is required')
      .trim(),
    isDeleted: z.boolean().optional(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
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
