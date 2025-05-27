import mongoose from "mongoose";
import { DB_URI, NODE_ENV } from "../config/env.js";


if (!DB_URI) {
    throw new Error("DB_URI is not defined in the environment variables");
}


const connectToDb =  async ()=>  {
    try {

        await mongoose.connect(DB_URI)
        console.log(`Connected to database successfully in ${NODE_ENV} mode`);
        
    } catch (error) {
        console.error(`Failed to connect to database: ${error}`);

        process.exit(1)
        
    }

}

export default connectToDb;