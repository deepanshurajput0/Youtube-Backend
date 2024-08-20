import express from 'express'
import { getMyProfile, regsiter } from '../controllers/userController.js'
import singleUpload from '../middlewares/multer.js'
const router = express()

router.post('/register',singleUpload,regsiter)

router.get('/user/me', getMyProfile)

export default router