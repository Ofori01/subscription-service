import express, { urlencoded } from 'express'
import { NODE_ENV, PORT } from './config/env.js'
import userRouter from './routes/user.routes.js'
import authRouter from './routes/auth.routes.js'
import subscriptionRouter from './routes/subscription.routes.js'
import connectToDb from './database/mongodb.js'
import errorHandler from './middlewares/errorhandler.middleware.js'
import cookieParser from 'cookie-parser'
import arcjetMiddleware from './middlewares/arcjet.middleware.js'
import workflowRouter from './routes/workflow.routes.js'

const app  = express()


//middlewares
app.use(express.json())
app.use(urlencoded({extended: false}))
app.use(cookieParser())

app.use(arcjetMiddleware)
//routes
app.use('/api/v1/users', userRouter)
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/subscriptions', subscriptionRouter)
app.use('/api/v1/workflow/send-reminders', workflowRouter)

//error handler
app.use(errorHandler)

app.listen(PORT, async ()=> {
    console.log(`server started on port ${PORT} in ${NODE_ENV}`)
    // connect to database
    await connectToDb()
})