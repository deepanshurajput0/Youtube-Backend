import commentModel from "../models/CommentModel.js"

export const Comment =async(req,res)=>{
    try {
     const { id } = req.params   
     const { text } = req.body
     const userId = req.user._id
    const comment =await commentModel.create({
        text,
        commentedBy:userId,
        video:id
      })
      res.status(201).json({
        message: "Comment added successfully.",
        comment,
      });   
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message:"Internal Server error"
        })  
    }
}




export const getCommentsFromVideo =async(req,res)=>{
    try {
     const { id } = req.params   
    const comments =await commentModel.find({video:id}).populate('commentedBy','username')
      res.status(201).json(comments);   
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message:"Internal Server error"
        })  
    }
}


export const updateComment = async (req, res) => {
    try {
      const { id } = req.params; 
      const { text } = req.body;
      const currentUser = req.user._id;
  
      const comment = await commentModel.findOne({ _id: id, commentedBy: currentUser });
  
      if (!comment) {
        return res.status(404).json({
          message: 'Comment not found or user is not authorized to update this comment'
        });
      }

      comment.text = text || comment.text;
      await comment.save();
  
      res.status(200).json({
        message: 'Comment Updated Successfully',
        comment
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Internal Server Error"
      });
    }
  }
  
  export const deleteComment = async (req, res) => {
    try {
      const { id } = req.params;  
      const currentUser = req.user._id;
  
      const comment = await commentModel.findOne({ _id: id, commentedBy: currentUser });

      if (!comment) {
        return res.status(404).json({
          message: 'Comment not found or user is not authorized to delete this comment'
        });
      }

      await comment.deleteOne();
  
      res.status(200).json({
        message: 'Comment Deleted Successfully'
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Internal Server Error"
      });
    }
  }
  