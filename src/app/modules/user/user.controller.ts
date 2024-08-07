import { RequestHandler } from 'express'
import catchAsync from '../../utils/catchAsync'
// import { UserServices } from './user.service'
import sendResponse from '../../utils/sendResponse'
import httpStatus from 'http-status'
// import { User } from './user.model'
import AppError from '../../errors/appError'
import { UserServices } from './user.service'
import { User } from './user.model'

const createUser: RequestHandler = catchAsync(async (req, res) => {
  const user = req.body
  const result = await UserServices.createUserIntoDB(user)
  sendResponse(res, {
    statusCodeNumber: httpStatus.OK,
    success: true,
    statusCode: 200,
    message: 'User registered successfully',
    data: result,
  })
})
const loginUser: RequestHandler = catchAsync(async (req, res) => {
  const loggedUser = req.body
  //   const zodParseData = StudentValidationSchema.parse(studentData)

  // check if the user is exists
  const user = await User.find({ email: loggedUser.email })
  if (!user) {
    throw new AppError(httpStatus.FORBIDDEN, 'unauthorized access')
  }

  const result = await UserServices.loginUserIntoDB(loggedUser)
  sendResponse(res, {
    statusCodeNumber: httpStatus.OK,
    success: true,
    statusCode: 200,
    token: result.accessToken,
    message: 'User logged in successfully',
    data: result.result,
  })
})

export const UserController = {
  createUser,
  loginUser,
}
