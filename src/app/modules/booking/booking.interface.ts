/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose'

export enum VehicleType {
  Car = 'car',
  Truck = 'truck',
  SUV = 'SUV',
  Van = 'van',
  Motorcycle = 'motorcycle',
  Bus = 'bus',
  ElectricVehicle = 'electricVehicle',
  HybridVehicle = 'hybridVehicle',
  Bicycle = 'bicycle',
  Tractor = 'tractor',
}

export interface IBooking {
  _id: Types.ObjectId
  user: Types.ObjectId
  car: Types.ObjectId
  startTime: string
  endTime: string
  date: string
  totalCost: number
  createdAt: Date
  updatedAt: Date
  isDeleted: boolean
}

export interface BookingModel extends Model<IBooking> {
  isBookingExists(id: Types.ObjectId | string): Promise<IBooking | null>
  isBookingDeleted(): Promise<IBooking | null>
}
