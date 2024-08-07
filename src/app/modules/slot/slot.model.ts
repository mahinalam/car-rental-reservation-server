import { Schema, Types, model } from 'mongoose'
import { ISlot, SlotModel } from './slot.interface'

const slotSchema = new Schema<ISlot>(
  {
    service: {
      type: Schema.Types.ObjectId,
      required: true,
      trim: true,
      ref: 'Service',
    },
    date: {
      type: String,
      required: true,
      trim: true,
    },
    startTime: {
      type: String,
      required: true,
      trim: true,
    },
    endTime: {
      type: String,
      required: true,
      trim: true,
    },
    isBooked: {
      type: Boolean,
      default: false,
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
slotSchema.pre('find', function (next) {
  this.where({ isDeleted: false })
  next()
})
slotSchema.pre('find', function (next) {
  this.where({ isBooked: false })
  next()
})

// check if the slot exists
slotSchema.statics.isSlotExists = async function (
  id: Types.ObjectId | string,
): Promise<ISlot | null> {
  const isSlotExists = await Slot.findOne({ service: id })
  return isSlotExists
}

export const Slot = model<ISlot, SlotModel>('Slot', slotSchema)
