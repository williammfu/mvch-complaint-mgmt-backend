import { Router } from "express"
import { insertOneComplaint, getAllComplaints, getComplaintsById, updateComplaintsById, deleteComplaintsById } from "../controller/complaint.controller"

const router = Router()

router.post('/insert-one', insertOneComplaint)

router.get('/get', getAllComplaints)
router.get('/get/:id', getComplaintsById)

router.put('/update/:id', updateComplaintsById)

router.delete('/delete/:id', deleteComplaintsById)

export default router
