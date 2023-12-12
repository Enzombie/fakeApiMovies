//import { MovieModel } from '../models/localFileSystem/movie.js'
//import { MovieModel } from '../models/mongoDB/movie.js'
import { MovieModel } from '../models/MySQL/movie.js'
import { validateMovie, validateParcialMovie } from '../schemas/movies.js'

export class MovieController {
  static async getAll(req, res) {
    const { genre } = req.query // con req.query recupero 'genre'
    const movies = await MovieModel.getAll({ genre })
    res.json(movies)
  }

  static async getById(req, res) {
    const { id } = req.params
    const movie = await MovieModel.getById({ id })
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' })
    }
    return res.json(movie)
  }

  static async create(req, res) {
    const result = validateMovie(req.body)

    if (result.error) {
      return res.status(400).json({ message: JSON.parse(result.error.message) })
    }

    const newMovie = await MovieModel.create({ input: result.data })

    res.status(201).json(newMovie)
  }

  static async update(req, res) { // modificar totalmente una pelicula
    const result = validateMovie(req.body)
    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error) })
    }

    const { id } = req.params
    const updateMovie = await MovieModel.update({ id, input: result.data })

    return res.json(updateMovie)
  }

  static async parcialUpdate(req, res) { // modificar parcialmente una pelicula
    const result = validateParcialMovie(req.body)

    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const { id } = req.params
    const updateMovie = await MovieModel.parcialUpdate({ id, input: result.data })

    return res.json(updateMovie)
  }

  static async delete(req, res) {
    const { id } = req.params

    const result = await MovieModel.delete({ id })

    if (result === false) {
      return res.status(404).json({ error: 'movie not found' })
    }

    return res.json({ mesagge: 'Movie deleted successfully' })
  }


}