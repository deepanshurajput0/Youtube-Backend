import express from 'express'
import { getMyProfile, login, regsiter, logout } from '../controllers/userController.js'
import { authMiddleware } from '../middlewares/authMiddleware.js'
import multiUpload from '../middlewares/multer.js'
import singleUpload from '../middlewares/multer.js'
const router = express()

router.post('/register', singleUpload,regsiter)

router.get('/user/me', authMiddleware,getMyProfile)

router.post('/login',  login)

router.get('/logout' , logout)

export default router