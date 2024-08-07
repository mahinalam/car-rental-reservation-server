/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
import httpStatus from 'http-status'
import AppError from '../../errors/appError'
import { ISlot } from './slot.interface'
import { Slot } from './slot.model'

const createSlotIntoDB = async (payload: ISlot) => {
  const isSlotExists = await Slot.isSlotExists(payload.service)
  if (isSlotExists) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'A slot with the same service already exists.',
    )
  }
  const { startTime, endTime, service, date } = payload
  let slots = []
  let currentStartTime = new Date(`${date}T${startTime}`)
  const finalEndTime = new Date(`${date}T${endTime}`)

  while (currentStartTime < finalEndTime) {
    let nextStartTime = new Date(currentStartTime)
    nextStartTime.setHours(nextStartTime.getHours() + 1)

    if (nextStartTime > finalEndTime) {
      break
    }

    const slot = new Slot({
      service: service,
      date: date,
      startTime: currentStartTime.toTimeString().split(' ')[0].substring(0, 5),
      endTime: nextStartTime.toTimeString().split(' ')[0].substring(0, 5),
      isBooked: false,
    })

    slots.push(slot)
    currentStartTime = nextStartTime
  }

  await Slot.insertMany(slots)
  return slots
}

// get available slots
const getAvailableSlotsFromDB = async (query: Record<string, unknown>) => {
  const { date, serviceId } = query
  let filter = {}
  if (date) {
    ;(filter as any).date = date
  }
  if (serviceId) {
    ;(filter as any).service = serviceId
  }
  const result = await Slot.find(filter).populate('service')
  if (Object.entries(result).length === 0) {
    throw new AppError(httpStatus.NOT_FOUND, 'No Slot found!')
  }
  return result
}

export const SlotService = {
  createSlotIntoDB,
  getAvailableSlotsFromDB,
}
