import { Router } from "express"
import { login, register } from "../controller/user.controller"
import auth from "../middleware/auth"

const router = Router()

// router.use(auth)
router.post('/login', login)
router.post('/register', register)

export default router
