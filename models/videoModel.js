import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    tags: {
        type: [String], 
        required: true
    },
    thumbnailPic: {
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    },
    video: {
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    },
    uploadBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    views: {
        type: Number,
        default: 0
    },
    likes: {
        type: [mongoose.Schema.Types.ObjectId], // Corrected syntax for an array of ObjectIds
        ref: 'User',
        default: []
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const videoModel = mongoose.model('Video', videoSchema);

export default videoModel;

