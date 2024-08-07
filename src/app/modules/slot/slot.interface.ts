/* eslint-disable no-unused-vars */
import { Model } from 'mongoose'
import { Types } from 'mongoose'

export interface ISlot {
  _id: Types.ObjectId
  service: Types.ObjectId
  date: string
  startTime: string
  endTime: string
  isBooked: boolean
  isDeleted: boolean
}

export interface SlotModel extends Model<ISlot> {
  isSlotExists(id: Types.ObjectId | string): Promise<ISlot | null>
  isSlotDeleted(): Promise<ISlot | null>
}
