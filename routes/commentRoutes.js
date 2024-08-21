import express from 'express'
import { authMiddleware } from '../middlewares/authMiddleware.js'
import { Comment, deleteComment, getCommentsFromVideo, updateComment } from '../controllers/commentController.js'
const router = express()

router.post('/comment/:id',authMiddleware,Comment)

router.get('/comments/:id',authMiddleware,getCommentsFromVideo)

router.put('/comment/update/:id',authMiddleware, updateComment)

router.delete('/comment/remove/:id',authMiddleware, deleteComment)



export default router