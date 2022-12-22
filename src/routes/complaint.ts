import { Router } from "express"
import { insertOneComplaint, getAllComplaints, getComplaintsById, updateComplaintsById, deleteComplaintsById, updateComplaintStatusById } from "../controller/complaint.controller"

const router = Router()

router.post('/', insertOneComplaint)

router.get('/', getAllComplaints)
router.get('/:id', getComplaintsById)

router.put('/:id', updateComplaintsById)
router.put('/status/:id', updateComplaintStatusById)

router.delete('/:id', deleteComplaintsById)

export default router
