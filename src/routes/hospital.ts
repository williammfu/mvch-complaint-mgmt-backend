import { Router } from "express"
import auth from "../middleware/auth"
import { getAllHospital, insertOneHospital } from "../controller/hospital.controller"

const router = Router()

router.get('/all-hospital',getAllHospital)
router.post('/insert-one', insertOneHospital)

export default router
