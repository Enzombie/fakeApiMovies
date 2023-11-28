import express, { json } from 'express'
import { moviesRouter } from './routes/movies.js'
import mongoose from 'mongoose'
const app = express()

mongoose.connect('mongodb+srv://Henso:miprimerapp@miapp.u8aovzq.mongodb.net/apiMovies?retryWrites=true&w=majority')

app.use(json()) // esta utilidad es para recibir elementos del req correctamente
app.disable('x-powered-by')

app.use('/movies', moviesRouter)

const PORT = process.env.PORT ?? 3000

app.listen(PORT, () => {
  console.log(`listening on port http://localhost:${PORT}`)
})
