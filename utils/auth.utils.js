import jsonwebtoken from 'jsonwebtoken'
import {JWT_EXPIRES_IN, JWT_SECRET} from '../config/env.js'
import bcrypt from 'bcryptjs';

async function hashPassword(password){
    const salt = await bcrypt.genSalt(20)
    return await bcrypt.hash(password, salt)
}

function generateToken(payload){
    return jsonwebtoken.sign(payload, JWT_SECRET,{expiresIn: JWT_EXPIRES_IN})
}

async function comparePassword(hashedPassword, password ){
    return await bcrypt.compare(password,hashedPassword)
}

function decodeToken(token){
    return jsonwebtoken.decode(token)
}

export {hashPassword, generateToken, comparePassword, decodeToken}