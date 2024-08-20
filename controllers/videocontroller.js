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
