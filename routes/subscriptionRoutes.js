import express from 'express'
import { authMiddleware } from '../middlewares/authMiddleware.js'
import { getUserSubscribers, getUserSubscriptions, subscribeToUser, unSubscribeToUser } from '../controllers/subscribeController.js'

const router = express()

router.post('/subscribe/:id',authMiddleware,subscribeToUser)

router.post('/unsubscribe/:id',authMiddleware, unSubscribeToUser)

router.get('/subscriptions',authMiddleware, getUserSubscriptions)

router.get('/subscribers/:id',authMiddleware, getUserSubscribers)


export default router