import mongoose from "mongoose";
import User from '../models/user.model.js'
import { comparePassword, generateToken, hashPassword } from "../utils/auth.utils.js";

async function signUp(req,res,next) {
    // use sessions and atomicity where everything happens or nothing happens at all. To ensure data integrity
    // create session
    const session  = await mongoose.startSession();
    session.startTransaction()
    try {

        // get details
        const {email, password,name} = req.body

        // check if user exists

        const existingUser = await User.findOne({email});
        if (existingUser){
            const error = new Error("User already exists")
            error.statusCode = 400
            throw error
        }

        //generate hash password
        const hashedPassword = await hashPassword(password)
        

        //create user
        const newUser = await User.create([{email,password: hashedPassword, name}], {session})

        //generate token
        const token = generateToken({userId: newUser[0]._id});
        
        await session.commitTransaction();
        await session.endSession();

        console.log("User created")

        res.status(201).send({
            success: true,
            message: "User created successfully",
            data : {
                token,
                user: newUser
            }
        })
    } catch (error) {
        await session.abortTransaction();
        await session.endSession();
        next(error)
        
    }
    
}
async function signIn(req,res,next) {
    try {
        const {email, password} = req.body;

        const user = await User.findOne({email})

        //check if user exists
        if (!user){
            const error = new Error("User does not exist")
            error.statusCode = 404
            throw error
        }

        //check password
        const isPasswordValid = await comparePassword(user.password, password);

        if (!isPasswordValid){
            const error = new Error("Invalid Password");
            error.statusCode = 400
            throw error 
        }

        // generate token
        const token  = generateToken({userId: user.id});

        res.status(200).send({
            success: true,
            message: "Login Successful",
            data: {
                token,
                user
            }
        })
        
    } catch (error) {
        console.error(error)
        next(error)
        
    }
    
}
async function signOut(req,res,next) {
    
}

export {signIn, signUp, signOut};