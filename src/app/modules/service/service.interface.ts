/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose'

export interface IService {
  _id: Types.ObjectId
  name: string
  description: string
  price: number
  duration: number
  isDeleted: boolean
  createdAt: Date
  updatedAt: Date
}

export interface ServiceModel extends Model<IService> {
  isServiceExists(id: Types.ObjectId | string): Promise<IService | null>
  isServiceDeleted(): Promise<IService | null>
}
