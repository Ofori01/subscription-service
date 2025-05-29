import { Router } from "express"
import { createSubscription } from "../controllers/subscription.controller.js"

const subscriptionRouter = Router()

subscriptionRouter.get('/', (req,res)=>res.send({message: "Get all subscriptions"}))

subscriptionRouter.get('/:id', (req,res)=>res.send({message: "Get a subscription"}))

subscriptionRouter.post('/',createSubscription)

subscriptionRouter.put('/:id', (req,res)=>res.send({message: "Update a subscription"}))

subscriptionRouter.delete('/:id', (req,res)=> res.send({message: "Delete a subscription"}))

subscriptionRouter.get('/user/:id', (req,res)=> res.send({message: "Get user subscription"}))

subscriptionRouter.put('/:id/cancel', (req,res)=> res.send({message: "Cancel subscription"}))

subscriptionRouter.get('/upcoming-renewals', (req,res)=> res.send({message: "Get upcoming renewals"}))

export default subscriptionRouter