import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import { Payload, STATUS_CODE } from "../constants"

dotenv.config()
const jwtSecret: string = process.env.JWT_SECRET || "MVCH"

const auth = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const bearer = req.header("Authorization")
    if (!bearer) {
      res
        .status(STATUS_CODE.UNAUTHORIZED)
        .json({
          ok: false,
          message: "Unauthorized"
        })
      return
    }

    const token = bearer.split(" ")[1]

    const payload: Payload = { userId: jwt.verify(token, jwtSecret) as string }
    req.body.reqUserId = payload.userId
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

export default auth
