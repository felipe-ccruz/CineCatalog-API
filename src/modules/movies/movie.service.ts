import { movieRepository } from './movie.repository'
import type { CreateMovieInput, ListMoviesQuery } from './movie.schema'

export const movieService = {
    async create(data: CreateMovieInput) {
        return movieRepository.create(data)
    },

    async findAll(query: ListMoviesQuery) {
        const page = query.page ?? 1
        const limit = query.limit ?? 10
        return movieRepository.findAll(page, limit, query.title)
    },
    async createMany(data: CreateMovieInput[]) {
        return movieRepository.createMany(data)
    },

    async findById(id: number) {
        const movie = await movieRepository.findById(id)

        if (!movie) {
            throw new Error('Movie not found')
        }

        return movie
    }
}