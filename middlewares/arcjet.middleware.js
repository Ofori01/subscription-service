import aj from "../config/arcjet.js";

async function arcjetMiddleware(req,res,next){
    try {
        const decision  = await aj.protect(req)

        if (decision.isDenied()){
            if (decision.reason.isRateLimit()) return res.status(429).send({success: false , message: "Too many requests made. Rate Limit exceeded"})

            if (decision.reason.isBot()) return res.status(403).send({success: false, message: "Bot detected"})
            
            return res.status(403).send({success: false, message: "Request denied. Try again Later"})
        }

        
        next()
        
    } catch (error) {
        console.error('Archjet middleware error', error)
        // Fail open: allow the request but log the error
        res.locals.arcjetWarning = "Arcjet service unavailable, request not checked.";
        next()
        
    }
}

export default arcjetMiddleware