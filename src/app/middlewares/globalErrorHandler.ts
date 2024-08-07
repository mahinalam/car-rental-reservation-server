/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { ErrorRequestHandler } from 'express'
import { ZodError } from 'zod'
import config from '../config'
import { TErrorMessages } from '../interface/error'
import handleMongooseValidationError from '../errors/handleMongooseValidationError'
import handleCastError from '../errors/handleCastError'
import hanldeDuplicateError from '../errors/hanldeDuplicateError'
import handleZodError from '../errors/hanldeZodError'
import AppError from '../errors/appError'
export const globalErrorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  next,
) => {
  // setting default values
  let statusCode = 500
  let message = 'something went wrong!'

  let errorMessages: TErrorMessages = [
    {
      path: '',
      message: 'something went wrong',
    },
  ]
  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorMessages = simplifiedError.errorMessages
  } else if (err?.name === 'ValidationError') {
    const simplifiedError = handleMongooseValidationError(err)
    statusCode = simplifiedError?.statusCode
    message = simplifiedError?.message
    errorMessages = simplifiedError.errorMessages
  } else if (err?.name === 'CastError') {
    const simplifiedError = handleCastError(err)
    statusCode = simplifiedError?.statusCode
    message = simplifiedError?.message
    errorMessages = simplifiedError.errorMessages
  } else if (err?.code === 11000) {
    const simplifiedError = hanldeDuplicateError(err)
    statusCode = simplifiedError?.statusCode
    message = simplifiedError?.message
    errorMessages = simplifiedError.errorMessages
  } else if (err instanceof AppError) {
    statusCode = err.statusCode
    message = err?.message
    errorMessages = [
      {
        path: '',
        message: err?.message,
      },
    ]
  } else if (err instanceof Error) {
    message = err?.message
    errorMessages = [
      {
        path: '',
        message: err?.message,
      },
    ]
  }

  return res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.NODE_ENV === 'development' ? err.stack : null,
  })
}
