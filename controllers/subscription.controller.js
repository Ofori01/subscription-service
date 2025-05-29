import mongoose from "mongoose"
import Subscriptions from "../models/subscription.model.js"

export async function createSubscription (req,res,next) {
    const session  =  await mongoose.startSession()
    session.startTransaction()
    try {

        const newSub = await Subscriptions.create({
            ...req.body,
            user: req.user._id
        }, {session})

        res.status(201).send({success: true, data: newSub})

        await session.commitTransaction()
        await session.endSession()
        
    } catch (error) {
        await session.abortTransaction()
        await session.endSession()
        next(error)
        
    }
    
}