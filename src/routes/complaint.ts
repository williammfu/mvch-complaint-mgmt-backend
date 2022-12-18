import { Router } from "express"
import { insertOneComplaint, getAllComplaints, getComplaintsById } from "../controller/complaint.controller"
import auth from "../middleware/auth"

const router = Router()

// router.use(auth)
router.post('/insert-one', insertOneComplaint)
router.get('/get', getAllComplaints)
router.get('/get/:id', getComplaintsById)

export default router
