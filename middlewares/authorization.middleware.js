import User from "../models/user.model.js";
import { decodeToken } from "../utils/auth.utils.js";

async function authorize(req, res, next){
    try {
        // get token from headers
        let token;
        if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
            token  = req.headers.authorization.split(" ")[1]
        }
        if (!token){
            throw new Error("Unauthorized")
        }

        //decode token
        const {userId} = decodeToken(token)

        // find user
        const user = await User.findById(userId)
        
        if (!user){
            throw new Error("Unauthorized")
        }
        req.user = user
        next()
        
    } catch (error) {
        res.status(401).send({
                success: false,
                message: error.message
            })

        
    }

}

export default authorize