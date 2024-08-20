import express from 'express'
import { authMiddleware } from '../middlewares/authMiddleware.js'
import { uploadVideo } from '../controllers/videocontroller.js'
import multiUpload from '../middlewares/multipart.js'
const router = express()

router.post('/upload',authMiddleware,multiUpload,uploadVideo)

export default router