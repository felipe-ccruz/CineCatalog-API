import { Elysia } from 'elysia'
import { movieService } from './movie.service'
import { CreateMovieDTO } from './movie.schema'

export const movieController = new Elysia({ prefix: '/api/movies' })
// GET /api/movies
  .get('/', async () => {
    return movieService.findAll()
  })
  
  // POST /api/movies
  .post('/', async ({ body, set }) => {
    const movie = await movieService.create(body)
    set.status = 201
    return movie
  }, {
    body: CreateMovieDTO
  })