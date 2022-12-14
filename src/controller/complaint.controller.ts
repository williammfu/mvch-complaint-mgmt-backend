import { Request, Response } from 'express'
import mongoose, { Schema } from 'mongoose'
import { STATUS_CODE } from '../constants'
import Complaint from '../models/Complaint'

export const insertOneComplaint = async (req: Request, res: Response) => {
  try {
    const {
      nameAffected,
      sender,
      selfAffected,
      hospitalName,
      facility,
      createdAt,
      description,
      files,
      status,
      type
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
      complainReplies: [],
      status,
      type
    }

    const newComplaint = new Complaint(complaintFields)
    const mongoresponse = await newComplaint.save()
    return res.status(STATUS_CODE.OK).json({ response: mongoresponse })

  } catch (e) {
    console.error((e as Error).message)
    res.status(STATUS_CODE.SERVER_ERROR).json({ ok: false, message: 'Server error' })
  }
}

export const getAllComplaints = async (req: Request, res: Response) => {
  try {
    const complaints = await Complaint.find({}, '_id createdAt nameAffected hospitalName facility description status')
    return res.status(STATUS_CODE.OK).json({ ok: true, response: complaints })
  } catch (e) {
    console.error((e as Error).message)
    res.status(STATUS_CODE.SERVER_ERROR).json({ ok: false, message: 'Server error' })
  }
}

export const getComplaintsById = async (req: Request, res: Response) => {
  try {
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

    return res.status(STATUS_CODE.OK).json({ response: complaint })
  } catch (e) {
    console.error((e as Error).message)
    res.status(STATUS_CODE.SERVER_ERROR).json({ ok: false, message: 'Server error' })
  }
}

export const updateComplaintsById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    const complaint = await Complaint.findOneAndUpdate({ _id: id }, req.body)
    if (!complaint) {
      return res
        .status(STATUS_CODE.BAD_REQUEST)
        .json({
          ok: false,
          message: 'Complaint not found'
        })
    }

    return res.status(STATUS_CODE.OK).json({ response: complaint })
  } catch (e) {
    console.error((e as Error).message)
    res.status(STATUS_CODE.SERVER_ERROR).json({ ok: false, message: 'Server error' })
  }
}

export const deleteComplaintsById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    const complaint = await Complaint.findByIdAndDelete({ _id: id })
    if (!complaint) {
      return res
        .status(STATUS_CODE.BAD_REQUEST)
        .json({
          ok: false,
          message: 'Complaint not found'
        })
    }

    return res.status(STATUS_CODE.OK).json({ response: complaint })
  } catch (e) {
    console.error((e as Error).message)
    res.status(STATUS_CODE.SERVER_ERROR).json({ ok: false, message: 'Server error' })
  }
}

export const updateComplaintStatusById = async (req: Request, res: Response) => {
  try {
    const status = req.body.status
    const id = req.params.id
    if (!status) {
      return res.status(STATUS_CODE.BAD_REQUEST).json({
        ok: false,
        message: "need status on request"
      })
    }

    const complaint = await Complaint.findOneAndUpdate({ _id: id }, { status: status })
    if (!complaint) {
      return res
        .status(STATUS_CODE.BAD_REQUEST)
        .json({
          ok: false,
          message: 'Complaint not found'
        })
    }

    return res.status(STATUS_CODE.OK).json({ response: complaint })
  } catch (e) {
    console.error((e as Error).message)
    res.status(STATUS_CODE.SERVER_ERROR).json({ ok: false, message: 'Server error' })
  }
}

export const replyComplaint = async (req: Request, res: Response) => {
  try {
    const {
      senderName,
      senderRole,
      content,
      reqUserId: {
        userId
      }
    } = req.body
    const id = req.params.id

    const complaint = await Complaint.findById({ _id: id })

    if (!complaint) {
      return res
        .status(STATUS_CODE.BAD_REQUEST)
        .json({
          ok: false,
          message: 'Complaint not found'
        })
    }

    complaint?.complainReplies.push({
      senderId: new mongoose.Types.ObjectId(userId),
      senderName,
      senderRole,
      content,
      createdAt: new Date()
    })
    await complaint.save()

    return res.status(STATUS_CODE.OK).json({ response: complaint })

  } catch (e) {
    console.log(e)
    console.error('Reply complaint: ', (e as Error).message)
    res.status(STATUS_CODE.SERVER_ERROR).json({ ok: false, message: 'Server error' })
  }
}
