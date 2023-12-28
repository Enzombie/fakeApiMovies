import express, { json } from 'express'
import { createMovieRouter } from './routes/movieRouter.js'

export const createApp = ({MovieModel}) => {

  const app = express()
  
  app.use(json())
  app.disable('x-powered-by')
  
  app.use('/movies', createMovieRouter({MovieModel : MovieModel}))
  
  const PORT = process.env.PORT ?? 3000
  
  app.listen(PORT, () => {
    console.log(`listening on port http://localhost:${PORT}`)
  })
}
