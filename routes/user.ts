import express from 'express'
import { search } from '../controllers/user'
import authentication from '../middlewares/auth'
import { validateSearchQuery } from '../middlewares/validateMiddleware'

const usersRouter = express.Router()

usersRouter.get('/search', authentication, validateSearchQuery, search)

export default usersRouter
