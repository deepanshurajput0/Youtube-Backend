import express from 'express'
import { authMiddleware } from '../middlewares/authMiddleware.js'
import { getVideoById, getVideos, getVideosByUser, updateVideo, uploadVideo } from '../controllers/videocontroller.js'
import multiUpload from '../middlewares/multipart.js'
const router = express()

router.post('/upload',authMiddleware,multiUpload,uploadVideo)

router.get('/single/:id',getVideoById)

router.get('/feed',getVideos)

router.put('/update/:id',authMiddleware, updateVideo)

router.get('/user/:id', getVideosByUser)

export default router