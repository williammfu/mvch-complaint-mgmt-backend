import { Router } from "express"
import { login, logout, register } from "../controller/user.controller"
import auth from "../middleware/auth"

const router = Router()

// router.use(auth)
router.post('/login', login)
router.post('/register', register)
router.post('/logout', logout)

export default router
