import { Router } from "express";
import { getUser, getUsers } from "../controllers/user.controller.js";
import authorize from "../middlewares/authorization.middleware.js";

const userRouter = Router();

userRouter.get('/',authorize,getUsers)
userRouter.get('/:id', authorize ,getUser)
userRouter.post('/', (req,res)=>res.send({message: "Create user"}))
userRouter.put('/:id', (req,res)=>res.send({message: "Update user with id"}))
userRouter.delete('/:id', (req,res)=>res.send({message: "Delete user with id"}))


export default userRouter