import { Elysia } from 'elysia'
import { movieService } from './movie.service'
import { CreateManyMoviesDTO, CreateMovieDTO, ListMoviesQueryDTO, MovieIdParamDTO} from './movie.schema'

export const movieController = new Elysia({ prefix: '/api/movies' })
    // GET /api/movies?page=1&limit=10&title=matrix
    .get('/', async ({ query }) => {
        return movieService.findAll(query)
    }, {
        query: ListMoviesQueryDTO
    })

    // GET /api/movies/:id
    .get('/:id', async ({ params }) => {
    return movieService.findById(params.id)
    }, {
        params: MovieIdParamDTO
    })

    // POST /api/movies
    .post('/', async ({ body, set }) => {
        const movie = await movieService.create(body)
        set.status = 201
        return movie
    }, {
        body: CreateMovieDTO
    })

    // POST /api/movies/bulk
    .post('/bulk', async ({ body, set }) => {
        const created = await movieService.createMany(body)
        set.status = 201
        return created
    }, {
        body: CreateManyMoviesDTO
    })