import mongoose from "mongoose";

const likeSchema = new mongoose.Schema({
    likedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    video:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Video',
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})



const likeModel = mongoose.model('Like', likeSchema);

export default likeModel;



