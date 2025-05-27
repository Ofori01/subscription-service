import { Router } from "express";


const userRouter = Router();

userRouter.get('/', (req,res)=>res.send({message: "Get all Users"}))
userRouter.post('/:id', (req,res)=>res.send({message: "Get all User with id"}))
userRouter.post('/', (req,res)=>res.send({message: "Create user"}))
userRouter.put('/:id', (req,res)=>res.send({message: "Update user with id"}))
userRouter.delete('/:id', (req,res)=>res.send({message: "Delete user with id"}))


export default userRouter