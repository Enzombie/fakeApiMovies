import {config} from 'dotenv'
import { createApp } from "./app.js";
import { MovieModel} from "./models/mongo.js";
import mongoose from 'mongoose'
config()

;( async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Connected to mongoose successfully")
    } catch (error) {
        console.log("Connect failed: " + error.message)
    }
})()

createApp({MovieModel: MovieModel});