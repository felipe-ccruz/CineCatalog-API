import { movieRepository } from './movie.repository'
import type { CreateMovieInput, ListMoviesQuery, UpdateMovieInput } from './movie.schema'
import { storageService } from '../../config/storage'
import { HttpError } from '../../shared/errors/httpError'

export const movieService = {
    async create(data: CreateMovieInput) {
        return movieRepository.create(data)
    },

    async createMany(data: CreateMovieInput[]) {
        return movieRepository.createMany(data)
    },

    async findAll(query: ListMoviesQuery) {
        const page = query.page ?? 1
        const limit = query.limit ?? 10
        return movieRepository.findAll(page, limit, query.title)
    },

    async findById(id: number) {
        const movie = await movieRepository.findById(id)

        if (!movie) {
            throw HttpError.notFound(`Movie with id '${id}' not found`, 'MOVIE_NOT_FOUND')
        }

        return movie
    },

    async update(id: number, data: UpdateMovieInput) {
        const movie = await movieRepository.findById(id)

        if (!movie) {
            throw HttpError.notFound(`Movie with id '${id}' not found`, 'MOVIE_NOT_FOUND')
        }

        return movieRepository.update(id, data)
    },

    async delete(id: number) {
        const movie = await movieRepository.findById(id)

        if (!movie) {
            throw HttpError.notFound(`Movie with id '${id}' not found`, 'MOVIE_NOT_FOUND')
        }

        await movieRepository.delete(id)
    },

    async uploadPoster(id: number, file: File) {
        const movie = await movieRepository.findById(id)

        if (!movie) {
            throw HttpError.notFound(`Movie with id '${id}' not found`, 'MOVIE_NOT_FOUND')
        }

        const ext = file.name.split('.').pop() || 'png'
        const key = `posters/${id}-${Date.now()}.${ext}`

        const posterUrl = await storageService.upload(file, key)

        return movieRepository.updatePoster(id, posterUrl)
    }
}