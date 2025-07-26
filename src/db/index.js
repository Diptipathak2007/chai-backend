import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

//we are using async await cauz db is in another continent
const connectDB = async()=>{
    try {
        const connectionInstance=await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`\n Connected to the database: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("Error connecting to the database:", error);
        process.exit(1); // Exit the process with failure   
    }
}

export default connectDB;