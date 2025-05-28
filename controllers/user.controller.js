import User from '../models/user.model.js'


async function getUsers(req,res,next){
    try {
        const users = await User.find();
        if (!users){
            const error = new Error("No users")
            error.statusCode = 404
            throw error
        }
        res.send({
            success: true,
            data: users
        })
        
    } catch (error) {
        next(error)
        
    }

}

async function getUser(req,res,next){

    try {
        const {id} = req.params

        const user = await User.findById(id).select('-password')
        
        if (!user){
            const error = new Error("User does not exist")
            error.statusCode = 404
            throw error
        }

        res.send({
            success: true,
            data: user
        })
        
    } catch (error) {
        next(error)
        
    }
    

}

export { getUser, getUsers }