import { Router } from "express"
import { login } from "../controller/auth"

const router = Router()

router.get('/', (req, res) => res.send('hehe'))
router.post('/login', login)

export default router
