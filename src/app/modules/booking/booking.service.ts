/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status'
import AppError from '../../errors/appError'
import { Service } from '../service/service.model'
import { User } from '../user/user.model'
import { IBooking } from './booking.interface'
import { Booking } from './booking.model'
import { Slot } from '../slot/slot.model'

// create booking
const createBookingIntoDB = async (email: string, payload: IBooking) => {
  const {
    vehicleType,
    vehicleBrand,
    vehicleModel,
    manufacturingYear,
    registrationPlate,
    service,
    slot,
  } = payload
  const user = await User.findOne({ email })
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found!')
  }
  const serviceInfo = await Service.isServiceExists(service)
  if (!serviceInfo) {
    throw new AppError(httpStatus.NOT_FOUND, 'Service not found!')
  }
  const slotInfo = await Slot.isSlotExists(slot)
  if (!slotInfo) {
    throw new AppError(httpStatus.NOT_FOUND, 'Slot not found!')
  }
  const updatedBooking = {
    service,
    customer: user._id,
    slot,
    vehicleType,
    vehicleBrand,
    vehicleModel,
    manufacturingYear,
    registrationPlate,
  }
  const result = (
    await (
      await (await Booking.create(updatedBooking)).populate('customer')
    ).populate('service')
  ).populate('slot')
  return result
}

const getAllBookingsFromDB = async (email: string) => {
  const user = await User.findOne({ email })
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found!')
  }
  const isUserDeleted = user?.isDeleted
  if (isUserDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, 'User already deleted!')
  }
  const result = await Booking.find()
    .populate('customer')
    .populate('service')
    .populate('slot')
  if (Object.entries(result).length === 0) {
    throw new AppError(httpStatus.NOT_FOUND, 'No Bookings found!')
  }
  return result
}
const getAllUserBookingsFromDB = async (email: string) => {
  const user = await User.findOne({ email })
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found!')
  }
  const isUserDeleted = user?.isDeleted
  if (isUserDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, 'User already deleted!')
  }
  const customerId = user._id
  const result = await Booking.find({ customer: customerId })
    .populate('customer')
    .populate('service')
    .populate('slot')
  if (Object.entries(result).length === 0) {
    throw new AppError(httpStatus.NOT_FOUND, "No User's Bookings found!")
  }
  return result
}

const updateBookingIntoDB = async (id: string, payload: Partial<IBooking>) => {
  const result = await Booking.findByIdAndUpdate(id, payload, { new: true })
  return result
}
const deleteBookingFromDB = async (id: string) => {
  const result = await Booking.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  )
  return result
}

export const BookingService = {
  createBookingIntoDB,
  getAllBookingsFromDB,
  getAllUserBookingsFromDB,
  updateBookingIntoDB,
  deleteBookingFromDB,
}
