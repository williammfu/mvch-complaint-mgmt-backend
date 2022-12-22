import { Router } from "express"
import {
  insertOneComplaint,
  getAllComplaints,
  getComplaintsById,
  updateComplaintsById,
  deleteComplaintsById,
  updateComplaintStatusById,
  replyComplaint
} from "../controller/complaint.controller"
import auth from "../middleware/auth"

const router = Router()

router.post('/', insertOneComplaint)

router.get('/', getAllComplaints)
router.get('/:id', getComplaintsById)

router.put('/:id', updateComplaintsById)
router.put('/status/:id', updateComplaintStatusById)
router.put('/reply/:id', auth, replyComplaint)

router.delete('/:id', deleteComplaintsById)

export default router
