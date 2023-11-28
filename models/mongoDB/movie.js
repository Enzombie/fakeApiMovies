import { randomUUID } from 'node:crypto'
import { Movies } from '../../schemas/mongoDB/movieSchema.js'

export class MovieModel {
    static async getAll ({ genre }) {
        if (genre) {
            const filterMovies = await Movies.find({ genre: [genre] })
            return filterMovies
        }
        return await Movies.find()
    }

    static async getById ({ id }) {
        const movie = await Movies.findOne({ _id: id })
        return movie
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
        //todo: si pongo mal el id revienta todo
        const movie = await Movies.findOne({ _id : id})

        if (!movie) {
          return { error: 'movie id not found' }
        }

        Object.assign(movie, input)
        await movie.save()

        return movie
    }

    static async parcialUpdate ({ id, input }){
        const movie = await this.update ({ id, input})
        return movie
    }

    static async delete ({ id }) {
        const movie = await Movies.findOne({ _id: id })

        if (!movie) {
          return false
        }
      
        await movie.deleteOne()
        return true
    }

}