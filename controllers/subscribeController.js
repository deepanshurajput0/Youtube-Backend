import Subscription from "../models/SubscriptionModel.js";
import userModel from "../models/userModel.js";

export const subscribeToUser = async (req, res) => {
    try {
        const userId = req.params.id; 
        const currentUserId = req.user._id; 

        const existingSubscription = await Subscription.findOne({
            subscribeTo: userId,
            subscriber: currentUserId
        });

        if (existingSubscription) {
            return res.status(409).json({
                message: 'You have already subscribed to this channel'
            });
        }

        await Subscription.create({
            subscribeTo: userId,
            subscriber: currentUserId
        });

        await userModel.findByIdAndUpdate(userId, { $push: { subscribers: currentUserId } });

        await userModel.findByIdAndUpdate(currentUserId, { $push: { subscriptions: userId } });


        res.status(201).json({
            message: 'Successfully subscribed to the channel'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
}



export const unSubscribeToUser = async (req, res) => {
    try {
        const userId = req.params.id; 
        const currentUserId = req.user._id;  

        const existingSubscription = await Subscription.findOne({
            subscribeTo: userId,
            subscriber: currentUserId
        });

        if (!existingSubscription) {
            return res.status(404).json({
                message: "You haven't subscribed to this channel"
            });
        }

        await userModel.findByIdAndUpdate(userId, { $pull: { subscribers: currentUserId } });

        await userModel.findByIdAndUpdate(currentUserId, { $pull: { subscriptions: userId } });

        await existingSubscription.deleteOne()

        res.status(200).json({
            message: 'Successfully unsubscribed from the channel'
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
}



export const  getUserSubscriptions =async(req,res)=>{
   try {
    const currentUser = req.user._id
    const subscriptions = await Subscription.find({subscriber:currentUser}).populate('subscribeTo')
    res.status(200).json(subscriptions)
   } catch (error) {
    console.log(error);
    res.status(500).json({
        message: "Internal Server Error"
    });
   }
}


export const getUserSubscribers = async (req, res) => {
   try {
    const { id } = req.params;
  
    const subscribers = await userModel.findOne({_id:id}).populate('subscribers','username')    
    res.status(200).json(subscribers);
   } catch (error) {
    res.status(500).json({
        message: "Internal Server Error"
    });
   }
  };