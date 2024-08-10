import { RequestHandler } from 'express'
import sendResponse from '../../utils/sendResponse'
import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import { CarServices } from './car.service'
// create car
const createCar: RequestHandler = catchAsync(async (req, res) => {
  const car = req.body

  const result = await CarServices.createCarIntoDB(car)
  sendResponse(res, {
    statusCodeNumber: httpStatus.OK,
    success: true,
    statusCode: 200,
    message: 'Car created successfully',
    data: result,
  })
})

// get single car
const getSingleCar: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await CarServices.getSingleCarFromDB(id)
  sendResponse(res, {
    statusCodeNumber: httpStatus.OK,
    success: true,
    statusCode: 200,
    message: 'Car retrieved successfully',
    data: result,
  })
})
// get all cars
const getAllCars: RequestHandler = catchAsync(async (req, res) => {
  const result = await CarServices.getAllCarsFromDB()
  sendResponse(res, {
    statusCodeNumber: httpStatus.OK,
    success: true,
    statusCode: 200,
    message: 'Cars retrieved successfully',
    data: result,
  })
})

// update car
const updateCar: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params
  const payload = req.body

  const result = await CarServices.updateCarIntoDB(id, payload)
  sendResponse(res, {
    statusCodeNumber: httpStatus.OK,
    success: true,
    statusCode: 200,
    message: 'Car updated successfully',
    data: result,
  })
})

const updateReturnCarInfo: RequestHandler = catchAsync(async (req, res) => {
  const payload = req.body
  const result = await CarServices.updateReturnCarInfoIntoDB(payload)
  sendResponse(res, {
    statusCodeNumber: httpStatus.OK,
    success: true,
    statusCode: 200,
    message: 'Car returned successfully',
    data: result,
  })
})

// delete car
const deleteCar: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await CarServices.deleteCarFromDB(id)
  sendResponse(res, {
    statusCodeNumber: httpStatus.OK,
    success: true,
    statusCode: 200,
    message: 'Car deleted successfully',
    data: result,
  })
})

export const CarController = {
  createCar,
  getSingleCar,
  getAllCars,
  updateCar,
  updateReturnCarInfo,
  deleteCar,
}
