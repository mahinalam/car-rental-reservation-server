import { Schema, model } from 'mongoose'
import { CarModel, ICar } from './car.interface'
import { carStatus } from './car.constant'

const carSchema = new Schema<ICar>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    color: {
      type: String,
      required: true,
      trim: true,
    },
    isElectric: {
      type: Boolean,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      trim: true,
      enum: carStatus,
      default: 'available',
    },
    features: {
      type: [String],
      required: true,
      trim: true,
    },
    pricePerHour: {
      type: Number,
      required: true,
      trim: true,
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
carSchema.pre('find', function (next) {
  this.where({ isDeleted: false })
  next()
})

// check if the service exists
carSchema.statics.isCarExists = async function (
  id: string,
): Promise<ICar | null> {
  const isCarExists = await Car.findById(id)
  return isCarExists
}

export const Car = model<ICar, CarModel>('Car', carSchema)
