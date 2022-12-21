import { Request, Response } from 'express'
import { Payload, STATUS_CODE } from '../constants'
import User from '../models/User'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import { MyRequest } from './types'

dotenv.config()
const jwtSecret: string = process.env.JWT_SECRET || "MVCH"
const jwtExpiration: string = process.env.JWT_EXPIRATION || "1 day"
const saltRounds: number = parseInt(process.env.BCRYPT_SALT || "123")

export const login = async (req: MyRequest<{ email: string, password: string }>, res: Response) => {
  try {
    const {
      email,
      password
    } = req.body

    const user = await User.findOne({ email })
    if (!user) {
      return res
        .status(STATUS_CODE.BAD_REQUEST)
        .json({
          ok: false,
          message: 'User with email not found'
        })
    }

    const isMatch = bcrypt.compareSync(password, user.password!)
    if (!isMatch) {
      return res
        .status(STATUS_CODE.BAD_REQUEST)
        .json({
          ok: false,
          message: 'Password not match'
        })
    }

    const payload: Payload = {
      userId: user!._id.toString()
    }

    user.lastLoginAt = new Date()
    await user.save()

    jwt.sign(
      payload,
      jwtSecret,
      { expiresIn: jwtExpiration },
      (err, token) => {
        if (err) throw err;
        res.status(STATUS_CODE.OK).json({ ok: true, name: user.fullName, role: user.role, token });
      }
    )

  } catch (err) {
    console.error((err as Error).message)
    res.status(STATUS_CODE.SERVER_ERROR).json({ ok: false, message: 'Server error' })
  }
}

export const register = async (req: Request, res: Response) => {
  try {
    const {
      email,
      password,
      fullName,
      role = "USER",
      road,
      number,
      city,
      province,
      country,
      phoneNum
    } = req.body

    let user = await User.findOne({ email })
    if (user) {
      return res.status(STATUS_CODE.BAD_REQUEST).json({
        ok: false,
        message: "User already exists"
      })
    }

    const salt = bcrypt.genSaltSync(saltRounds)
    const hashed = bcrypt.hashSync(password, salt)

    const userFields = {
      email,
      password: hashed,
      fullName,
      role,
      road,
      number,
      city,
      province,
      country,
      phoneNum,
      lastLoginAt: null
    }
    user = new User(userFields)
    await user.save()

    const payload: Payload = {
      userId: user._id.toString()
    }

    jwt.sign(
      payload,
      jwtSecret,
      { expiresIn: jwtExpiration },
      (err, token) => {
        if (err) throw err;
        res.json({ ok: true, name: fullName, role, token });
      }
    )

  } catch (err) {
    console.error((err as Error).message)
    res.status(STATUS_CODE.SERVER_ERROR).send({ ok: false, message: 'Server error' })
  }
}
