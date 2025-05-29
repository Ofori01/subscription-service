import mongoose from "mongoose"
import Subscriptions from "../models/subscription.model.js"

export async function createSubscription (req,res,next) {
    const session  =  await mongoose.startSession()
    session.startTransaction()
    try {


        const newSub = await Subscriptions.create([{
            ...req.body,
            user: req.user._id
        }], {session})

        res.status(201).send({success: true, data: newSub[0]})

        await session.commitTransaction()
        await session.endSession()
        
    } catch (error) {
        await session.abortTransaction()
        await session.endSession()
        next(error)
        
    }
    
}

export async function getUserSubscriptions(req,res,next){

    try {
        if(req.user.id !== req.params.id){
            const error  = new Error("Unauthorized")
            error.statusCode = 401
            throw error
        }

        const sub = await Subscriptions.find({user: req.params.id})
        res.json({success: true, data: sub})
        
    } catch (error) {
        next(error)
        
    }
}