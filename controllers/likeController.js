import likeModel from "../models/LikeModel.js"

export const likeVideo =async(req,res)=>{
  try {
    const { id } = req.params
    const currentUser = req.user._id
     await likeModel.create({
        likedBy:currentUser,
        video:id
     })
     res.status(201).json({
        message: "Video Liked successfully."
      }); 
  } catch (error) {
    console.log(error)
    res.status(500).json({
        message:"Internal Server error"
    })  
  }
}


export const UnlikeVideo =async(req,res)=>{
    try {
      const { id } = req.params
      const currentUser = req.user._id
       await likeModel.findOne({_id:id,likedBy:currentUser})
      if(!currentUser){
        res.status(200).json({
            message:'Like & user not found'
        })
      } 
      await likeModel.deleteOne()
       res.status(201).json({
          message: "Video unLiked successfully"
        }); 

    } catch (error) {
      console.log(error)
      res.status(500).json({
          message:"Internal Server error"
      })  
    }
  }


  export const getLikesByVideo=async(req,res)=>{
    try {
        const { id } = req.params
        const getlikesbyVideo = await likeModel.find({video:id}).populate('likedBy','username')
        res.status(200).json(getlikesbyVideo)
    } catch (error) {
        res.status(500).json({
            message:"Internal Server error"
        }) 
    }
  }