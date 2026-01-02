import { Elysia } from 'elysia'
import { movieService } from './movie.service'
import { CreateMovieDTO, ListMoviesQueryDTO } from './movie.schema'

export const movieController = new Elysia({ prefix: '/api/movies' })
  // GET /api/movies?page=1&limit=10&title=matrix
  .get('/', async ({ query }) => {
    return movieService.findAll(query)
  }, {
    query: ListMoviesQueryDTO
  })
  // POST /api/movies
  .post('/', async ({ body, set }) => {
    const movie = await movieService.create(body)
    set.status = 201
    return movie
  }, {
    body: CreateMovieDTO
  })