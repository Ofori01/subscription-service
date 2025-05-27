import express, { urlencoded } from 'express'
import { NODE_ENV, PORT } from './config/env.js'
import userRouter from './routes/user.routes.js'
import authRouter from './routes/auth.routes.js'
import subscriptionRouter from './routes/subscription.routes.js'
import connectToDb from './database/mongodb.js'

const app  = express()


//middlewares
app.use(express.json())
app.use(urlencoded({extended: false}))

//routes
app.use('/api/v1/users', userRouter)
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/subscriptions', subscriptionRouter)



app.listen(PORT, async ()=> {
    console.log(`server started on port ${PORT} in ${NODE_ENV}`)
    // connect to database
    await connectToDb()
})