/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose'

export interface ICar {
  _id: Types.ObjectId
  name: string
  description: string
  color: string
  isElectric: boolean
  status: 'available' | 'unavailable'
  features: string[]
  pricePerHour: number
  isDeleted: boolean
  createdAt: Date
  updatedAt: Date
}

export interface CarModel extends Model<ICar> {
  isCarExists(id: Types.ObjectId | string): Promise<ICar | null>
  isCarDeleted(): Promise<ICar | null>
}
