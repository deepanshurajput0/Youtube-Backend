import express from 'express'
import dotenv from 'dotenv'
import userRoutes from './routes/userRoutes.js'
const app = express()

dotenv.config({})


app.use('/api/v1',userRoutes)

app.listen(process.env.PORT,()=>{
    console.log(`Server is running on Port ${process.env.PORT}`)
})










