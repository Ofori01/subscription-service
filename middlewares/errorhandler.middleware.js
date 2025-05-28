

const errorHandler = (err,req,res,next) =>{
    try {

        let error = {...err}
        error.message = err.message
        console.error(err)

        //Mongo Bad ObjectId....id does not exist
        if (err.name == 'CastError'){
            const message = "Resource not found";
            error = new Error(message)
            error.statusCode = 404
        }

        //duplicate key error
        if (err.name == '11000'){
            const message  = "Duplicate Field value entered"
            error = new Error(message);
            error.statusCode = 400
        }

        //mongoose validation error
        if(err.name == "ValidationError"){
            const message = Object.values(err.errors).map(val => val.message)
            error = new Error(message.join(', '))
        }
        
        res.status(error.statusCode || 500).json({success: false, error: error.message || "Server Error"})
    } catch (error) {
        next(error)
        
    }
}


export default errorHandler