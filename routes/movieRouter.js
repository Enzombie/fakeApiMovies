import { Router } from 'express'
import { MovieController } from '../controller/movieController.js'

export const createMovieRouter = ({MovieModel}) => {

    const moviesRouter = Router()
    
    const movieController = new MovieController({ MovieModel : MovieModel})
    
    moviesRouter.get('/', movieController.getAll)
    moviesRouter.get('/:id', movieController.getById)
    moviesRouter.post('/', movieController.create)
    moviesRouter.put('/:id', movieController.update)
    moviesRouter.patch('/:id', movieController.parcialUpdate)
    moviesRouter.delete('/:id', movieController.delete)

    return moviesRouter
}
