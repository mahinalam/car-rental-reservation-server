import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { ServiceValidationSchema } from './service.validation'
import { ServiceController } from './service.controller'
import { SlotValidationSchema } from '../slot/slot.validation'
import { SlotController } from '../slot/slot.controller'
import Auth from '../../middlewares/auth'
import { USER_ROLE } from '../user/user.constant'

const router = express.Router()

router.post(
  '/',
  Auth(USER_ROLE.admin),
  validateRequest(ServiceValidationSchema.createServiceValidationSchema),
  ServiceController.createService,
)
router.get('/', ServiceController.getAllServices)
router.get('/:id', ServiceController.getSingleService)
router.put(
  '/:id',
  Auth(USER_ROLE.admin),
  validateRequest(ServiceValidationSchema.updateServiceValidationSchema),

  ServiceController.updateService,
)
router.delete('/:id', Auth(USER_ROLE.admin), ServiceController.deleteService)

router.post(
  '/slots',
  Auth(USER_ROLE.admin),
  validateRequest(SlotValidationSchema.createSlotValidationSchema),
  SlotController.createSlot,
)

export const ServiceRoutes = router
