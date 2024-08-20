import multer from "multer";
const storage = multer.memoryStorage();

const upload = multer({ storage });

// Use `upload.fields()` for handling multiple file fields
const multiUpload = upload.fields([
    { name: 'video', maxCount: 1 },
    { name: 'thumbnailPic', maxCount: 1 }
]);

export default multiUpload;
