import jsonwebtoken from 'jsonwebtoken'
import {JWT_EXPIRES_IN, JWT_SECRET} from '../config/env.js'
import bcryptjs from 'bcryptjs';

async function hashPassword(password){
    const salt = await bcryptjs.genSalt(11)
    return await bcryptjs.hash(password, salt)
    
}
function generateToken(payload){
    return jsonwebtoken.sign(payload, JWT_SECRET,{expiresIn: JWT_EXPIRES_IN})
}

async function comparePassword(hashedPassword, password ){
    return await bcryptjs.compare(password,hashedPassword)
}

function decodeToken(token){
    return jsonwebtoken.decode(token)
}

export {hashPassword, generateToken, comparePassword, decodeToken}