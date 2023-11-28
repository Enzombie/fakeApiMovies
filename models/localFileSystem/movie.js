import { createRequire } from 'node:module'
import { randomUUID } from 'node:crypto'

// leer un json en ESModules
const required = createRequire(import.meta.url)
const movies = required('../../movies.json')

export class MovieModel {
    static async getAll ({ genre }) {
        if (genre) {
            const filterMovies = movies.filter(
                movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase())
            )
            return filterMovies
        }
        return movies
    }

    static async getById ({ id }) {
        const movie = await movies.find(movie => movie.id === id)
        return movie
    }

    static async create ({ input }){
        const newMovie = {
            id : randomUUID(),
            ...input
        }
        movies.push(newMovie)

        return newMovie
    }

    static async update ({ id, input }){
        const indexMovie = movies.findIndex(m => m.id === id)

        if (indexMovie === -1) {
          return { error: 'movie id not found' }
        }
        const updateMovie = {
          id,
          ...input
        }
        movies[indexMovie] = updateMovie
        return updateMovie
    }

    static async parcialUpdate ({ id, input }){
        const indexMovie = movies.findIndex(m => m.id === id)

        if(indexMovie == -1){
            return { error: 'movie not found' }
        }
        const updateMovie = {
            ...movies[indexMovie],
            ...input
        }
        movies[indexMovie] = updateMovie
        return movies[indexMovie]
    }

    static async delete ({ id }) {
        const movieIndex = movies.findIndex(m => m.id === id)

        if (movieIndex === -1) {
          return false
        }
      
        movies.splice(movieIndex, 1)
        return true
    }

}