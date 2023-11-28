import mongoose from 'mongoose'

const movieSchema = new mongoose.Schema({
	title: { type: String, required: true, minLength: 3 },
	year: { type: Number, required: true, min:1950, max: 2024 },
    director: { type: String, required: true},
    rate: { type: Number, required: true, min: 1, max: 10},
    poster: { type: String, required: true},
    genre: { type: [String], required: true, 
        enum:['Action', 'Adventure', 'Crime', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Thriller', 'Sci-Fi']}
})

export const Movies = mongoose.model('Movies', movieSchema)
