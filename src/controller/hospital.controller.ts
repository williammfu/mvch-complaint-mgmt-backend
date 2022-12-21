import { Request, Response } from 'express'
import { STATUS_CODE } from '../constants'
import Hospital from "../models/Hospital"

export const getAllHospital = async (req: Request, res: Response) => {
  try {
    const hospitals = await Hospital.find()
    return res.status(STATUS_CODE.OK).json({ response: hospitals })
  } catch (e) {
    console.error((e as Error).message)
    res.status(STATUS_CODE.SERVER_ERROR).json({ ok: false, message: 'Server error' })
  }
}

export const insertOneHospital = async (req: Request, res: Response) => {
  try {
    const hospitalFields = {
      location: req.body.location,
      name: req.body.name,
      facilities: req.body.facilities
    }
    const newhospital = new Hospital(hospitalFields)
    const mongoresponse = await newhospital.save()
    return res.status(STATUS_CODE.OK).json({ response: mongoresponse })

  } catch (e) {
    console.error((e as Error).message)
    res.status(STATUS_CODE.SERVER_ERROR).json({ ok: false, message: 'Server error' })
  }
}