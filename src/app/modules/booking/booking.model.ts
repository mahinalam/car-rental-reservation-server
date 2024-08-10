import { Schema, model } from 'mongoose'
import { BookingModel, IBooking } from './booking.interface'

const bookingsSchema = new Schema<IBooking>(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      trim: true,
      ref: 'User',
    },
    car: {
      type: Schema.Types.ObjectId,
      required: true,
      trim: true,
      ref: 'Car',
    },
    startTime: {
      type: String,
      required: true,
      trim: true,
    },
    endTime: {
      type: String,
      trim: true,
      default: null,
    },
    date: {
      type: String,
      required: true,
      trim: true,
    },
    totalCost: {
      type: Number,
      trim: true,
      default: 0,
    },
    isDeleted: {
      type: Boolean,
      trim: true,
      default: false,
    },
  },
  { timestamps: true },
)

// query middleware
bookingsSchema.pre('find', function (next) {
  this.where({ isDeleted: false })
  next()
})

// check if the booking exists
bookingsSchema.statics.isBookingExists = async function (
  id: string,
): Promise<IBooking | null> {
  const isBookingExists = await Booking.findById(id)
  return isBookingExists
}

export const Booking = model<IBooking, BookingModel>('Booking', bookingsSchema)
