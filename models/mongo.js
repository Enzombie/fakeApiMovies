import { randomUUID } from 'node:crypto'
import { Movies } from '../schemas/movieSchemaMongo.js'

export class MovieModel {
    static async getAll ({ genre }) {
        try {
            if (genre) {
                const genrePascalCase = `^${genre}$`
                const filterMovies = await Movies.find({ genre: {$regex: genrePascalCase, $options:'i'}})
                return filterMovies
            }
            return await Movies.find()
        } catch (error) {
            return { 
                error: 'An error occurred while fetching the movies, genre not found ?'
            }
        }
    }

    static async getById ({ id }) {
        
        try {
            const movie = await Movies.findOne({ _id: id })
            return movie
        } catch (error) {
            return ({ error: 'An error occurred while fetching the movie, incorrect ID?' })
        }
    }

    static async create ({ input }){
        const newMovie = new Movies({
            ...input,
            id : randomUUID()
        })
        await newMovie.save()

        return newMovie
    }

    static async update ({ id, input }){
        try {
            const movie = await Movies.findOne({ _id : id})

            Object.assign(movie, input)
            await movie.save()

            return movie
        } catch (error) {
            return { 
                error: 'An error occurred while fetching the movie, incorrect ID?',
            }
        }
    }

    static async parcialUpdate ({ id, input }){
        const movie = await this.update ({ id, input})
        return movie
    }

    static async delete ({ id }) {
        try {
            const movie = await Movies.findOne({ _id: id })
            await movie.deleteOne()
            return true
        } catch (error) {
            return false
        }
    }

}