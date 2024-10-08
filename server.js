import express from 'express'
import dotenv from 'dotenv'
import userRoutes from './routes/userRoutes.js'
import videoRoutes from './routes/videoRoutes.js'
import commentRoutes from './routes/commentRoutes.js'
import likeRoutes from './routes/likeRoutes.js'
import subscribeRoutes from './routes/subscriptionRoutes.js'
import cloudinary from 'cloudinary'
import { connectDB } from './config/db.js'
import cookieParser from 'cookie-parser'
const app = express()

dotenv.config({})

cloudinary.v2.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET
})

app.use(express.json())

app.use(cookieParser())

app.use('/api/v1',userRoutes)
app.use('/api/v1/video',videoRoutes)
app.use('/api/v1/video',commentRoutes)
app.use('/api/v1/video',likeRoutes)
app.use('/api/v1/user',subscribeRoutes)

app.listen(process.env.PORT,()=>{
    console.log(`Server is running on Port ${process.env.PORT}`)
    connectDB()
})










