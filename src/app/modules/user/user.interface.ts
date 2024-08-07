/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose'
import { USER_ROLE } from './user.constant'

export interface IUser {
  _id: Types.ObjectId
  name: string
  email: string
  password: string
  phone: string
  role: TUserRole
  address: string
  isDeleted: boolean
  createdAt: Date
  updatedAt: Date
}

export interface ILoginUser {
  email: string
  password: string
}

export type TUserRole = keyof typeof USER_ROLE

export interface UserModel extends Model<IUser> {
  isUserExists(email: string): Promise<IUser>
  isUserDeleted(email: string): Promise<boolean>
  isPasswordMatched(
    plainTextPassword: string,
    hashPassword: string,
  ): Promise<boolean>
}
