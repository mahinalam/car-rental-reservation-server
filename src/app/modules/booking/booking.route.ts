import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { USER_ROLE } from '../user/user.constant'
import { BookingValidationSchema } from './booking.validation'
import Auth from '../../middlewares/auth'
import { BookingController } from './booking.controller'

const router = express.Router()

router.post(
  '/',
  Auth(USER_ROLE.user),
  validateRequest(BookingValidationSchema.createBookingValidationSchema),
  BookingController.createBookingAndUpdateCarStatus,
)
router.get('/', Auth(USER_ROLE.admin), BookingController.getAllBookings)
router.get(
  '/my-bookings',
  Auth(USER_ROLE.user),
  BookingController.getAllUserBookings,
)
router.put(
  '/:id',
  validateRequest(BookingValidationSchema.updateBookingValidationSchema),
  BookingController.updateBooking,
)
router.delete('/:id', Auth(USER_ROLE.admin), BookingController.deleteBooking)

export const BookingsRoutes = router
