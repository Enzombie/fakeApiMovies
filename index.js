//este archivo es para poder correr correctamente la app en vercel y mongo
import { createApp } from "../app.js";
import { MovieModel} from "../models/mongoDB/movie.js";
import mongoose from 'mongoose'

const mongoUri = 'mongodb+srv://Henso:miprimerapp@miapp.u8aovzq.mongodb.net/apiMovies?retryWrites=true&w=majority'
mongoose.connect(mongoUri)
createApp({MovieModel: MovieModel});