import userModel from "../models/userModel.js"
import getDataUri from "../utils/dataUri.js"
import cloudinary from 'cloudinary'
import { sendToken } from "../utils/sendToken.js"
import bcrypt from 'bcrypt'
export const regsiter=async(req,res)=>{
    try {
       const { username, email, password, bio } = req.body
       if( !username || !email || !password || !bio){
          return res.status(400).json({
              message:"All Fields are required"
          })
       }        
       const existingUser = await userModel.findOne({$or:[{username},{email}]})
       if(existingUser){
          return res.status(401).json({
              message:"User Already exists"
          })
       }
       const hashedPassword = await bcrypt.hash(password,10)
       const file = req.file 
       ;
       const fileUri = getDataUri(file)
       const mycloud = await cloudinary.v2.uploader.upload(fileUri.content)

       const user = await userModel.create({
          username,
          email,
          password:hashedPassword,
          avatar:{
            public_id:mycloud.public_id,
            url:mycloud.secure_url
          },
          bio
       })
      sendToken(res,user,'User Registered Successfully',201) 
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message:"Internal Server error"
        })
    }
}


export const login = async(req,res)=>{
    try {
     const { username ,password } = req.body
     if(!username || !password){
       return res.status(400).json({
         message:'All fields are required'
       })  
     }
     const user = await userModel.findOne({username})
     if(!user){
         return res.status(401).json({
             message:'Invalid username & password'
           })  
          }
     const comparePassword = await bcrypt.compare(password,user.password)
     if(!comparePassword){
      return res.status(401).json({
        message:'Invalid email & password'
      })  
     }
    sendToken(res,user,`Welcome back ${user.name}`,201)
    } catch (error) {
     console.log(error)
     res.status(500).json({
         message:"Internal Server error"
     })
    }
 }
 


export const getMyProfile=async(req,res)=>{
    try {
     const currentUser = await userModel.findById(req.user._id)
     if(!currentUser){
        return res.status(401).json({
            message:"Invalid User"
        })
     }
     res.status(200).json(currentUser)       
    } catch (error) {
        console.log(error)
    }
}

export const logout=async(req,res)=>{
    try {
      res.cookie('token',null,{
        expires:new Date(Date.now()),
        httpOnly:true,
        secure:true,
        sameSite:'none'
      }).json(
        {   success:true,
            message:"Logout Successfully"
         }
     )
     res.status(200).json(currentUser)       
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message:"Internal Server error"
        })
    }
}




