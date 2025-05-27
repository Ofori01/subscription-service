import mongoose from "mongoose";


const subscriptionSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'Subscription name is required'],
        minLength: 2,
        maxLength: 100,
    },
    price: {
        type: Number,
        required: [true, "Subscription price is required"],
        min: [0, 'Price must be greater than 0'],
        max: [1000, 'Price must be less than 1000']
    },
    currency: {
        type: String,
        enum: ["USD", "GHC", "GBP"],
        default: "GHC"
    },
    frequency: {
        type: String,
        enum: ['daily', 'weekly', 'monthly','yearly']
    },
    category: {
        type: String,
        enum: ['Sports', 'news', 'lifestyle', 'entertainment', 'technology','finance', 'politics'],
        required: true
    },
    paymentMethod: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: String,
        enum: ['active','cancelled','expired'],
        default: 'active'
    },
    startDate: {
        type: Date,
        required: true,
        validate: {
            validator: (value)=> value <= new Date(),
            message: "Start date must be in the past"
        }
    },
    renewalDate: {
        type: Date,
        required: true,
        validate: {
            validator: (value)=> value > this.startDate
        },
        message: "Renewal date must be after start date"
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required : true,
        ref: "User",
        index: true
    }

}, {timestamps: true})

subscriptionSchema.pre('save', (next)=>{
    if(!this.renewalDate){
        const periods = {
            daily: 1,
            weekly: 7,
            monthly: 30,
            yearly: 365
        }
        this.renewalDate = new Date(this.startDate)
        this.renewalDate.setDate(this.renewalDate + periods[this.frequency])
    }
    if(this.renewalDate > new Date()){
        this.status = 'expired'
    }
    next()
})

