import { Router } from "express";

const authRouter = Router();

authRouter.post('/sign-up', (req,res)=>res.send({message : "sign-up route"}))
authRouter.post('/sign-in', (req,res)=>res.send({message : "sign-in route"}))
authRouter.post('/sign-out', (req,res)=>res.send({message : "sign-out route"}))

export default authRouter