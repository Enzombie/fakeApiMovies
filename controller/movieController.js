import { validateMovie, validateParcialMovie } from '../schemas/movieSchemaZod.js'

export class MovieController {
  constructor({ MovieModel}){
    this.MovieModel = MovieModel
  }
  getAll = async (req, res) => {
    const { genre } = req.query // con req.query recupero 'genre'
    const movies = await this.MovieModel.getAll({ genre })
    res.json(movies)
  }

  getById = async (req, res) => {
    const { id } = req.params
    const movie = await this.MovieModel.getById({ id })
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' })
    }
    return res.json(movie)
  }

  create = async (req, res) => {
    const result = validateMovie(req.body)

    if (result.error) {
      return res.status(400).json({ message: JSON.parse(result.error.message) })
    }

    const newMovie = await this.MovieModel.create({ input: result.data })

    res.status(201).json(newMovie)
  }

  update = async (req, res) => { // modificar totalmente una pelicula
    const result = validateMovie(req.body)
    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error) })
    }

    const { id } = req.params
    const updateMovie = await this.MovieModel.update({ id, input: result.data })

    return res.json(updateMovie)
  }

  parcialUpdate = async (req, res) => { // modificar parcialmente una pelicula
    const result = validateParcialMovie(req.body)

    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const { id } = req.params
    const updateMovie = await this.MovieModel.parcialUpdate({ id, input: result.data })

    return res.json(updateMovie)
  }

  delete = async (req, res) => {
    const { id } = req.params

    const result = await this.MovieModel.delete({ id })

    if (result === false) {
      return res.status(404).json({ error: 'movie not found' })
    }

    return res.json({ mesagge: 'Movie deleted successfully' })
  }


}