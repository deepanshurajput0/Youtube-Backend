import express from 'express'
import { authMiddleware } from '../middlewares/authMiddleware.js'
import { getLikesByVideo, likeVideo, UnlikeVideo } from '../controllers/likeController.js'
const router = express()

router.post('/like/:id',authMiddleware,likeVideo)

router.delete('/unlike/:id',authMiddleware,UnlikeVideo)

router.get('/likes/:id',authMiddleware, getLikesByVideo)


export default router