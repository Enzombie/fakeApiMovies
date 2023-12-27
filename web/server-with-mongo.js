import { createApp } from "../app.js";
import { MovieModel} from "../models/mongoDB/movie.js";
import mongoose from 'mongoose'

const mongoUri = 'mongodb+srv://Henso:miprimerapp@miapp.u8aovzq.mongodb.net/apiMovies?retryWrites=true&w=majority'
mongoose.connect(process.env.MONGO.CONNECT.URI)
createApp({MovieModel: MovieModel});