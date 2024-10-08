import videoModel from "../models/videoModel.js";
import getDataUri from "../utils/dataUri.js";
import cloudinary from 'cloudinary';

export const uploadVideo = async (req, res) => {
  try {
    const { title, description, tags } = req.body;
    const videoFile = req.files.video[0]
    const thumbnailFile = req.files.thumbnailPic[0]

    if (!videoFile || !thumbnailFile) {
      return res.status(400).json({
        message: "Video and thumbnail files are required."
      });
    }

    const videoFileUri = getDataUri(videoFile);
  
    const uploadVideo = await cloudinary.v2.uploader.upload(videoFileUri.content, {
      resource_type: 'video'
    });
    const thumbnailFileUri = getDataUri(thumbnailFile);
    const uploadThumbnail = await cloudinary.v2.uploader.upload(thumbnailFileUri.content,{
        resource_type:'image'
    });
    const video = await videoModel.create({
      title: title || "Untitled Video",
      description,
      tags,
      video: {
        public_id: uploadVideo.public_id,
        url: uploadVideo.secure_url
      },
      thumbnailPic: {
        public_id: uploadThumbnail.public_id,
        url: uploadThumbnail.secure_url
      },
      uploadBy: req.user._id
    });

    res.status(201).json({
      message: "Video uploaded successfully.",
      video
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error"
    });
  }
};



export const getVideoById =async(req,res)=>{
    try {
       const { id } = req.params
       const singleVideo = await videoModel.findById(id)
       res.status(200).json(singleVideo)       
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Internal Server Error"
          });
    }
}


export const getVideos=async(req,res)=>{
    try {
        const feed = await videoModel.find({})
        res.status(200).json(feed)       
     } catch (error) {
         console.log(error)
         res.status(500).json({
             message: "Internal Server Error"
           });
     }
}
export const getVideosByUser=async(req,res)=>{
    try {
        const { id } = req.params 
        const userVideos = await videoModel.find({uploadBy:id})
        res.status(200).json(userVideos)       
     } catch (error) {
         console.log(error)
         res.status(500).json({
             message: "Internal Server Error"
           });
     }
}




export const updateVideo = async (req, res) => {
  try {
    const userId = req.user._id; 
    const { id } = req.params;
    const { title, description } = req.body;

    const video = await videoModel.findOne({ _id: id, uploadBy: userId });

    if (!video) {
      return res.status(404).json({
        message: 'Video not found or Invalid User',
      });
    }

    // Update the video details
    video.title = title || video.title;
    video.description = description || video.description;
    await video.save();

    res.status(200).json({
      message: 'Video Updated Successfully',
      video,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};


export const deleteVideo=async(req,res)=>{
  try {
    const userId = req.user._id; 
    const { id } = req.params;
    const video = await videoModel.findOne({ _id: id, uploadBy: userId });
    if (!video) {
      return res.status(404).json({
        message: 'Video not found or Invalid User',
      });
    }
    await video.deleteOne()
    res.status(200).json({
      message: 'Video Deleted Successfully'
    });

  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
}




export const searchVideo =async(req,res)=>{
  try {
    const videoSearch = req.query.search || ''
    const videofunc ={
      title:{$regex:videoSearch, $options:'i' }
    }
    const videos = await videoModel.find(videofunc)
    res.status(200).json(videos)
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

export const updateViews = async (req, res) => {
  try {
    const { id } = req.params;
    const currentUser = req.user._id;

    // Find the video and check if the user has already viewed it
    const video = await videoModel.findById(id);

    if (!video) {
      return res.status(404).json({
        message: "Video not found",
      });
    }

    // Check if the current user has already viewed the video
    if (video.viewedBy.includes(currentUser)) {
      return res.status(200).json({
        message: "View already counted",
        views: video.views,
      });
    }

    // Increment the view count and add the user to the viewedBy array
    video.views += 1;
    video.viewedBy.push(currentUser);

    await video.save();

    res.status(200).json({
      message: "View count updated successfully",
      views: video.views,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

