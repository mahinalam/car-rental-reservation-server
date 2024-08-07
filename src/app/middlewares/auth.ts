import { NextFunction, Request, Response } from 'express'
import catchAsync from '../utils/catchAsync'
import jwt, { JwtPayload } from 'jsonwebtoken'
import config from '../config'
import { TUserRole } from '../modules/user/user.interface'
const Auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) {
      res.status(401).json({
        success: false,
        statusCode: 401,
        message: 'You have no access to this route',
      })
    }
    // check if the token is valid
    jwt.verify(
      token as string,
      config.access_token_secret as string,
      function (err, decoded) {
        if (err) {
          res.status(401).json({
            success: false,
            statusCode: 401,
            message: 'You have no access to this route',
          })
        }
        const role = (decoded as JwtPayload).role
        if (requiredRoles && !requiredRoles.includes(role)) {
          res.status(401).json({
            success: false,
            statusCode: 401,
            message: 'You have no access to this route',
          })
        }
        req.user = decoded as JwtPayload
        next()
      },
    )
  })
}

export default Auth
