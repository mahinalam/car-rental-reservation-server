import express from 'express'
import Auth from '../../middlewares/auth'
import { USER_ROLE } from '../user/user.constant'
import { BookingController } from './booking.controller'

const router = express.Router()
router.get('/', Auth(USER_ROLE.user), BookingController.getAllUserBookings)
export const UsersBookingRoutes = router
