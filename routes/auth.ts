import express from 'express'
import { register, login } from '../controllers/user'
import { registerValidation } from '../middlewares/validateMiddleware'

const authRouter = express.Router()

authRouter.post('/register', registerValidation, register)
authRouter.post('/login', login)

export default authRouter
