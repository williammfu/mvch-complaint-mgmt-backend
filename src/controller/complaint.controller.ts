import { Request, Response } from 'express'
import { STATUS_CODE } from '../constants'
import Complaint from '../models/Complaint'

export const insertOneComplaint = async (req: Request, res: Response) => {
  try{
    const {
      nameAffected,
      sender,
      selfAffected,
      hospitalName,
      facility,
      createdAt,
      description,
      files,
      complainReplies,
      status
    } = req.body

    const complaintFields = {
      nameAffected,
      sender,
      selfAffected,
      hospitalName,
      facility,
      createdAt,
      description,
      files,
      complainReplies,
      status
    }

    const newComplaint = new Complaint(complaintFields)
    const mongoresponse = await newComplaint.save()
    return res.status(STATUS_CODE.OK).json({response:mongoresponse})

  }catch(e){
      console.error((e as Error).message)
      res.status(STATUS_CODE.SERVER_ERROR).json({ ok: false, message: 'Server error' })
  }
}

export const getAllComplaints = async (req: Request, res: Response) => {
  try{
    const complaints = await Complaint.find()
    return res.status(STATUS_CODE.OK).json({response:complaints})
  }catch(e){
    console.error((e as Error).message)
    res.status(STATUS_CODE.SERVER_ERROR).json({ ok: false, message: 'Server error' })
  }
}

export const getComplaintsById = async (req: Request, res: Response) => {
  try{
    const id = req.params.id
    const complaint = await Complaint.findById(id)
    if (!complaint) {
      return res
        .status(STATUS_CODE.BAD_REQUEST)
        .json({
          ok: false,
          message: 'Complaint not found'
        })
    }

    return res.status(STATUS_CODE.OK).json({response:complaint})
  }catch(e){
    console.error((e as Error).message)
    res.status(STATUS_CODE.SERVER_ERROR).json({ ok: false, message: 'Server error' })
  }
}