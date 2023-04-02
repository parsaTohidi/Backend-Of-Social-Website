import express from 'express'
import { sendRequest, cancelRequest, respondRequest, removeFriend, getRequests } from '../controllers/request'
import authentication from '../middlewares/auth'

const requestsRouter = express.Router()

requestsRouter.post('/send', authentication, sendRequest)
requestsRouter.post('/respond', authentication, respondRequest)
requestsRouter.post('/remove', authentication, removeFriend)
requestsRouter.delete('/cancel', authentication, cancelRequest)
requestsRouter.get('/list', authentication, getRequests)

export default requestsRouter
