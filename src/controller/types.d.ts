import { Request } from "express"

export interface MyRequest<T> extends Request {
  body: T
}