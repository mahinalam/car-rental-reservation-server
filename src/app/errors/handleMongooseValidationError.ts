import mongoose from 'mongoose'
import { TErrorMessages, TGenericErrorResponse } from '../interface/error'

const handleMongooseValidationError = (
  err: mongoose.Error.ValidationError,
): TGenericErrorResponse => {
  const errorMessages: TErrorMessages = Object.values(err.errors).map(
    (value: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: value.path,
        message: value.message,
      }
    },
  )

  const statusCode = 400
  return {
    statusCode,
    message: 'validation error',
    errorMessages,
  }
}

export default handleMongooseValidationError
