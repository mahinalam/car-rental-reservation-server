import { Router } from 'express'
import { userRoutes } from '../modules/user/user.route'
import { ServiceRoutes } from '../modules/service/service.route'
import { SlotRoutes } from '../modules/slot/slot.route'
import { BookingsRoutes } from '../modules/booking/booking.route'
import { UsersBookingRoutes } from '../modules/booking/user.booking.route'
const router = Router()

const moduleRoutes = [
  {
    path: '/auth',
    element: userRoutes,
  },
  {
    path: '/services',
    element: ServiceRoutes,
  },
  {
    path: '/slots',
    element: SlotRoutes,
  },
  {
    path: '/bookings',
    element: BookingsRoutes,
  },
  {
    path: '/my-bookings',
    element: UsersBookingRoutes,
  },
]

moduleRoutes.forEach((route) => router.use(route.path, route.element))

export default router
