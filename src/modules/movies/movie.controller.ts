import { Elysia } from 'elysia'
import { movieService } from './movie.service'
import { CreateManyMoviesDTO, CreateMovieDTO, ListMoviesQueryDTO, MovieIdParamDTO, UpdateMovieDTO } from './movie.schema'
import { HttpError } from '../../shared/errors/httpError'

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

    // PUT /api/movies/:id
    .put('/:id', async ({ params, body }) => {
        return movieService.update(params.id, body)
    }, {
        params: MovieIdParamDTO,
        body: UpdateMovieDTO
    })

    // DELETE /api/movies/:id
    .delete('/:id', async ({ params, set }) => {
        await movieService.delete(params.id)
        set.status = 204
    }, {
        params: MovieIdParamDTO
    })

    // POST /api/movies/:id/poster
    .post('/:id/poster', async ({ params, request }) => {
        const formData = await request.formData()
        const file = formData.get('file') as File

        if (!file) {
            throw HttpError.badRequest('File is required', 'FILE_REQUIRED')
        }

        const allowedTypes = ['image/jpeg', 'image/png', 'image/webp']
        if (!allowedTypes.includes(file.type)) {
            throw HttpError.badRequest(
                'Invalid file type. Allowed: JPEG, PNG, WebP',
                'INVALID_FILE_TYPE'
            )
        }

        const maxSize = 5 * 1024 * 1024 // 5MB
        if (file.size > maxSize) {
            throw HttpError.badRequest('File too large. Max: 5MB', 'FILE_TOO_LARGE')
        }

        return movieService.uploadPoster(params.id, file)
    }, {
        params: MovieIdParamDTO
    })