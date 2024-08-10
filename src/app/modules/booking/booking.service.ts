/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status'
import AppError from '../../errors/appError'
import { Car } from '../car/car.model'
import { User } from '../user/user.model'
import { IBooking } from './booking.interface'
import { Booking } from './booking.model'
import mongoose from 'mongoose'

// create booking
const createBookingAndUpdateCarStatusIntoDB = async (
  email: string,
  payload: IBooking,
) => {
  const { car, startTime, date } = payload
  const user = await User.findOne({ email })
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found!')
  }
  const carInfo = await Car.isCarExists(car)
  if (!carInfo) {
    throw new AppError(httpStatus.NOT_FOUND, 'Car not found!')
  }

  const updatedBooking = {
    date,
    startTime,
    user: user._id,
    car: carInfo._id,
  }

  const session = await mongoose.startSession()
  try {
    session.startTransaction()
    // update car status (transaction-1)
    const updatedCar = await Car.findByIdAndUpdate(
      carInfo._id,
      { status: 'unavailable' },
      { new: true, session },
    )
    if (!updatedCar) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to upadte car status')
    }

    // create a booking (transaction-2)
    const result = await (
      await (await Booking.create(updatedBooking)).populate('car')
    ).populate('user')
    //create a booking
    if (!result) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create Booking')
    }

    await session.commitTransaction()
    await session.endSession()

    return result
  } catch (err: any) {
    await session.abortTransaction()
    await session.endSession()
    throw new Error(err)
  }
  // Create the booking
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
  const result = await Booking.find().populate('user').populate('car')
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
  const userId = user._id
  const result = await Booking.find({ user: userId })
    .populate('user')
    .populate('car')
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
  createBookingAndUpdateCarStatusIntoDB,
  getAllBookingsFromDB,
  getAllUserBookingsFromDB,
  updateBookingIntoDB,
  deleteBookingFromDB,
}
