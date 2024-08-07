import { RequestHandler } from 'express'
import sendResponse from '../../utils/sendResponse'
import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import { ServiceServices } from './service.service'
// create service
const createService: RequestHandler = catchAsync(async (req, res) => {
  const service = req.body

  const result = await ServiceServices.createServiceIntoDB(service)
  sendResponse(res, {
    statusCodeNumber: httpStatus.OK,
    success: true,
    statusCode: 200,
    message: 'Service created successfully',
    data: result,
  })
})

// get single service
const getSingleService: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params

  const result = await ServiceServices.getSingleServiceFromDB(id)
  if (!result) {
    return sendResponse(res, {
      statusCodeNumber: httpStatus.NOT_FOUND,
      success: false,
      statusCode: 404,
      message: 'No Data Found',
      data: [],
    })
  }
  sendResponse(res, {
    statusCodeNumber: httpStatus.OK,
    success: true,
    statusCode: 200,
    message: 'Service retrieved successfully',
    data: result,
  })
})
// get all services
const getAllServices: RequestHandler = catchAsync(async (req, res) => {
  const result = await ServiceServices.getAllServicesFromDB()
  sendResponse(res, {
    statusCodeNumber: httpStatus.OK,
    success: true,
    statusCode: 200,
    message: 'Services retrieved successfully',
    data: result,
  })
})

// update service
const updateService: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params
  const payload = req.body

  const result = await ServiceServices.updateServiceIntoDB(id, payload)
  sendResponse(res, {
    statusCodeNumber: httpStatus.OK,
    success: true,
    statusCode: 200,
    message: 'Service updated successfully',
    data: result,
  })
})

// delete service
const deleteService: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params

  const result = await ServiceServices.deleteServiceFromDB(id)
  sendResponse(res, {
    statusCodeNumber: httpStatus.OK,
    success: true,
    statusCode: 200,
    message: 'Service deleted successfully',
    data: result,
  })
})

export const ServiceController = {
  createService,
  getSingleService,
  getAllServices,
  updateService,
  deleteService,
}
