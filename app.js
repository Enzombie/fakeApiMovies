const express = require('express')
const app = express()
const crypto = require('node:crypto')
const PORT = process.env.PORT ?? 3000
const movies = require('./movies.json')
const {validateMovie, validateParcialMovie} = require('./schemas/movies.js')

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

app.put('/movies/:id', (req, res) => { //modificar totalmente una pelicula
    const result = validateMovie(req.body)
    if(result.error){
        return res.status(400).json({ error: JSON.parse(result.error)})
    }
    
    const { id } = req.params
    const indexMovie = movies.findIndex(m => m.id === id)

    if(indexMovie == -1){
        return res.status(404).send({ error: 'movie id not found' })
    }
    updateMovie = {
        id : id,
        ...result.data,
    }
    movies[indexMovie] = updateMovie
    return res .json(updateMovie)
})

app.patch('/movies/:id', (req, res) => { //modificar parcialmente una pelicula
    const result = validateParcialMovie(req.body)
    if(result.error){
        return res.status(400).json({ error: JSON.parse(result.error.message)})
    }
    
    const { id } = req.params
    const indexMovie = movies.findIndex(m => m.id === id)

    if(indexMovie == -1){
        return res.status(404).json({ error: 'movie not found' })
    }
    const updateMovie = {
        ...movies[indexMovie],
        ...result.data
    }
    movies[indexMovie] = updateMovie
    return res.json(updateMovie)
})

app.delete('/movies/:id', (req, res) => {
    const { id } = req.params
    const movieIndex = movies.findIndex(m => m.id === id)

    if(movieIndex == -1){
        return res.status(404).json({ error: 'movie not found'})
    }

    movies.splice(movieIndex, 1)
    return res.json({ mesagge : 'Movie deleted successfully'})
})





app.listen( PORT, () => {
    console.log(`listening on port http://localhost:${PORT}`)
})