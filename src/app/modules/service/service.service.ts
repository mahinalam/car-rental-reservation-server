/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status'
import AppError from '../../errors/appError'
import { Service } from './service.model'
import { IService } from './service.interface'

const createServiceIntoDB = async (payload: IService) => {
  // check if the service exists
  const service = await Service.findOne({ name: payload?.name })
  if (service) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Service already exists')
  }
  const result = await Service.create(payload)
  return result
}

const getSingleServiceFromDB = async (id: string) => {
  const isServiceExists = await Service.findById(id)
  if (!isServiceExists) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Service not found!')
  }
  const isDeletedService = isServiceExists.isDeleted
  if (isDeletedService) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Service already deleted!')
  }
  return isServiceExists
}
const getAllServicesFromDB = async () => {
  const isServiceExists = await Service.find()
  if (isServiceExists.length === 0) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Services not found!')
  }
  return isServiceExists
}

const updateServiceIntoDB = async (id: string, payload: Partial<IService>) => {
  // check if the service exists
  const service = await Service.isServiceExists(id)
  if (!service) {
    throw new AppError(httpStatus.NOT_FOUND, 'Service not found!')
  }
  const isDeletedService = service?.isDeleted
  if (isDeletedService) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Service already deleted!')
  }

  //   Update the service document
  const updatedService = await Service.findByIdAndUpdate(id, payload, {
    new: true,
  })

  return updatedService
}

// delete service(softDelete) from db
const deleteServiceFromDB = async (id: string) => {
  const service = await Service.isServiceExists(id)
  if (!service) {
    throw new AppError(httpStatus.NOT_FOUND, 'Service not found!')
  }
  const isDeletedService = service.isDeleted
  if (isDeletedService) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Service already deleted!')
  }

  const result = await Service.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  )
  return result
}

export const ServiceServices = {
  createServiceIntoDB,
  getSingleServiceFromDB,
  getAllServicesFromDB,
  updateServiceIntoDB,
  deleteServiceFromDB,
}
