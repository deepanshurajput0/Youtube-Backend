import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
    subscribeTo:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    subscriber:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },

})


const Subscription = mongoose.model('Subscription',subscriptionSchema)

export default Subscription