/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status'
import AppError from '../../errors/appError'
import { ICar } from './car.interface'
import { Car } from './car.model'
import { Booking } from '../booking/booking.model'
import { Types } from 'mongoose'
import { IBooking } from '../booking/booking.interface'
import { Document } from 'mongoose'
import mongoose from 'mongoose'

const createCarIntoDB = async (payload: ICar) => {
  // check if the car exists
  const car = await Car.findOne({ name: payload?.name })
  if (car) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Car already exists')
  }
  const result = await Car.create(payload)
  return result
}

// get single car
const getSingleCarFromDB = async (id: string) => {
  const isCarExists = await Car.findById(id)
  if (!isCarExists) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Car not found!')
  }
  const isDeletedCar = isCarExists.isDeleted
  if (isDeletedCar) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Car already deleted!')
  }
  return isCarExists
}

// get all cars
const getAllCarsFromDB = async () => {
  const isCarsExists = await Car.find()
  if (isCarsExists.length === 0) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Cars not found!')
  }
  return isCarsExists
}

const updateCarIntoDB = async (id: string, payload: Partial<ICar>) => {
  // check if the car exists
  const car = await Car.isCarExists(id)
  if (!car) {
    throw new AppError(httpStatus.NOT_FOUND, 'Car not found!')
  }
  const isDeletedCar = car?.isDeleted
  if (isDeletedCar) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Car already deleted!')
  }

  //   Update the car document
  const updatedCar = await Car.findByIdAndUpdate(id, payload, {
    new: true,
  })

  return updatedCar
}

const updateReturnCarInfoIntoDB = async (payload: {
  bookingId: string | Types.ObjectId
  endTime: string
}) => {
  const { bookingId, endTime } = payload
  // check if the booking exists
  const booking = await Booking.isBookingExists(bookingId)

  const bookingDocument = booking as Document & IBooking
  if (!booking) {
    throw new AppError(httpStatus.NOT_FOUND, 'Booking not found!')
  }

  const isDeletedBooking = booking?.isDeleted
  if (isDeletedBooking) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Booking already deleted!')
  }

  // Combine the booking date with the startTime and endTime to create full Date objects
  const startDateTime = new Date(`${booking.date}T${booking.startTime}:00Z`)
  const endDateTime = new Date(`${booking.date}T${endTime}:00Z`)
  // Validate that endDateTime is greater than startDateTime
  if (endDateTime <= startDateTime) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'End time must be greater than start time',
    )
  }

  // check if the car exists
  const car = await Car.isCarExists(booking.car)
  if (!car) {
    throw new AppError(httpStatus.NOT_FOUND, 'Car not found!')
  }

  // Calculate the difference in milliseconds
  const differenceInMs = endDateTime.getTime() - startDateTime.getTime()

  // Convert the difference to hours
  const differenceInHours = differenceInMs / (1000 * 60 * 60)
  // calculate total cost
  const totalCost = Number(differenceInHours) * Number(car.pricePerHour)

  const updatedBookingData = {
    ...bookingDocument.toObject(), // Convert the booking document to a plain object
    endTime: endTime,
    totalCost: totalCost,
  }

  // Optionally, delete properties that shouldn't be updated or are immutable
  delete updatedBookingData._id
  delete updatedBookingData.__v
  delete updatedBookingData.createdAt
  delete updatedBookingData.updatedAt

  // transaction
  const session = await mongoose.startSession()
  try {
    session.startTransaction()
    // update car status (transaction-1)
    const updatedCar = await Car.findByIdAndUpdate(
      car._id,
      { status: 'available' },
      { new: true, session },
    )
    if (!updatedCar) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to upadte car status')
    }

    // update booking info (transaction-1)
    const updatedBooking = await Booking.findByIdAndUpdate(
      bookingId,
      updatedBookingData,
      { new: true, session },
    )
      .populate('car')
      .populate('user')
    if (!updatedBooking) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Failed to upadte Booking Info',
      )
    }
    // console.log('updatedBooking', updatedBooking)

    await session.commitTransaction()
    await session.endSession()

    return updatedBooking
  } catch (err: any) {
    await session.abortTransaction()
    await session.endSession()
    throw new Error(err)
  }
}

// delete car(softDelete) from db
const deleteCarFromDB = async (id: string) => {
  const car = await Car.isCarExists(id)
  if (!car) {
    throw new AppError(httpStatus.NOT_FOUND, 'Car not found!')
  }
  const isDeletedCar = car.isDeleted
  if (isDeletedCar) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Car already deleted!')
  }

  const result = await Car.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  )
  return result
}

export const CarServices = {
  createCarIntoDB,
  getSingleCarFromDB,
  getAllCarsFromDB,
  updateCarIntoDB,
  deleteCarFromDB,
  updateReturnCarInfoIntoDB,
}
