import { Router } from 'express'
import { userRoutes } from '../modules/user/user.route'
import { CarRoutes } from '../modules/car/car.route'
import { BookingsRoutes } from '../modules/booking/booking.route'
const router = Router()

const moduleRoutes = [
  {
    path: '/auth',
    element: userRoutes,
  },
  {
    path: '/cars',
    element: CarRoutes,
  },
  {
    path: '/bookings',
    element: BookingsRoutes,
  },
]

moduleRoutes.forEach((route) => router.use(route.path, route.element))

export default router
