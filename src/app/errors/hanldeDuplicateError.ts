/* eslint-disable @typescript-eslint/no-explicit-any */
import { TErrorMessages, TGenericErrorResponse } from '../interface/error'

const hanldeDuplicateError = (err: any): TGenericErrorResponse => {
  // Regular expression to match the text within double quotes
  const pattern = /"([^"]*)"/

  // Find the match for the pattern
  const match = err.message.match(pattern)
  const extractedMessage = match && match[1]

  const errorMessages: TErrorMessages = [
    {
      path: '',
      message: extractedMessage
        ? `${extractedMessage} is already exists!`
        : 'something went wrong!',
    },
  ]

  const statusCode = 400

  return {
    statusCode,
    message: 'Duplicate Error',
    errorMessages: errorMessages,
  }
}

export default hanldeDuplicateError
