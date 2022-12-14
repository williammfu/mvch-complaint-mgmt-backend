import { Request, Response } from 'express'
import { Payload, STATUS_CODE } from '../const'
import User from '../models/User'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()
const jwtSecret: string = process.env.JWT_SECRET || "MVCH"
const jwtExpiration: string = process.env.JWT_EXPIRATION || "1 day"

export const login = async (req: Request, res: Response) => {
  try {
    const {
      email,
      password
    } = req.body
    const user = await User.findOne({ email })
    if (!user) {
      res
        .status(STATUS_CODE.BAD_REQUEST)
        .json({
          ok: false,
          message: 'User with email not found'
        })
    }

    // TODO: use bcrypt
    const isMatch = user?.password == password
    if (!isMatch) {
      res
        .status(STATUS_CODE.BAD_REQUEST)
        .json({
          ok: false,
          message: 'Password not match'
        })
    }

    const payload: Payload = {
      email: user?.email!
    }

    jwt.sign(
      payload,
      jwtSecret,
      { expiresIn: jwtExpiration },
      (err, token) => {
        if (err) throw err;
        res.status(STATUS_CODE.OK).json({ token });
      }
    )

  } catch (err) {
    console.error((err as Error).message)
    res.status(STATUS_CODE.SERVER_ERROR).send({ ok: false, message: 'Server error' })
  }
}