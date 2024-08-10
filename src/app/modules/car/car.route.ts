import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import Auth from '../../middlewares/auth'
import { USER_ROLE } from '../user/user.constant'
import { CarValidationSchema } from './car.validation'
import { CarController } from './car.controller'

const router = express.Router()
// admin
//Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5haGlkQGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcyMzE2Nzk5MSwiZXhwIjoxNzI0MDMxOTkxfQ.Tcmy1O81hlHoIjN4NxerndDSza96VlJoGgMVS_fOPh8

// user
//Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1haGluQGdtYWlsLmNvbSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzIzMTY4MjE3LCJleHAiOjE3MjQwMzIyMTd9.nyeuYWT-eatM5AH0MZggeEsoNtx6SwHAAqQl1jOi_F4

router.post(
  '/',
  Auth(USER_ROLE.admin),
  validateRequest(CarValidationSchema.createCarValidationSchema),
  CarController.createCar,
)
router.get('/', CarController.getAllCars)
router.get('/:id', CarController.getSingleCar)

router.put(
  '/return',
  Auth(USER_ROLE.admin),
  validateRequest(CarValidationSchema.returnCarValidationSchema),
  CarController.updateReturnCarInfo,
)
router.put(
  '/update-car/:id',
  Auth(USER_ROLE.admin),
  validateRequest(CarValidationSchema.updateCarValidationSchema),
  CarController.updateCar,
)
router.delete('/:id', Auth(USER_ROLE.admin), CarController.deleteCar)

export const CarRoutes = router
