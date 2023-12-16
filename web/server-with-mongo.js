import { createApp } from "../app.js";
import { MovieModel} from "../models/mongoDB/movie.js";
import mongoose from 'mongoose'

mongoose.connect('mongodb+srv://Henso:miprimerapp@miapp.u8aovzq.mongodb.net/apiMovies?retryWrites=true&w=majority')
createApp({MovieModel: MovieModel});