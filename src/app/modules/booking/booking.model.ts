import { Schema, model } from 'mongoose'
import { IBooking, VehicleType } from './booking.interface'

const bookingsSchema = new Schema<IBooking>(
  {
    customer: {
      type: Schema.Types.ObjectId,
      required: true,
      trim: true,
      ref: 'User',
    },
    service: {
      type: Schema.Types.ObjectId,
      required: true,
      trim: true,
      ref: 'Service',
    },
    slot: { type: Schema.Types.ObjectId, ref: 'Slot', required: true },
    vehicleType: {
      type: String,
      enum: Object.values(VehicleType),
      required: true,
    },
    vehicleBrand: { type: String, required: true, trim: true },
    vehicleModel: { type: String, required: true, trim: true },
    manufacturingYear: { type: Number, required: true },
    registrationPlate: { type: String, required: true, trim: true },
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

export const Booking = model<IBooking>('Booking', bookingsSchema)
