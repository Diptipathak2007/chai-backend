//require("dotenv").config({path:'./env'}); hindering the code consistency
import dotenv from "dotenv";

import mongoose from "mongoose";
import {DB_NAME} from "./constants.js";
import connectDB from "./db/index.js";
dotenv.config({path: './env'});





connectDB()
.then(()=>{
    app.listen(process.env.PORT||8000, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    });
})
.catch((error => {
    console.error("MONGO DB connection error:", error); 
}));


/*
import express from "express";
const app = express();

// function connectDB(){}

// connectDB()

( async()=>{
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`,)
        app.on("error", () => {
            console.error("Error occurred:", error);//listeners
        });
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        });
    } catch (error) {
        console.error("Error connecting to the database:", error);
    }
})()
*/