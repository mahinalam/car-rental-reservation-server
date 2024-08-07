import { z } from 'zod'

const createServiceValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1).trim(),
    description: z.string().min(1).trim(),
    duration: z.number().positive().int(),
    price: z.number().positive(),
    isDeleted: z.boolean().optional(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
  }),
})

const updateServiceValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1).trim().optional(),
    description: z.string().min(1).trim().optional(),
    duration: z.number().positive().int().optional(),
    price: z.number().positive().optional(),
    isDeleted: z.boolean().optional().optional(),
    createdAt: z.date().optional().optional(),
    updatedAt: z.date().optional().optional(),
  }),
})
export const ServiceValidationSchema = {
  createServiceValidationSchema,
  updateServiceValidationSchema,
}
