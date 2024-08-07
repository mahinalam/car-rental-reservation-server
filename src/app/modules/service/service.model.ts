import { Schema, model } from 'mongoose'
import { IService, ServiceModel } from './service.interface'

const serviceSchema = new Schema<IService>(
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
    duration: {
      type: Number,
      required: true,
      trim: true,
      unique: true,
    },
    price: {
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
serviceSchema.pre('find', function (next) {
  this.where({ isDeleted: false })
  next()
})

// check if the service exists
serviceSchema.statics.isServiceExists = async function (
  id: string,
): Promise<IService | null> {
  const isServiceExists = await Service.findById(id)
  return isServiceExists
}

export const Service = model<IService, ServiceModel>('Service', serviceSchema)
