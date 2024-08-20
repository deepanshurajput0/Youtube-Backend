import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
       public_id: {
            type: String,
            required: true
       },
       url: {
            type: String,
            required: true
       }
    },
    bio: {
        type: String,
        default: "" // Bio is optional
    },
    subscribers: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User', // Reference to the User model
        default: []
    },
    subscriptions: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User', // Reference to the User model
        default: []
    },
    createdAt: {
       type: Date,
       default: Date.now
    }
});

const userModel = mongoose.model('User', userSchema);

export default userModel;
