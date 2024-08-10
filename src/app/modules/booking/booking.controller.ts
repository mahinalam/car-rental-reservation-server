import { RequestHandler } from 'express'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import httpStatus from 'http-status'
import { BookingService } from './booking.service'

// create booking
const createBookingAndUpdateCarStatus: RequestHandler = catchAsync(
  async (req, res) => {
    const booking = req.body
    const user = req.user.email
    const result = await BookingService.createBookingAndUpdateCarStatusIntoDB(
      user,
      booking,
    )
    sendResponse(res, {
      statusCodeNumber: httpStatus.OK,
      success: true,
      statusCode: 200,
      message: 'Car booked successfully',
      data: result,
    })
  },
)
// get all bookings
const getAllBookings: RequestHandler = catchAsync(async (req, res) => {
  const customer = req.user.email
  const result = await BookingService.getAllBookingsFromDB(customer)
  sendResponse(res, {
    statusCodeNumber: httpStatus.OK,
    success: true,
    statusCode: 200,
    message: 'All bookings retrieved successfully',
    data: result,
  })
})

// get all bookings
const getAllUserBookings: RequestHandler = catchAsync(async (req, res) => {
  const email = req.user?.email
  const result = await BookingService.getAllUserBookingsFromDB(email)
  sendResponse(res, {
    statusCodeNumber: httpStatus.OK,
    success: true,
    statusCode: 200,
    message: 'User bookings retrieved successfully',
    data: result,
  })
})

// update booking
const updateBooking: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params
  const updatedBooking = req.body
  const result = await BookingService.updateBookingIntoDB(id, updatedBooking)
  sendResponse(res, {
    statusCodeNumber: httpStatus.OK,
    success: true,
    statusCode: 200,
    message: 'Booking updated successfully',
    data: result,
  })
})
// delete booking
const deleteBooking: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await BookingService.deleteBookingFromDB(id)
  sendResponse(res, {
    statusCodeNumber: httpStatus.OK,
    success: true,
    statusCode: 200,
    message: 'Booking deleted successfully',
    data: result,
  })
})

export const BookingController = {
  createBookingAndUpdateCarStatus,
  getAllBookings,
  updateBooking,
  deleteBooking,
  getAllUserBookings,
}
