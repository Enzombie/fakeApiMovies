const express = require('express')
const app = express()
const crypto = require('node:crypto')
const PORT = process.env.PORT ?? 3000
const movies = require('./movies.json')
const {validateMovie} = require('./schemas/movies.js')

app.use(express.json()) //esta utilidad es para recibir elementos del req correctamente
app.disable('x-powered-by')

app.get('/movies', (req, res) => {
    const {genre} = req.query //con query recupero 'genre'
    if(genre) {
        const filterMovies = movies.filter(
            movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase())
            )
        return res.json(filterMovies)
    }
    res.json(movies)
})

app.get('/movies/:id', (req, res) => {
    const {id} = req.params
    const movie = movies.find(movie => movie.id === id)
    if (movie) {
        return res.json(movie)
    }
    return res.json({message: 'Movie not found'})
})

app.post('/movies', (req, res) => {

    const result = validateMovie(req.body)

    if(result.error) {
        return res.status(400).json({
            message: JSON.parse(result.error.message)})
    }
    const newMovie = {
        id: crypto.randomUUID(),
        ...result.data
    }
    //esto no seria rest, al estar guardando el estado de la app en memoria
    movies.push(newMovie)

    res.status(201).json(newMovie)
})









app.listen( PORT, () => {
    console.log(`listening on port http://localhost:${PORT}`)
})