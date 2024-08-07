import { z } from 'zod'

const createSlotValidationSchema = z.object({
  body: z
    .object({
      service: z.string().trim(),
      date: z.string(),
      startTime: z.string(),
      endTime: z.string(),
      isBooked: z.boolean().optional(),
    })
    .refine(
      (body) => {
        const start = new Date(`1970-01-01T${body.startTime}:00`)
        const end = new Date(`1970-01-01T${body.endTime}:00`)
        return end > start
      },
      {
        message: 'Start time should be before End Time!',
      },
    ),
})

export const SlotValidationSchema = {
  createSlotValidationSchema,
}
