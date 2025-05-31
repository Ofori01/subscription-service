import Subscriptions from "../models/subscription.model.js"
import workflowCLient from "../config/qtsash.workflow.js"
import { SERVER_URL } from "../config/env.js"

export async function createSubscription (req,res,next) {
    
    try {


        const newSub = await Subscriptions.create({
            ...req.body,
            user: req.user._id
        })


        // create workflow
        const {workflowRunId}  = await workflowCLient.trigger({
            url: `${SERVER_URL}/api/v1/workflow/send-reminders`,
            body: {
                subscriptionId : newSub.id
            },
            headers: {
                'content-type': "application/json"

            }
        })

        res.status(201).send({success: true, data: newSub, workflowRunId })

        
        
        
    } catch (error) {
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