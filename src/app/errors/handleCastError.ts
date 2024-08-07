import mongoose from 'mongoose'
import { TErrorMessages, TGenericErrorResponse } from '../interface/error'

const handleCastError = (
  err: mongoose.Error.CastError,
): TGenericErrorResponse => {
  const errorMessages: TErrorMessages = [
    {
      path: err?.path,
      message: err?.message,
    },
  ]

  const statusCode = 400
  return {
    statusCode,
    message: 'invalid ID',
    errorMessages: errorMessages,
  }
}

export default handleCastError
