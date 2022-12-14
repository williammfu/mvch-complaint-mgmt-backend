import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import { Payload, STATUS_CODE } from "src/constants"

dotenv.config()
const jwtSecret: string = process.env.JWT_SECRET || "MVCH"

export default function (req: Request & Payload, res: Response, next: NextFunction) {
  try {
    const bearer = req.header("x-auth-token")
    if (!bearer) {
      return res
        .status(STATUS_CODE.UNAUTHORIZED)
        .json({
          ok: false,
          message: "Unauthorized"
        })
    }

    const token = bearer.split(" ")[1]

    const payload: Payload = { userId: jwt.verify(token, jwtSecret) as string }
    req.userId = payload.userId
    next()
  } catch (err) {
    res
      .status(STATUS_CODE.UNAUTHORIZED)
      .json({
        ok: false,
        message: "Token is not valid"
      })
  }
}