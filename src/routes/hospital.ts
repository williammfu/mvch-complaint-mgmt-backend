import { Router } from "express"
import auth from "../middleware/auth"
import { getAllHospital, insertOneHospital } from "../controller/hospital.controller"

const router = Router()

router.get('/', getAllHospital)
router.post('/', insertOneHospital)

export default router
